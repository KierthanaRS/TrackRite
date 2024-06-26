import React from 'react';
import { View, Text,ScrollView,Image } from 'react-native';
import useAppwrite from '../../lib/useAppwrite';
import {getStudentDetails,getODrequests,getoutpassrequests} from '../../lib/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoBox from '../../components/InfoBox';
import { Dimensions } from 'react-native'
import { useEffect } from 'react';
import EmptyState from '../../components/EmptyState';
import TableData from '../../components/TableData';


const screenWidth = Dimensions.get('window').width

const studenthome = ({ }) => {
    const {user}=useGlobalContext();
    const { data: studentData } = useAppwrite(() => user ? getStudentDetails(user.accountid):[]);
    const { data: oddata,refetch } = useAppwrite(() => user ? getODrequests(user.accountid):[]);
    const { data: outpassdata } = useAppwrite(() => user ? getoutpassrequests(user.accountid):[]);
  useEffect(() => {
      refetch();
    })
    const isEmptyState = oddata?.length === 0 && outpassdata?.length === 0;
    return (
        <SafeAreaView  className="bg-primary h-full">
            <ScrollView>
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
             
             <View className="flex-row">
                <Text className="text-2xl text-secondary font-pdBold mt-5 mr-3">Welcome</Text> 
                <InfoBox
                  title={user?.username}
                  containerStyles="mt-5"
                  titleStyles="text-3xl font-pdSemiBold"
                />
                <Text className="text-2xl text-secondary font-pdBold mt-5 ml-1">!</Text> 
              </View>
              
              <View className="mt-5 flex-row">
                <InfoBox
                  title={studentData[0]?.department}
                  subtitle="Department"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox
                  title={studentData[0]?.semester}
                  subtitle="Semester"
                  titleStyles="text-xl"
                />
              </View>
              
              <Text className="text-2xl text-secondary  font-pdBold mt-10"> OD and Outpass Requests</Text>
              {isEmptyState ? (
            <EmptyState 
            title="No Request Made"
            subtitle="make a request to view it here"/>
          ) : (
            <View className="w-full mt-10">
              {oddata?.length > 0 && (
                <View>
                  <Text className="text-xl text-secondary font-pdBold">OD Requests</Text>
                  <TableData
                     titles={["Date of OD","Purpose","Teacher Approvered","HOD Approved"]}
                     data={oddata}
                     datatitle={["oddate","purpose","teacherapproved","hodapproved"]}
                     />
                </View>
              )}
              {outpassdata?.length > 0 && (
                <View className="mt-5">
                  <Text className="text-xl text-secondary font-pdBold">Outpass Requests</Text>
                     <TableData
                     titles={["Date of Departure","Date of Arrival","Reason","Teacher Approvered","HOD Approved"]}
                     data={outpassdata}
                     datatitle={["fromdate","todate","reason","teacherapproved","hodapproved"]}
                     />
                </View>
              )}
            </View>
          )}
               

            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default studenthome;
