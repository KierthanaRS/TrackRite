import { View, Text,ScrollView,TouchableOpacity,Image ,Dimensions,Alert} from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit'
import useAppwrite from '../../lib/useAppwrite';
import { getTeacherAttendance,signOut,getTeacherDetails } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import  icons  from '../../constants/icons';
import InfoBox from '../../components/InfoBox';
import { useEffect,useState } from 'react';
import { router } from 'expo-router'
;


const screenWidth = Dimensions.get('window').width
const profile = () => {
  const {user,setUser,setIsLoggedIn}=useGlobalContext();
  const { data:attendance } = useAppwrite(() => user ? getTeacherAttendance(user?.accountid):[]);
  const {data:teacherDetails} = useAppwrite(() => user ? getTeacherDetails(user?.accountid):[]);
  const presentDays = attendance.presentdays;
  const totalDays = attendance.totaldays;
  const absentDays = totalDays - presentDays;

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (e) {
      console.error(e);
    }
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
  }
  const [data,setData]=useState([
    { name: 'Present', population: 100, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Absent', population: 0, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 }   
   ])
  
  useEffect(() => {
    if (presentDays && totalDays){
            setData([{...data[0],population:presentDays},{...data[1],population:absentDays}])
}
},[presentDays,absentDays,totalDays])
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity 
                  className="w-full items-end mb-10"
                  onPress={logout}
                >
                  <Image
                    source={icons.logout}
                    resizeMode='contain'
                    className="w-6 h-6"
                  />
        </TouchableOpacity>
        <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                  <Image
                    source={{ uri: user?.avatar }}
                    className="w-[90%] h-[90%] rounded-lg"
                    resizeMode='cover'
                  />
        </View>
        <InfoBox
                title={user?.username}
                containerStyles="mt-5"
                titleStyles="text-3xl font-pdSemiBold"
        />
        <InfoBox
                title={teacherDetails?.email}
                containerStyles="mt-0"
                titleStyles="text-lg  text-secondary"
        />
        <View className="mt-5 flex-row">
                <InfoBox
                  title={teacherDetails?.department}
                  subtitle="Department"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox
                  title={teacherDetails?.yearsofservice}
                  subtitle="Yers of Service"
                  titleStyles="text-xl"
                />
        </View>
        <View className="justify-center items-center mt-10">
              <Text className="text-2xl text-secondary  font-pdBold"> Attendance Summary Report </Text>
              <View className="mt-10 flex-row mb-10">
                <InfoBox
                  title={presentDays}
                  subtitle="Days Present"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox
                  title={absentDays}
                  subtitle="Days Absent"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox
                  title={totalDays}
                  subtitle="Total Days"
                  titleStyles="text-xl"
                />
            </View>
              <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
        </View>
     
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile