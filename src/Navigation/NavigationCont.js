import React from 'react';
import { useColorScheme, NavigationContainer } from '@react-navigation/native';
import StackNav from './StackNav';

const NavigationDrawer = () => {

  // const scheme = useColorScheme();

  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default NavigationDrawer;
