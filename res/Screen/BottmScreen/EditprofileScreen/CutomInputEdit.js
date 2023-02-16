import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Fonts from '../../../CustomData/Fonts';
import FontSize from '../../../CustomData/FontSize';

const CutomInputEdit = ({text = '', placeholder = '', keyboardType = ''}) => {
  return (
    <>
      <View style={{marginVertical: 14}}>
        <Text
          style={{
            color: '#93979E',
            fontFamily: Fonts.medium,
            fontSize: FontSize.size._14px,
          }}>
          {text}
        </Text>
        <TextInput
          placeholder={placeholder}
          keyboardAppearance="dark"
          keyboardType={keyboardType}
          placeholderTextColor={'#93979E'}
          autoCapitalize="none"
          style={{
            width: '100%',
            borderBottomWidth: 1,
            color: '#202328',
            borderBottomColor: '#E4E4E4',
          }}
        />
      </View>
    </>
  );
};

export default CutomInputEdit;

const styles = StyleSheet.create({});
