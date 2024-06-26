import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import useAppwrite from '../../lib/useAppwrite';
import { signOut, getHODDetails, getStudents, getTeachers, getComplaints } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '../../constants/icons';
import InfoBox from '../../components/InfoBox';
import EmptyState from '../../components/EmptyState';

const hodprofile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: hodDetails } = useAppwrite(() => user ? getHODDetails(user.accountid) : []);
  const { data: teachers, refetch: refetchTeachers } = useAppwrite(() => getTeachers(user.accountid));
  const [students, setStudents] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    refetchTeachers();
  }, [user]);

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
    const fetchComplaints = async () => {
      try {
        const complaintsPromises = students.map((student) => getComplaints(student.accountid));
        const complaint = await Promise.all(complaintsPromises);
        const filteredcomplaint = complaint.filter((requests) => requests.length > 0);
        setComplaints(filteredcomplaint.flat());
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    if (students.length > 0) {
      fetchComplaints();
    }
  }, [students]);

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
            <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
          </TouchableOpacity>
          <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
            <Image source={{ uri: user?.avatar }} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover" />
          </View>
          <InfoBox title={user?.username || 'HOD'} containerStyles="mt-5" titleStyles="text-3xl font-pdSemiBold" />
          <InfoBox title={hodDetails?.email || 'example'} containerStyles="mt-0" titleStyles="text-lg  text-secondary" />
          <InfoBox title={hodDetails?.department} subtitle="Department" containerStyles="mt-0" titleStyles="text-lg text-silver-100" />
          <View className="mt-5 flex-row">
            <InfoBox title={hodDetails?.noofteachers} subtitle="Teachers" containerStyles="mr-10" titleStyles="text-xl text-secondary" />
            <InfoBox title={hodDetails?.noofstudents} subtitle="Students" titleStyles="text-xl text-secondary" />
          </View>
          <Text className="font-pdSemibold text-2xl text-secondary-100 mb-10 mt-10">Complaints</Text>
          {complaints.length > 0 ? (
            complaints.map((requests, index) => (
              <View key={index} className="mb-4 p-4 border border-silver-100 border-dotted ml-10 mr-9">
                <View className="flex-row  items-center mb-2 mr-10">
                  <Text className="text-secondary-200 text-lg mr-3">Complaint:</Text>
                  <Text className="text-silver-100 font-pdRegular text-lg mr-4">{requests.complaint}</Text>
                </View>
                <View className="flex-row  items-center mr-10">
                  <Text className="text-secondary-200 text-lg mr-3">Suggestion:</Text>
                  <Text className="text-silver-100 font-pdRegular text-lg mr-4">{requests.suggestion || 'No Suggestion'}</Text>
                </View>
              </View>
            ))
          ) : (
            <EmptyState title="No Complaints Made" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default hodprofile;


