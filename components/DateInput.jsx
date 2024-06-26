import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import icons from "../constants/icons";

const DateInput = ({ title, value,setDate,otherStyles }) => {
  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: value || new Date(),
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
        
        }
      },
      mode: 'date',
      is24Hour: true,
      display: 'calendar',
      minimumDate: new Date(2024, 0, 1),
      maximumDate: new Date(2030, 10, 20),
    });
  };

  // Convert date object to string for display
  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based in JS
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-silver-100 font-pdMedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl 
        focus:border-secondary-100 items-center flex-row">
        <TextInput
          className="flex-1 text-white font-pdSemiBold text-base"
          value={formatDate(value)}
          placeholder="Select a date"
          placeholderTextColor="#7b7b8b"
          editable={false} // Make the TextInput non-editable
        />
        <TouchableOpacity onPress={openDatePicker}>
          <Image
            source={icons.calendar}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateInput;
