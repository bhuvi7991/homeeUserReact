import React, { useState } from 'react';
import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';



const FoodList = () => {
  const [inCheck, setInCheck] = useState()
  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      <CheckBox value={inCheck} />
    </View>
  );
};

export default FoodList;
