import { View, Text,Image} from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import icons from '../../constants/icons';
import { StatusBar } from 'expo-status-bar';


const TabIcon=({icon,color,name,focused})=>{
  return(
    <View className="items-center justify-center gap-1">
      <Image 
      source={icon}
      resizeMode='contain'
      tintColor={color}
      className="w-7 h-7"/>
      <Text className={`${focused ? 'font-pbold' : 'font-pregular'} text-xs`}
      style={{color:color}}>
          {name}
      </Text>
    </View>
  )
}
const HODLayout = () => {

  return (
    <>
    <Tabs 
    screenOptions={{
      tabBarShowLabel:false,
      tabBarActiveTintColor:'#C5B358',
      tabBarInactiveTintColor:'#CDCDE0',
      tabBarStyle:{
        backgroundColor:'#28282B',
        boarderTopWidth:1,
        boarderTopColor:'#232533',
        height:84
      }
    }}>
      <Tabs.Screen name="hodhome"
      options={{
        title:'Home',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.home}
               color={color}
               name="Home"
               focused={focused}
               />
        )
      }} />
      <Tabs.Screen name="outpassapproval"
      options={{
        title:'Approve OD Request',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.request}
               color={color}
               name="OD Requests"
               focused={focused}
               />
        )
      }} />
      <Tabs.Screen name="attendancetracker"
      options={{
        title:'Attendance Tracker',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.attendance}
               color={color}
               name="Tracker"
               focused={focused}
               />
        )
      }} />
      
       <Tabs.Screen name="hodprofile"
      options={{
        title:'Profile',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.profile}
               color={color}
               name="Profile"
               focused={focused}
               />
        )
      }} />
   
      
    </Tabs>
    <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}

export default HODLayout