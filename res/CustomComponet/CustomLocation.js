import {Alert, Image, StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Images from '../CustomData/Images';
import FontSize from '../CustomData/FontSize';
import Fonts from '../CustomData/Fonts';
import {WIDTHGet} from '../CustomData/Colors';
import Geolocation from 'react-native-geolocation-service';
import {useEffect} from 'react';

const CustomLocation = ({text, onPress = {}}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        // paddingHorizontal: 12,
        justifyContent: 'space-around',
        marginTop: 48,
      }}>
      <Pressable
        onPress={onPress}
        onpre
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: WIDTHGet * 0.43,
          // borderWidth: 1,
        }}>
        <Image
          source={Images['map']}
          style={{width: 12, height: 15, marginStart: 0}}
        />

        <Text
          style={{
            color: 'white',
            fontSize: FontSize.size._16px,
            marginBottom: 3,
            fontFamily: Fonts.semibold,
          }}>
          {text}
        </Text>

        <Pressable>
          <Image source={Images['down']} style={{width: 9, height: 6}} />
        </Pressable>
      </Pressable>

      <View style={{position: 'absolute', right: 18, marginTop: 5}}>
        <Image
          source={Images['Notification']}
          style={{width: 18, height: 25}}
        />
      </View>
    </View>
  );
};

export default CustomLocation;

const styles = StyleSheet.create({});
