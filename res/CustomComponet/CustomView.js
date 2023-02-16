import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomView = ({postion1 = '', postion2 = '', postion3 = ''}) => {
  return (
    <View
      style={{
        width: 11,
        height: 2,
        backgroundColor: 'red',
        marginHorizontal: 5,
      }}></View>
  );
};

export default CustomView;

const styles = StyleSheet.create({});
