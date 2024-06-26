import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title,subtitle,containerStyles,titleStyles}) => {
  return (
    <View className={containerStyles}>
        <Text className={`text-white text-center  ${titleStyles}`}>{title}</Text>
        <Text className="text-sm text-silver-100 text-center font-pdRegular">{subtitle}</Text>
     
    </View>
  )
}

export default InfoBox