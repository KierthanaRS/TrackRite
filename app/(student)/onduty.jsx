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
import {createODrequest} from '../../lib/appwrite'



const onduty = () => {
  const {user}=useGlobalContext()
  const [oddate,setODdate]=useState(new Date())
 const [purpose,setPurpose]=useState('')
  const [uploading,setUploading]=useState(false);

  
  const submit = async ()=>{
    if (!oddate || !purpose){
      Alert.alert('Error','Please fill all the fields')
      return
    }
    setUploading(true)
    try{
        const newoutpass=await createODrequest(user.accountid,user.username,oddate,purpose)
        Alert.alert('Success','Requested For OD Successfully')
        router.push('/studenthome')
    }
    catch(e){
      Alert.alert('Error',e.message)
    }
    finally{
      setODdate(new Date())
      setPurpose('')
      setUploading(false)
    }
    
  }
  
  
  return (
    <SafeAreaView className="bg-primary h-full">
     <ScrollView className="px-4 my-6">
        <Text className="text-2xl  font-pdSemiBold text-secondary-200 mt-10 ">
          Request for OD
        </Text>
        

        <DateInput
        title="Date of OD"
        value={oddate}
        setDate={setODdate}
        otherStyles="mt-7"
        />

        <FormField 
        title="Purpose of OD"
        value={purpose}
        placeholder="I want..."
        handleChangeText={(e)=>setPurpose(e)}
        otherStyles="mt-7"
        multiline={true}
        
        />
        
        <CustomButton
        title="Request For OD"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={uploading}
        />
     </ScrollView>
    </SafeAreaView>
  )
}

export default onduty