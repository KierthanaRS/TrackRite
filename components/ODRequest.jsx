import { View, Text,ScrollView,TouchableOpacity} from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { teacherApproveOD,hodApproveOD } from '../lib/appwrite'


const ODRequest = ({requests,role}) => {
    const [loadingStates, setLoadingStates] = useState({});
    const handleApprove = async (requestId) => {
        try {
          setLoadingStates((prevState) => ({ ...prevState, [requestId]: true }));
          if(role==="teacher"){
             await teacherApproveOD(requestId);
          }
          else if(role==="hod"){
            await hodApproveOD(requestId);
          }
          
       
        } catch (error) {
          setLoadingStates((prevState) => ({ ...prevState, [requestId]: false }));
          console.error(`Error approving ${type} request:`, error);
        }
      };

  return (
    
    <View className="bg-secondary-200 p-10 mb-10 border border-silver-100 borderradius-1">
      {requests.map((request, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text className="text-xl text-black-100 font-pdMedium mb-2">{request.username}</Text>
          <View className="flex-row">
          <Text className="text-sm text-black-100 font-pdSemiBold mb-2">Date:</Text>
          <Text className="text-sm text-black-100  mb-2">{new Date(request.oddate).toLocaleDateString()}</Text>
          </View>
          <View className="flex-row">
          <Text className="text-sm text-black-100 font-pdSemiBold mb-2">Reason:</Text>
          <Text className="text-sm text-black-100 text-pdRegular mb-5 mr-10">{request.purpose}</Text>
          </View>
         
          <TouchableOpacity
            className={`bg-green-700 p-2 rounded-lg mx-1 ${loadingStates[request.$id] ? 'opacity-20' : 'opacity-100'}`}
            disabled={loadingStates[request.$id]}
            onPress={() => handleApprove(request.$id)}
          >
            <Text style={{ color: 'white' }}>Approve</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export default ODRequest