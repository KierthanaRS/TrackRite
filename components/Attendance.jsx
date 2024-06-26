import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { markAttendance,markTeacherAttendance } from '../lib/appwrite'


const Attendance = ({id, studentName, accountid,role}) => {
    const [loadingStates, setLoadingStates] = useState({});
    const handleAttendance = async (studentId, accountid, status) => {
      
        try {
          setLoadingStates((prevState) => ({ ...prevState, [studentId]: true }));
          if(role==='hod'){
              await markTeacherAttendance(accountid, status);
          }
          else{
              await markAttendance(accountid, status);
          }
        } catch (e) {
          setLoadingStates((prevState) => ({ ...prevState, [studentId]: false }));
          console.error('Error updating attendance:', e);
        }
      };
    return (
        <View key={id} className="flex-row justify-between items-center w-full py-2 px-4 mb-2 rounded-lg">
      <Text className="text-lg text-silver-100">{studentName}</Text>
      <View className="flex-row">
        <TouchableOpacity
          className={`bg-green-500 p-2 rounded-lg mx-1 ${loadingStates[id] ? 'opacity-20' : 'opacity-100'}`}
          disabled={loadingStates[id]}
          onPress={() => handleAttendance(id, accountid, 'Present')}
        >
          <Text className="text-white">Present</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`bg-red-500 p-2 rounded-lg mx-1 ${loadingStates[id] ? 'opacity-20' : 'opacity-100'}`}
          disabled={loadingStates[id]}
          onPress={() => handleAttendance(id, accountid, 'Absent')}
        >
          <Text className="text-white">Absent</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Attendance