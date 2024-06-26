import { View, Text,ScrollView ,TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'
import useAppwrite from '../../lib/useAppwrite'
import { getTeachers,markAttendance } from '../../lib/appwrite'
import { useEffect,useState } from 'react'
import Attendance from '../../components/Attendance'


const hodhome = () => {
  const {user} = useGlobalContext()
  const {data: teachers,refetch}=useAppwrite(()=>getTeachers(user.accountid))
  
  useEffect(() => {
    refetch()
   
  },[user])
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <View className="flex-row space-x-4 mb-10">
        <Text className="text-2xl text-silver-100 font-pdRegular">Welcome</Text>
        <Text className="text-2xl text-secondary-200 font-pdBold">{user?.username }</Text>
        </View>
        <View >
          <Text className="text-silver-100 font-pdSemiBold text-xl mb-10">Attendance</Text>
        </View>
          {teachers.map((teacher,index) => (
            <Attendance key={index} 
            id={teacher.id} 
            studentName={teacher.username}
            accountid={teacher.accountid}
            role="hod"
            />
          ))}
        </View>
      </ScrollView>
      </SafeAreaView>
  )
}

export default hodhome