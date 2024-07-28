import {Account, Avatars, Client, ID,Databases,Query} from 'react-native-appwrite';


export const Config={
    endpoint:process.env.endpoint,
    Platform:process.env.Platform,
    projectId:process.env.projectId,
    databaseId:process.env.databaseId,
    userCollectionId:process.env.userCollectionId,
    studentsCollectionId:process.env.studentsCollectionId,
    studentattendance:process.env.studentattendance,
    complaintsCollectionId:process.env.complaintsCollectionId,
    outpassCollectionId:process.env.outpassCollectionId,
    odrequestsCollectionId:process.env.odrequestsCollectionId,
    teachersCollectionId:process.env.teachersCollectionId,
    teacherattendance:process.env.teacherattendance,
    hodsCollectionId:process.env.hodsCollectionId
}
const { endpoint, Platform, projectId,databaseId,userCollectionId,
    studentsCollectionId,studentattendance,complaintsCollectionId,
     outpassCollectionId,odrequestsCollectionId,teachersCollectionId,
    teacherattendance,hodsCollectionId} = Config;


const client = new Client();
client
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(Platform);

const account = new Account(client);
const avatars=new Avatars(client)
const databases=new Databases(client);


export const getCurrentUser = async() => {
    try{
        const currentAccount=await account.get();
      
        
        if (!currentAccount){
            throw Error;
        }
        const CurrentUser=await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountid',currentAccount.$id)]
        )
        if (!CurrentUser){
            throw Error;
        }
        
        return CurrentUser.documents[0];
    }
    catch(error){
        console.log(error);
        return null;
    }

}

export const signIn = async (email,password) => {
    try{
        const session=await account.createEmailPasswordSession(email,password);
        return session;
    }
    catch(e){
        console.log(e);
        throw new Error(e);
    }   
}

export const getStudentDetails = async (studentId) => {
     try{
            const post= await databases.listDocuments(
                databaseId,
                studentsCollectionId,
                [Query.equal('accountid',studentId)]
    
    
            )
            return post.documents;
        }
        catch(e){
            throw new Error(e);
        }
    }
    

export const getStudentAttendance= async (studentId) => {
        try{
           
            const post= await databases.listDocuments(
                databaseId,
                studentattendance,
                [Query.equal('accountid',studentId)]
    
    
            )
            return post.documents[0];
        }
        catch(e){
            throw new Error(e);
        }
    }

export const signOut = async () => {
        try{
          const session= account.deleteSession('current');
    
         return session;
    
        }
        catch(e){
            throw new Error(e);
        }
    }


export const createComplaint = async (accountid,username,complaint,suggestion) =>{
    try{
        const newPost= await databases.createDocument(
            databaseId,
            complaintsCollectionId,
            ID.unique(),
            {
                accountid:accountid,
                username:username,
                complaint:complaint,
                suggestion:suggestion,
            }
        )
        return newPost;
    }
    catch(e){
        throw new Error(e);
    }

}


export const createOutpass =async (accountid,username,fromdate,todate,reason) =>{
    try{
        const newoutpass= await databases.createDocument(
            databaseId,
            outpassCollectionId,
            ID.unique(),
            {
                accountid:accountid,
                username:username,
                fromdate:fromdate,
                todate:todate,
                reason:reason
            }
        )
        return newoutpass;
    }
    catch(e){
        throw new Error(e);
    }

}

export const createODrequest = async (accountid,username,oddate,purpose) =>{
    try{
        const newodrequest= await databases.createDocument(
            databaseId,
            odrequestsCollectionId,
            ID.unique(),
            {
                accountid:accountid,
                username:username,
                oddate:oddate,
                purpose:purpose
            }
        )
        return newodrequest;
    }
    catch(e){
        throw new Error(e);
    }
}

export const getODrequests = async (studentId) => {
    try{
        const post= await databases.listDocuments(
            databaseId,
            odrequestsCollectionId,
            [Query.equal('accountid',studentId)]
        )
        return post.documents;
    }
    catch(e){
        throw new Error(e);
    }
}

export const getoutpassrequests = async (studentId) => {
    try{
        const post= await databases.listDocuments(
            databaseId,
            outpassCollectionId,
            [Query.equal('accountid',studentId)]
        )
        return post.documents;
    }
    catch(e){
        throw new Error(e);
    }
}


export const getStudents = async (teacherid) => {
    try{
        const post= await databases.listDocuments(
            databaseId,
            studentsCollectionId,
            [Query.equal('teacherid',teacherid)]
        )
        const sortedDocuments = post.documents.sort((a, b) => {
            if (a.username < b.username) {
                return -1;
            }
            if (a.username > b.username) {
                return 1;
            }
            return 0;
        });

        return sortedDocuments;
    }
    catch(e){
        throw new Error(e);
    }
}


 export const getTeachers = async (hodid) => {
    try{
        const post= await databases.listDocuments(
            databaseId,
            teachersCollectionId,
            [Query.equal('hodid',hodid)]
        )
        return post.documents;
    }
    catch(e){
        throw new Error(e);
    }
}

export const getTeacherAttendance = async (teacherId) => {
    try{
        const post= await databases.listDocuments(
            databaseId,
            teacherattendance,
            [Query.equal('accountid',teacherId)]
        )
        return post.documents[0];
    }
    catch(e){
        throw new Error(e);
    }
}

export const getTeacherDetails = async (teacherId) => {
    try{
        const post= await databases.listDocuments(
            databaseId,
            teachersCollectionId,
            [Query.equal('accountid',teacherId)]
        )
        return post.documents[0];
    }
    catch(e){
        throw new Error(e);
    }
}

export const markAttendance = async (accountid,attendance) => {
    try{
        const docuents= await databases.listDocuments(
            databaseId,
            studentattendance,
            [Query.equal('accountid',accountid)]
        );
        if(docuents.documents.length===0){
            throw new Error('No student found');
        }
        const studentDoc = docuents.documents[0];
        const updatedFields = {
            totaldays: studentDoc.totaldays + 1
        };

        if (attendance === 'Present') {
            updatedFields.dayspresent = studentDoc.dayspresent + 1;
        }
        const updatedPost = await databases.updateDocument(
            databaseId,
            studentattendance,
            studentDoc.$id, 
            updatedFields
        );

        // return updatedPost;
        
        }
    
    catch(e){
       
        throw new Error(e);
    }
}

export const odrequest = async (studentid) => {
    try {
        const post = await databases.listDocuments(
            databaseId,
            odrequestsCollectionId,
            [
                Query.equal('accountid', studentid),
                Query.equal('teacherapproved', false)
            ]
        );
        return post.documents;
    } catch (e) {
        throw new Error(e);
    }
};
    
export const outpass = async(studentid)=>{
    try{
        const post= await databases.listDocuments(
            databaseId,
            outpassCollectionId,
            [Query.equal('accountid',studentid),
            Query.equal('teacherapproved',false)
            ]
        )
        return post.documents;
    }
    catch(e){
        throw new Error(e);
    }
}

export const teacherApproveOD = async (requestId) => {
    try {
        const post = await databases.updateDocument(
            databaseId,
            odrequestsCollectionId,
            requestId,
            {
                teacherapproved: true
            }
        );
        
    } catch (e) {
        throw new Error(e);
    }
}

export const teacherApproveOutpass = async (requestId) => {
    try {
        const post = await databases.updateDocument(
            databaseId,
            outpassCollectionId,
            requestId,
            {
                teacherapproved: true
            }
        );
       
    } catch (e) {
        throw new Error(e);
    }
}

export const getHODDetails = async (hodId) => {
    try{
        const post= await databases.listDocuments(
            databaseId,
            hodsCollectionId,
            [Query.equal('accountid',hodId)]
        )
        return post.documents[0];
    }
    catch(e){
        throw new Error(e);
    }
}

export const odrequesthod = async (studentid) => {
    try {
        const post = await databases.listDocuments(
            databaseId,
            odrequestsCollectionId,
            [
                Query.equal('accountid', studentid),
                Query.equal('teacherapproved', true),
                Query.equal('hodapproved', false)
            ]
        );
        return post.documents;
    } catch (e) {
        throw new Error(e);
    }
};
    
export const outpasshod = async(studentid)=>{
    try{
        const post= await databases.listDocuments(
            databaseId,
            outpassCollectionId,
            [Query.equal('accountid',studentid),
            Query.equal('teacherapproved',true),
            Query.equal('hodapproved', false)
            ]
        )
        return post.documents;
    }
    catch(e){
        throw new Error(e);
    }
}

export const hodApproveOD = async (requestId) => {
    try {
        const post = await databases.updateDocument(
            databaseId,
            odrequestsCollectionId,
            requestId,
            {
                hodapproved: true
            }
        );
        
    } catch (e) {
        throw new Error(e);
    }
}

export const hodApproveOutpass = async (requestId) => {
    try {
        const post = await databases.updateDocument(
            databaseId,
            outpassCollectionId,
            requestId,
            {
                hodapproved: true
            }
        );
       
    } catch (e) {
        throw new Error(e);
    }
}


export const markTeacherAttendance = async (accountid,attendance) => {
   
    try{
        const docuents= await databases.listDocuments(
            databaseId,
            teacherattendance,
            [Query.equal('accountid',accountid)]
        );
        if(docuents.documents.length===0){
            throw new Error('No Teacher found');
        }
        const teacherDoc = docuents.documents[0];
        const updatedFields = {
            totaldays: teacherDoc.totaldays + 1
        };

        if (attendance === 'Present') {
            updatedFields.presentdays = teacherDoc.presentdays + 1;
        }
        const updatedPost = await databases.updateDocument(
            databaseId,
            teacherattendance,
            teacherDoc.$id, 
            updatedFields
        );

        // return updatedPost;
        
        }
    
    catch(e){
       
        throw new Error(e);
    }
}

export const getComplaints = async (studentId) => {
    try{
        const post= await databases.listDocuments(
            databaseId,
            complaintsCollectionId,
            [Query.equal('accountid',studentId)]
        )
        return post.documents;
    }
    catch(e){
        throw new Error(e);
    }
}
