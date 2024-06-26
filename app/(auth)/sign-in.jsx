import { View, Text, ScrollView,Image,Alert } from 'react-native'
import React from 'react'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getCurrentUser,signIn } from '../../lib/appwrite'

import { useEffect } from 'react'
import { Redirect,router } from 'expo-router'




const SignIn = () => {
  
  const [form , setForm] = useState({
    email:'',
    password:''
  })
  const [isSubmitting,setIsSubmitting] = useState(false);
  const {user,setUser,setIsLoggedIn}=useGlobalContext();
  
  

  const submit = async () => {
    if (form.email==="" || form.password==="") {
      Alert.alert('Error','Please fill all fields')
   }
    setIsSubmitting(true)
    
    try{
      await signIn(form.email,form.password);
      const result=await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      router.back();
     
    }
     catch(e){
       Alert.alert('Error',e.message)
     }
     finally{
       setIsSubmitting(false)
     }
     
    
  }
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
      <View classname="w-full justify-center min-h-[85vh] px-4 my-6">
        <View className="flex-row">
          <Image
          source={images.icon}
          className="w-[125px] h-[135px] ml-[40px] mt-[10px] "
          resizeMode='contain'/>
          <Text className="text-3xl text-silver-100 text-semibold  mt-[60px] font-pdBlack">TrackRite</Text> 
          </View>
          <Text className="text-3xl text-silver-100 ml-[155px] font-pdSemiBold">Log In </Text>

          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e)=>setForm({...form,email:e})}
          otherStyles="mt-7 ml-3 mr-3"
          keyboardType="email-address"
          />

         <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e)=>setForm({...form,password:e})}
          otherStyles="mt-7 ml-3 mr-3"
         />
        
        <CustomButton
        title="Submit"
        handlePress={submit}
        containerStyles="mt-10 ml-3 mr-3"
        isLoading={isSubmitting}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-silver-100 text-lg font-pregular">Don't have account?</Text>
          <Text className="text-secondary text-lg font-psemibold">Contact Your Advisor</Text>
         </View>
         

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn