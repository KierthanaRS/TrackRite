import { View, Text,Image } from 'react-native'

import React from 'react'
import  images  from '../constants/images'

const EmptyState = ({title,subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
       <Image
       source={images.empty}
       className="w-[250px] h-[250px]"
       resizeMode='contain'
       />
       <Text className="text-lg text-center font-pdSemiBold text-white mt-1">
           {title}
          </Text>
        <Text className="font-pmedium  text-sm text-gray-100">
           {subtitle}
          </Text>
        
       
    </View>
  )
}

export default EmptyState