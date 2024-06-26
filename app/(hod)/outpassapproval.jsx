import { View, Text,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useState,useEffect } from 'react'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getStudents,getTeachers } from '../../lib/appwrite'
import { odrequesthod,outpasshod } from '../../lib/appwrite'
import ODRequest from '../../components/ODRequest'
import OutpassRequest from '../../components/OutpassRequest'
import EmptyState from '../../components/EmptyState'


const OutpassApproval = () => {
  const {user} = useGlobalContext()
  const {data:teachers,refetch: refetchTeachers }=useAppwrite(()=>getTeachers(user.accountid));
  // const {data: students,refetch}=useAppwrite(()=>getStudents(user.accountid));
  const [students, setAllStudents] = useState([])
  const [odRequests, setOdRequests] = useState([]);
  const [outpasses, setOutpasses] = useState([]);
  useEffect(() => {
  
    refetchTeachers()
   
  },[user])
  
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const allStudentsData = await Promise.all(
          teachers.map(async (teacher) => {
            const students = await getStudents(teacher.accountid)
            return students // You can also return { teacherId: teacher.accountid, students } if you need to know which students belong to which teacher
          })
        )
        // Flatten the array if you want a single array of students
        const flattenedStudents = allStudentsData.flat()
        setAllStudents(flattenedStudents)
      } catch (error) {
        console.error('Error fetching students:', error)
      }
    }

    if (teachers.length > 0) {
      fetchAllStudents()
    }
  }, [teachers])



  useEffect(() => {
    const fetchOdRequests = async () => {
      try {
        const odRequestsPromises = students.map((student) => odrequesthod(student.accountid));
        const outpassesPromises = students.map((student) => outpasshod(student.accountid));
  
        const odRequests = await Promise.all(odRequestsPromises);
        const filteredOdRequests = odRequests.filter((requests) => requests.length > 0);
        setOdRequests(filteredOdRequests);
  
        const outpasses = await Promise.all(outpassesPromises);
        const filteredOutpasses = outpasses.filter((requests) => requests.length > 0);
        setOutpasses(filteredOutpasses);
      } catch (error) {
        console.error('Error fetching OD requests:', error);
      }
    };
  
    if (students.length > 0) {
      fetchOdRequests();
    }
  }, [students]);
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className="p-20">
          <Text className="font-pdSemibold text-lg text-silver-100 mb-10">OD Requests</Text>
          {odRequests.length > 0 ? (
            odRequests.map((requests, index) => (
              <ODRequest key={index} requests={requests} role="hod" />
            ))
          ) : (
            <EmptyState 
            title="No OD Request Made"
            />
          )}

          {/* Display Outpasses */}
          <Text className="font-pdSemibold text-lg text-silver-100 mb-10 mt-20">Outpasses</Text>
          {outpasses.length > 0 ? (
            outpasses.map((requests, index) => (
              <OutpassRequest key={index} requests={requests} role="hod" />
            ))
          ) : (
            <EmptyState 
            title="No Outpass Request Made"
            />
          )}
        </View>
      </ScrollView>
      </SafeAreaView>
  )
}

export default OutpassApproval 