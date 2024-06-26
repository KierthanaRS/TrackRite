import { View, Text,ScrollView, TouchableOpacity,Image, Alert} from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import  icons  from '../../constants/icons'
import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { createComplaint } from '../../lib/appwrite'
import DateInput from '../../components/DateInput'
import {createOutpass} from '../../lib/appwrite'



const outpass = () => {
  const {user}=useGlobalContext()
  const [fromdate,setFromdate]=useState(new Date())
  const [todate,setTodate]=useState(new Date())
 const [reason,setReason]=useState('')
  const [uploading,setUploading]=useState(false);
  
  
  const submit = async ()=>{
    if (!fromdate || !todate || !reason){
      Alert.alert('Error','Please fill all the fields')
      return
    }
    setUploading(true)
    try{
        const newoutpass=await createOutpass(user.accountid,user.username,fromdate,todate,reason)
        Alert.alert('Success','Requested For Outpass Successfully')
        router.push('/studenthome')
    }
    catch(e){
      Alert.alert('Error',e.message)
    }
    finally{
      setFromdate(new Date())
      setTodate(new Date())
      setReason('')
      setUploading(false)
    }
    
  }
  
  
  return (
    <SafeAreaView className="bg-primary h-full">
     <ScrollView className="px-4 my-6">
        <Text className="text-2xl  font-pdSemiBold text-secondary-200 mt-10 ">
          Request for Outpass
        </Text>
        

        <DateInput
        title="Date of Departure"
        value={fromdate}
        setDate={setFromdate}
        
    
        otherStyles="mt-7"
        />
        <DateInput
        title="Date of Arrival"
        value={todate}
        setDate={setTodate}
       
       
        otherStyles="mt-7"
        />
        
        <FormField 
        title="Reason for Outpass/Leave"
        value={reason}
        placeholder="I want..."
        handleChangeText={(e)=>setReason(e)}
        otherStyles="mt-7"
        multiline={true}
        
        />
        
        <CustomButton
        title="Request For Outpass"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={uploading}
        />
     </ScrollView>
    </SafeAreaView>
  )
}

export default outpass