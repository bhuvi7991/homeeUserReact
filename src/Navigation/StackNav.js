import React from 'react';
import LogIn from '../screens/LogIn';
import Otp from '../screens/Otp';
import SignUp from '../screens/SignUp';
import Address from '../screens/Address';
import { createStackNavigator } from '@react-navigation/stack';
import Wallet from '../screens/Wallet';
import Home from '../screens/Home_New';
import ProductList from '../screens/ProductList';
import BottomTab from './BottomTab';
import FoodDetail from '../screens/FoodDetail';
import cartDetail from '../screens/CartDetail';
import ProfileEdit from '../screens/ProfileEdit';
import ManageAddress from '../screens/ManageAddress';
import Favourites from '../screens/Favourites';
import Language from '../screens/Language';
import OrderedFoodz from '../screens/OrderedFoodz';
import Notification from '../screens/Notification';
import UpiId from '../screens/UpiId';
import OrderSteps from '../screens/OrderSteps';
import Languages from '../screens/Languages';
import Cart from '../screens/Cart_New';
import CouponDetails from '../screens/CouponDetails';
import AddressChoose from '../screens/AddressChoose';
import OrderedList from '../screens/OrderedList';
import CartEmpty from '../screens/CartEmpty';
import Support from '../screens/Support';
import Help from '../screens/Help';
import AddMoney from '../screens/AddMoney';
import FoodListFilter from '../screens/FoodListFilter';
import CookSeeAll from '../screens/CookSeeAll';
import OrderedHistory from '../screens/OrderedHistory';
import EditAddress from '../screens/EditAddress';
import TrackMap from '../screens/TrackMap';
import LocationPermissionScreen from '../screens/LocationPermissionScreen';
import TermsAndConditions from '../screens/TermsAndConditions';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import AppIntro from '../screens/AppIntro';
import Profile from '../screens/Profile';
import Success from '../screens/Success';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Languages"
      headerMode="none">
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Languages" component={Languages} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={BottomTab} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
      <Stack.Screen name="CartPage" component={Cart} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="CartEmpty" component={CartEmpty} />
      <Stack.Screen name="SuccessScreen" component={Success} />
      <Stack.Screen name="profileEdit" component={ProfileEdit} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="ManageAddress" component={ManageAddress} />
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="OrderedFoodz" component={OrderedFoodz} />
      <Stack.Screen name="OrderedList" component={OrderedList} />
      <Stack.Screen name="OrderedHistory" component={OrderedHistory} />
      <Stack.Screen name="AddMoney" component={AddMoney} />
      <Stack.Screen name="UpiId" component={UpiId} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="OrderSteps" component={OrderSteps} />
      <Stack.Screen name="CouponDetails" component={CouponDetails} />
      <Stack.Screen name="AddressChoose" component={AddressChoose} />
      <Stack.Screen name="FoodListFilter" component={FoodListFilter} />
      <Stack.Screen name="CookSeeAll" component={CookSeeAll} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="TrackMap" component={TrackMap} />
      <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AppIntro" component={AppIntro} />
    </Stack.Navigator>
  );
};

export default StackNav;
