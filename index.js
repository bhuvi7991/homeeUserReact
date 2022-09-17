/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import i18n from './src/translations/i18n';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging'
import ShowNotification from './src/utils/ShowNotification'

AppRegistry.registerComponent(appName, () => App);
