import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  HomeTabSceeen,
  MessagesTabScreen,
  CategoriesTabScreen,
  ProfileTabScreen,
  SellTabScreen,
} from '../Screen/Index';
import Images from '../CustomData/Images';
import {NavigationContainer} from '@react-navigation/native';
import Fonts from '../CustomData/Fonts';
import FontSize from '../CustomData/FontSize';
import {useSelector} from 'react-redux';
import {LABEL_DATA} from '../BaseUrl/Baseurl';
import {getLanguage, SCREEN_Menu} from '../../LanguageTest';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  // console.log(
  //   'Data',
  //   data.data.LabelData[0].LabelData[0].Section_Product_Title,
  // );

  const [iscolor, setiscolor] = useState(false);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarLabel: () => {
          return null;
        },
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          // elevation: 30,
          height: 80,

          // marginBottom: 30,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },

        tabBarBackground: () => {
          return (
            <View
              style={{
                // height: 100,
                height: 80,

                backgroundColor: '#fff',
                // elevation: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeTabSceeen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <Image
                  source={Images['HomeTab']}
                  style={{
                    // borderWidth: 1,
                    width: 18,
                    height: 20,
                    tintColor: focused ? '#47CDFE' : '#878D8F',
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? '#47CDFE' : '#878D8F',
                    fontFamily: Fonts.regular,
                    fontSize: FontSize.size._12px,
                  }}>
                  {getLanguage(SCREEN_Menu)[0].LabelData.Home}
                </Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesTabScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    source={Images['CategoriesTab']}
                    style={{
                      width: 19,
                      height: 14,
                      tintColor: focused ? '#47CDFE' : '#878D8F',
                    }}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: focused ? '#47CDFE' : '#878D8F',
                      fontFamily: Fonts.regular,
                      fontSize: FontSize.size._12px,
                    }}>
                    {getLanguage(SCREEN_Menu)[0].LabelData.Categories}
                  </Text>
                </View>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Sell"
        component={SellTabScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <Image
                  source={Images['SellTab']}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? '#47CDFE' : '#878D8F',
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? '#47CDFE' : '#878D8F',
                    fontFamily: Fonts.regular,
                    fontSize: FontSize.size._12px,
                  }}>
                  {getLanguage(SCREEN_Menu)[0].LabelData.Sell}
                </Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesTabScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <Image
                  source={Images['MessagesTab']}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? '#47CDFE' : '#878D8F',
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? '#47CDFE' : '#878D8F',
                    fontFamily: Fonts.regular,
                    fontSize: FontSize.size._12px,
                  }}>
                  {getLanguage(SCREEN_Menu)[0].LabelData.Messages}
                </Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTabScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <>
                <Image
                  source={Images['ProfileTab']}
                  style={{
                    width: 16,
                    height: 18,
                    tintColor: focused ? '#47CDFE' : '#878D8F',
                  }}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? '#47CDFE' : '#878D8F',
                    fontFamily: Fonts.regular,
                    fontSize: FontSize.size._12px,
                  }}>
                  {getLanguage(SCREEN_Menu)[0].LabelData.Profile}
                </Text>
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
