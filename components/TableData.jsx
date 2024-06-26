import { View, Text, ScrollView } from 'react-native';
import React from 'react';

const TableData = ({ titles, data, datatitle }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Define a consistent width for each column
  const columnWidth = 130; // Adjust this value as needed
  
  return (
    <ScrollView horizontal>
      <View className="mt-10 border border-x-2 border-secondary-200">
        {/* Table Header */}
        <View className="flex-row justify-center items-center bg-secondary-200 p-2">
          {titles.map((title, index) => (
            <View key={index} className="p-2 border-solid border-black-100" style={{ width: columnWidth }}>
              <Text className="text-xl text-black-100">{title}</Text>
            </View>
          ))}
        </View>
        {/* Table Rows */}
        {data.map((item, index) => (
          <View key={index} className="flex-row justify-center items-center border border-secondary-200">
            {datatitle.map((title, subindex) => (
              <View key={subindex} className="p-2 border-c border-secondary-200" style={{ width: columnWidth }}>
                <Text className="text-lg" style={{ color: item[title] === true ? 'green' : 'silver' }}>
                  {(title === 'oddate' || title === 'fromdate' || title === 'todate') 
                    ? formatDate(item[title]) 
                    : (item[title] === true 
                      ? 'Approved' 
                      : item[title]?.toString() ?? 'N/A')}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TableData;
