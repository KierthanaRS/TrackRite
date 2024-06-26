import { View, Text,ScrollView,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useEffect } from 'react';
import  images  from '../constants/images'; 
import CustomButton from '../components/CustomButton'
import { router,Redirect } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const HomeScreen = () => {
  const {user,isLoading,isLoggedIn}=useGlobalContext();
  // console.log(user,isLoggedIn,isLoading);
    if (user){
      if (!isLoading && isLoggedIn){
      if(user.profession==='Student'){
      return <Redirect href="/studenthome"/>
      }
      if(user.profession==='Teacher'){
        return <Redirect href="/teacherhome"/>
        }
      if(user.profession==='HOD'){
        return <Redirect href="/hodhome"/>
        }
    }
    }
 
  
   return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4 mt-[-120px]">
        <Image
            source={images.logoBg}
            className="w-[350px] h-[350px]"
            resizeMode='contain'   
          />
          <View className="relative mt-[-130px]">
          <Text className="text-silver-100 text-xl font-pdMedium">
            Attendance Tracker App
          </Text>
          </View>
          <View className="mt-4">
            <Image
            source={images.calendar2}
            className="w-[220px] h-[250px]"
            re
            />
            </View>
        </View>
          
        <CustomButton
        title="Continue with email"
        handlePress={()=>router.push('/sign-in')}
        containerStyles="w-[90%] mt-4 justify-center mx-5"/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen