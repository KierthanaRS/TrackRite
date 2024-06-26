import { View, Text,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useState,useEffect } from 'react'
import useAppwrite from '../../lib/useAppwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getStudents,getTeachers,getStudentAttendance,getTeacherAttendance } from '../../lib/appwrite'
import TableData from '../../components/TableData'
const attendancetracker = () => {
  const {user} = useGlobalContext()
  const {data:teachers,refetch: refetchTeachers }=useAppwrite(()=>getTeachers(user.accountid));
  const [students, setStudents] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [teacherAttendance, setTeacherAttendance] = useState([]);
  useEffect(() => {
    refetchTeachers()
  },[user])

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const allStudentsData = await Promise.all(
          teachers.map(async (teacher) => {
            const students = await getStudents(teacher.accountid);
            return students;
          })
        );
        const flattenedStudents = allStudentsData.flat();
        setStudents(flattenedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (teachers.length > 0) {
      fetchAllStudents();
    }
  }, [teachers]);

  useEffect(() => {
    const fetchAllStudentAttendance = async () => {
      try {
        const attendanceData = await Promise.all(
          students.map(async (student) => {
            const attendance = await getStudentAttendance(student.accountid);
            return attendance ;
          })
        );
        setStudentAttendance(attendanceData);
      } catch (error) {
        console.error('Error fetching student attendance:', error);
      }
    };

    if (students.length > 0) {
      fetchAllStudentAttendance();
    }
  }, [students]);

  useEffect(() => {
    const fetchAllTeacherAttendance = async () => {
      try {
        const attendanceData = await Promise.all(
          teachers.map(async (teacher) => {
            const attendance = await getTeacherAttendance(teacher.accountid);
            return attendance ;
          })
        );
        setTeacherAttendance(attendanceData);
      } catch (error) {
        console.error('Error fetching teacher attendance:', error);
      }
    };

    if (teachers.length > 0) {
      fetchAllTeacherAttendance();
    }
  }, [teachers]);



  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <View>
          <Text className="text-xl text-secondary font-pdBold">Teachers Attendance</Text>
                <TableData
                  titles={["Name","Days Present","Total Days"]}
                  data={teacherAttendance}
                  datatitle={["username","presentdays","totaldays"]}
                  />
         
          <Text className="text-xl text-secondary font-pdBold mt-10">Students Attendance</Text>
              <TableData
                titles={["Name","Days Present","Total Days"]}
                data={studentAttendance}
                datatitle={["username","dayspresent","totaldays"]}
                />
          </View>
        </View>
      </ScrollView>
      
      </SafeAreaView>
      
      )
}

export default attendancetracker