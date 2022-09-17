import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dish from '../screens/todayMenu/Dish';
import Chef from '../screens/todayMenu/Chef';

const TTab =
  createMaterialTopTabNavigator();

const TopTab = ({ navigation }) => {
  return (
    <TTab.Navigator
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#09b44d',
        activeBackgroundColor: '#d6f3e3',
        scrollEnabled: true,
        tabStyle: {
          marginVertical: 5,
          width: 'auto',
          paddingHorizontal: 15
        },
        indicatorStyle: {
          backgroundColor: '#09b44d',
          height: 35,
          borderRadius: 30,
          marginBottom: 12,
        },
        labelStyle: {
          fontSize: 14,
          textTransform: 'none',
          fontFamily: 'Poppins-Bold',
        },
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          numberOfLines: 1,
          marginLeft: 15
        },
      }}>
      <TTab.Screen
        style={{ color: '#fff' }}
        name="Dish"
        component={Dish}
      />
      <TTab.Screen name="Chef" component={Chef} />
    </TTab.Navigator>
  );
};



export default TopTab;
