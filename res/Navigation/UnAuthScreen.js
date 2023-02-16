import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {IntroScreen, Login, Register} from './../Screen/Index';
import SecondIntro from '../Screen/introScreen/SecondIntro';
import {LABEL_DATA, LANGUAGE_LABEL_DATA} from '../../Redux/ActionType';
import {useSelector} from 'react-redux';
import VerficaionCode from '../Screen/LoginAndRegisterScreen/RegisterScreen/VerficaionCode';
import Colors from '../CustomData/Colors';
import MobileVerfication from '../Screen/LoginAndRegisterScreen/RegisterScreen/MobileVerfication';

const Stack = createStackNavigator();

const UnAuthScreen = () => {
  const session = useSelector(state => state.session);
  const LableData = session[LANGUAGE_LABEL_DATA];
  // console.log('LableData', LableData);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.blue} />
      <Stack.Navigator
        initialRouteName={LableData ? 'SecondIntro' : 'Intro'}
        // initialRouteName="Intro"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,

          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="SecondIntro" component={SecondIntro} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="VerficaionCode" component={VerficaionCode} />
        <Stack.Screen name="MobileVerfication" component={MobileVerfication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UnAuthScreen;

const styles = StyleSheet.create({});
