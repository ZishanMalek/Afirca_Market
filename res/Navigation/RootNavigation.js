import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UnAuthScreen from './UnAuthScreen';
import {useSelector} from 'react-redux';
import {LOGIN} from '../../Redux/ActionType';
import AuthScreen from './AuthScreen';

const RootNavigation = () => {
  const isAuthenticated = false;

  const data = useSelector(state => state.session);
  const islogin = data[LOGIN];
  console.log(islogin);

  // console.log(islogin);
  const [nologin, setnologin] = useState(false);
  return islogin ? <AuthScreen /> : <UnAuthScreen />;
};

export default RootNavigation;

const styles = StyleSheet.create({});
