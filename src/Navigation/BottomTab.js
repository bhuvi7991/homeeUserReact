import React, { useEffect, useState } from 'react';
import { View, Text, Header, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  home,
  searchIcon,
  cartIcon,
  userIcon,
  circle,
  homeUnsel,
  userIconUnsel,
  searchIconUnsel,
  cartIconUnsel,
  homeeIcon,
  homeeLogo
} from '../assets/img/Images';
//import DashBoard from '../screens/DashBoard1';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import { useTranslation } from 'react-i18next';
import Cart from '../screens/Cart_New';
import { storage } from '../services';
import HomeNew from '../screens/Home_New';

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation, route }) => {
  const [cartStatus, setCartStatus] = useState(null);
  const getCartStatus = async () => {
    let status = await storage.getCartStatus();
    setCartStatus(status);
  };

  const { t, i18n } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={route.params?.type == 'Profile' ? "Account" : "Home"}
      tabBarOptions={{
        showLabel: false,
        style: {
          paddingTop: 7.5,
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 70,
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNew}
        headerShown={false}
        listeners={{
          focus: e => {
            getCartStatus();
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={home}
                style={[
                  styles.btmTabIcon,
                  {
                    tintColor: focused ? '#09b44d' : '#B2B2B2',
                  },
                ]}
              />
              <Text
                style={[
                  styles.btmTabText,
                  { color: focused ? '#09b44d' : '#B2B2B2' },
                ]}>
                {t('bottomTabPage.home')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        headerShown={false}
        listeners={{
          focus: e => {
            getCartStatus();
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <Image
                  source={cartIcon}
                  style={[
                    styles.btmTabIcon,
                    {
                      tintColor: focused ? '#09b44d' : '#B2B2B2',
                    },
                  ]}
                />
                {cartStatus != null && cartStatus != 0 && (
                  <Image
                    source={circle}
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 10,
                      position: 'absolute',
                      top: 0,
                      right: -10,
                    }}
                  />
                )}
              </View>

              <Text
                style={[
                  styles.btmTabText,
                  { color: focused ? '#09b44d' : '#B2B2B2' },
                ]}>
                {t('bottomTabPage.cart')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Homee"
        component={Search}
        headerShown={false}
        // listeners={{
        //   focus: e => {
        //     getCartStatus();
        //   },
        // }}
        options={{
          headerShown: false,
          tabBarButton: () => (
            <View style={{ width: 65, height: 65, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: '#fff', elevation: 5, marginTop: -7 }} onPress={null} >
              <Image source={homeeLogo} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
            </View>
          ),
          // tabBarIcon: ({ focused }) => (
          //   <View
          //     style={{
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //     }}>
          //     <Image
          //       source={searchIcon}
          //       style={[
          //         styles.btmTabIcon,
          //         {
          //           tintColor: focused ? '#09b44d' : '#B2B2B2',
          //         },
          //       ]}
          //     />
          //   </View>
          // ),
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        headerShown={false}
        listeners={{
          focus: e => {
            getCartStatus();
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={searchIcon}
                style={[
                  styles.btmTabIcon,
                  {
                    tintColor: focused ? '#09b44d' : '#B2B2B2',
                  },
                ]}
              />
              <Text
                style={[
                  styles.btmTabText,
                  { color: focused ? '#09b44d' : '#B2B2B2' },
                ]}>
                {t('bottomTabPage.search')}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        headerShown={false}
        listeners={{
          focus: e => {
            getCartStatus();
          },
        }}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={userIcon}
                style={[
                  styles.btmTabIcon,
                  {
                    tintColor: focused ? '#09b44d' : '#B2B2B2',
                  },
                ]}
              />
              <Text
                style={[
                  styles.btmTabText,
                  { color: focused ? '#09b44d' : '#B2B2B2' },
                ]}>
                {t('bottomTabPage.account')}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  btmTabIcon: {
    width: 25,
    height: 20,
    resizeMode: 'contain'
  },
  btmTabText: {
    fontFamily: 'NexaBold',
    fontSize: 12,
    marginTop: 3,
  },
});

export default BottomTab;
