import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../CustomData/Colors';
import Fonts from '../CustomData/Fonts';
import FontSize from '../CustomData/FontSize';

const CustomButtom = ({text = '', onpress = () => {}, disabled}) => {
  return (
    <Pressable
      onPress={onpress}
      disabled={disabled}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        height: 45,
        borderRadius: 4,
        // width: '100%',
        backgroundColor: Colors.skyBlue,
      }}>
      <Text
        style={{
          color: 'white',
          fontFamily: Fonts.bold,
          fontSize: FontSize.size._16px,
        }}>
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButtom;

const styles = StyleSheet.create({});

export const CustomButtom1 = ({
  text = '',
  onpress = () => {},
  disabled,
  color,
}) => {
  return (
    <Pressable
      onPress={onpress}
      disabled={disabled}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        height: 45,
        borderRadius: 4,
        // width: '100%',
        backgroundColor: color,
      }}>
      <Text
        style={{
          color: 'white',
          fontFamily: Fonts.bold,
          fontSize: FontSize.size._16px,
        }}>
        {text}
      </Text>
    </Pressable>
  );
};
