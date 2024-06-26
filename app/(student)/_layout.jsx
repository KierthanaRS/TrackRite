import { View, Text,Image} from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import icons from '../../constants/icons';
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from '@/context/GlobalProvider';

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
const TabsLayout = () => {
  const {user}=useGlobalContext();
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
      <Tabs.Screen name="studenthome"
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
      <Tabs.Screen name="complaint"
      options={{
        title:'Complaint',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.complaint}
               color={color}
               name="Complaints"
               focused={focused}
               />
        )
      }} />
      <Tabs.Screen name="onduty"
      options={{
        title:'OD Permission',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.onduty}
               color={color}
               name="OD Permission"
               focused={focused}
               />
        )
      }} />
      
       <Tabs.Screen name="outpass"
      options={{
        title:'Outpass',
        headerShown:false,
        tabBarIcon:({color,focused})=>(
               <TabIcon
               icon={icons.leave}
               color={color}
               name="Outpass"
               focused={focused}
               />
        )
      }} />
      <Tabs.Screen name="profile"
      options={{
        title:'profile',
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

export default TabsLayout