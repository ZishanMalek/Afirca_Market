import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Colors from '../CustomData/Colors';

const Indicater = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}>
      <UIActivityIndicator color={Colors.skyBlue} size={50} />
    </View>
  );
};

export default Indicater;

const styles = StyleSheet.create({});
