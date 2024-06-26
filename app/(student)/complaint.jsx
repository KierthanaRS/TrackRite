import { View, Text,ScrollView, TouchableOpacity,Image, Alert} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import {createComplaint} from '../../lib/appwrite'


const complaint = () => {
  const {user}=useGlobalContext()
  const [form,setForm]=useState({
    complaint:'',
    suggestion:''
  })
  const [uploading,setUploading]=useState(false);

  
  const submit = async ()=>{
    if (!form.complaint){
      Alert.alert('Error','Please fill all the fields')
      return
    }
    setUploading(true)
    try{
      
      const newComplaint= await createComplaint(user.accountid,user.username,form.complaint,form.suggestion)
      Alert.alert('Success','Complaint submitted successfully')
      router.push('/studenthome')
}
    catch(e){
      Alert.alert('Error',e.message)
    }
    finally{
      setForm({ 
        complaint:'',
        suggestion:''})
      setUploading(false)
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full">
     <ScrollView className="px-4 my-6">
        <Text className="text-2xl  font-pdSemiBold text-secondary-200">
          Raise a Complaint
        </Text>
        <FormField 
        title="Write your Complaint"
        value={form.complaint}
        placeholder="I complaint about..."
        handleChangeText={(e)=>{setForm({...form,complaint:e})}}
        otherStyles="mt-10"
        inputStyles="h-[1000px]"
        multiline={true}
        />

        <FormField 
        title="Your Suggestion to improve the problem"
        value={form.suggestion}
        placeholder="I suggest..."
        handleChangeText={(e)=>{setForm({...form,suggestion:e})}}
        otherStyles="mt-7"
        multiline={true}
        
        />

        <CustomButton
        title="Submit the complaint"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={uploading}
        />
     </ScrollView>
    </SafeAreaView>
  )
}

export default complaint