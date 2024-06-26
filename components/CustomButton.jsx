import { TouchableOpacity, Text } from 'react-native';
import React from 'react';


const CustomButton = ({title, handlePress,containerStyles,textStyles,isLoading}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'Opacity-50':''}`} 
      disabled ={isLoading}
    >
      <Text className={`text-black font-pdSemiBold text-lg ${textStyles}`}
      >{title}</Text>
    </TouchableOpacity>
  );
};


export default CustomButton;
