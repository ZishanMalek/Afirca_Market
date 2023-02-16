import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../CustomData/Fonts';
import FontSize from '../CustomData/FontSize';
import Images from '../CustomData/Images';

const CutomEditProfileInput = ({
  text = '',
  needleftimage = true,
  leftimage,
  onPress = () => {},
}) => {
  return (
    <View
      style={{
        marginTop: 21,
        // marginVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginStart: 50,
      }}>
      {needleftimage ? (
        <Image
          source={leftimage}
          style={{
            width: 24,
            height: 24,
          }}
        />
      ) : null}
      <Pressable
        onPress={onPress}
        style={{
          color: 'black',
          borderBottomColor: '#E4E4E4',
          borderBottomWidth: 1,
          width: '80%',
          marginStart: 27,
          paddingBottom: 10,
          // marginBottom: 10,

          fontFamily: Fonts.regular,
          fontSize: FontSize.size._16px,
        }}>
        <Text
          style={{
            color: '#202328',
            fontFamily: Fonts.semibold,
            fontSize: FontSize.size._16px,
          }}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default CutomEditProfileInput;

const styles = StyleSheet.create({});
