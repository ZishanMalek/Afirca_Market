import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UtilsStyles} from '../../../constants/Utils';
import FontSize from '../CustomData/FontSize';
import Fonts from '../CustomData/Fonts';
import Colors from '../CustomData/Colors';

const HomeText = ({heading, pressableText, onpress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          color: '#202328',
          fontFamily: Fonts.bold,
          fontSize: FontSize.size._19px,
        }}>
        {heading}
      </Text>

      <Pressable onPress={onpress}>
        <Text
          style={{
            color: Colors.skyBlue,
            fontSize: FontSize.size._14px,
            fontFamily: Fonts.semibold,
          }}>
          {pressableText}
        </Text>
      </Pressable>
    </View>
  );
};

export default HomeText;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
