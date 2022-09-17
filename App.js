import React, { useEffect, useRef } from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import StackNav from './src/Navigation/StackNav';
import axios from 'axios';
import { BASE_URL } from './src/services/constants';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';
axios.defaults.baseURL = BASE_URL;
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import firebase from '@react-native-firebase/app';
import ShowNotification from './src/utils/ShowNotification';
import { Alert, BackHandler, Linking, StatusBar } from 'react-native';
import { storage } from './src/services';
import VersionCheck from 'react-native-version-check';
import { FontConfig, PrimaryGreen } from './src/helper/styles.helper';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const store = configureStore();
const createChannels = () => {
  PushNotification.createChannel({
    channelId: 'Homee_Foods',
    channelName: 'Homee_Foods',
  });
};

const App = () => {
  const navigationRef = useRef(null);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: PrimaryGreen,
      // accent: AccentColor,
    },
    fonts: configureFonts(FontConfig),
  };

  useEffect(() => {
    checkVersion();
  }, []);

  const checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded.isNeeded) {
        Alert.alert(
          'Please Update',
          'You will have to update your app to the latest version to continue using.',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          { cancelable: false },
        );
      }
    } catch (error) { }
  };

  PushNotification.configure({
    onNotification: function (notification) {
      if (notification.userInteraction) {
        test(notification);
      }
    },
  });
  const test = async (notification) => {
    var id = await storage.getToken();
    if (id != null) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${id}` || '';
      if (notification?.path) {
        navigationRef.current.navigate(notification?.path);
      } else {
        navigationRef.current.navigate('Home');
      }
    } else {
      navigationRef.current.navigate('AppIntro');
    }
  }
  useEffect(() => {
    createChannels();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      await ShowNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);
  return (
    <Provider store={store}>
      <PaperProvider >
        <NavigationContainer ref={navigationRef}>
          <StatusBar backgroundColor="#09b44d" barStyle="light-content" />
          <StackNav />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;