import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './BottomTab';
import Secound from '../Screen/BottmScreen/Home/Secound';
import ProductCategrois from '../Screen/BottmScreen/Home/AllCategorysub/ProductCategrois';
import ServicesCategoris from '../Screen/BottmScreen/Home/AllCategorysub/ServicesCategoris';
import ScearchScreen from '../Screen/BottmScreen/Home/SearchScreenCreate/ScearchScreen';
import PaymentScreen from '../Screen/BottmScreen/Home/PaymentScreen/PaymentScreen';
import PaymentDoneScreen from '../Screen/BottmScreen/Home/PaymentScreen/PaymentDoneScreen';
import PayementField from '../Screen/BottmScreen/Home/PaymentScreen/PayementField';
import ProuductSubCategoris from '../Screen/BottmScreen/Home/AllCategorysub/SubCategory/ProuductSubCategoris';
import ProductDetailsScreen from '../Screen/BottmScreen/Home/productDetailScreen/ProductDetailsScreen';
import ChatScreen from '../Screen/BottmScreen/ChatScreen/ChatScreen';
import ServicesSubcCategoris from '../Screen/BottmScreen/Home/AllCategorysub/SubCategory/ServicesSubcCategoris';
import EditProfileScreen from '../Screen/BottmScreen/EditprofileScreen/EditProfileScreen';
import MywalletScreen from '../Screen/BottmScreen/EditprofileScreen/MywalletScreen';
import MainOver from '../Screen/BottmScreen/Home/ProductAndSevicesoverview/MainOver';
import ProductOverview from '../Screen/BottmScreen/Home/ProductAndSevicesoverview/ProductOverview';
import ServiesOverView from '../Screen/BottmScreen/Home/ProductAndSevicesoverview/ServiesOverView';
import PurchaseProduct from '../Screen/BottmScreen/Home/ProductAndSevicesoverview/PurchaseProduct';
import ChangePassword from '../Screen/BottmScreen/EditprofileScreen/ChangePassword';
import Setting from '../Screen/BottmScreen/EditprofileScreen/Setting';
import Support from '../Screen/BottmScreen/EditprofileScreen/Support';
import Mywatchlist from '../Screen/BottmScreen/EditprofileScreen/Mywatchlist';
import SellerProfile from '../Screen/BottmScreen/EditprofileScreen/SellerProfile';
import Themeing from '../Screen/BottmScreen/EditprofileScreen/Themeing';
import {IntroScreen, Login, ProfileTabScreen} from '../Screen/Index';
import ChangeLanuage from '../Screen/ChangeLanuage/ChangeLanuage';
import SecondIntro from '../Screen/introScreen/SecondIntro';
import UserProductDetails from '../Screen/BottmScreen/Home/productDetailScreen/UserProductDetails';
import GoogleSearchData from '../Screen/BottmScreen/Home/GoogleSearchData';
import ServicesDetaliScreen from '../Screen/BottmScreen/Home/ServicesDatilsScreen/ServicesDetaliScreen';
import UserServicesDetails from '../Screen/BottmScreen/Home/ServicesDatilsScreen/UserServicesDetails';

const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTab"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="ProfileScreen" component={ProfileTabScreen} />
        <Stack.Screen name="LoginScren" component={Login} />

        <Stack.Screen name="ChangeLanuage" component={ChangeLanuage} />
        <Stack.Screen name="GoogleSearchData" component={GoogleSearchData} />

        <Stack.Screen
          name="UserProductDetails"
          component={UserProductDetails}
        />
        <Stack.Screen
          name="UserServicesDetails"
          component={UserServicesDetails}
        />
        <Stack.Screen
          name="ServicesDetaliScreen"
          component={ServicesDetaliScreen}
        />

        <Stack.Screen name="SecondIntro" component={SecondIntro} />
        <Stack.Screen
          name="ProuductSubCategoris"
          component={ProuductSubCategoris}
        />
        <Stack.Screen name="ScearchScreen" component={ScearchScreen} />
        <Stack.Screen name="Secound" component={Secound} />
        <Stack.Screen name="ProductCategrois" component={ProductCategrois} />

        <Stack.Screen name="ServicesCategoris" component={ServicesCategoris} />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="PaymentDoneScreen" component={PaymentDoneScreen} />
        <Stack.Screen name="PayementField" component={PayementField} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen
          name="ServicesSubcCategoris"
          component={ServicesSubcCategoris}
        />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="MywalletScreen" component={MywalletScreen} />
        <Stack.Screen name="MainOver" component={MainOver} />
        <Stack.Screen name="ProductOverview" component={ProductOverview} />
        <Stack.Screen name="ServiesOverView" component={ServiesOverView} />
        <Stack.Screen name="PurchaseProduct" component={PurchaseProduct} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Mywatchlist" component={Mywatchlist} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="SellerProfile" component={SellerProfile} />
        <Stack.Screen name="Themeing" component={Themeing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
