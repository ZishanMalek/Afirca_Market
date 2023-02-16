import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Fonts from '../CustomData/Fonts';
import FontSize from '../CustomData/FontSize';

const Cutominputreg = ({
  leftIcon,
  placeHolder,
  rightIcon,
  keyboardType,
  secureTextEntry,
  onRightIconPress,
  value,
  onchagentext = () => {},
  needLeftImage = true,
  needRigtImage = true,
}) => {
  return (
    <View
      style={{
        height: 55,
        width: '45%',
        // marginTop: 10,
        //   borderWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E4E4',
        marginVertical: 10,
        // paddingVertical: 10,
        // paddingBottom: -70,

        justifyContent: 'flex-start',
        flexDirection: 'row',
        //   paddingHorizontal: 15,
        alignItems: 'center',
        // backgroundColor: '#F5F5F5',
        //   borderColor: '#D7DBD1',
      }}>
      {needLeftImage ? (
        <Image
          source={leftIcon}
          style={{
            // marginStart: 15,

            width: 24,

            height: 24,
          }}
        />
      ) : null}
      <TextInput
        placeholder={placeHolder}
        value={value}
        onChangeText={onchagentext}
        keyboardType={keyboardType}
        style={{
          // marginLeft: needLeftImage ? 13 : 5,
          color: 'black',
          width: '80%',
          marginStart: 8,
          fontFamily: Fonts.regular,
          fontSize: FontSize.size._16px,

          // fontSize: Fonts.size._14px,
          // width: '83%',
          // height: 44,
        }}
        placeholderTextColor={'#A9AEB5'}
      />
    </View>
  );
};

export default Cutominputreg;

const styles = StyleSheet.create({});
