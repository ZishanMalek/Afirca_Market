import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import FontSize from '../CustomData/FontSize';
import Fonts from '../CustomData/Fonts';
import Colors from '../CustomData/Colors';
import Images from '../CustomData/Images';
import {useNavigation} from '@react-navigation/native';

const HEIAGHT = Dimensions.get('window').height;

const CutomHeader = ({
  headrtitle = '',
  needLeftImage = true,
  leftIcon,
  needrightImage = true,
  rightIcon,
  needRightText = true,
  rightText,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#0048F7',
        width: '100%',
        // borderWidth: 1,
        // marginTop: 10,
        height: HEIAGHT * 0.09,
        // height: 300,
        // alignSelf: 'center',
        justifyContent: 'space-between',
        // top: 20,

        paddingHorizontal: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: HEIAGHT * 0.04,
        }}>
        <Pressable
          style={{
            flex: 0.12,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          {needLeftImage ? (
            <Image
              source={leftIcon}
              style={{
                // marginStart: 15,

                width: 20,

                height: 20,
              }}
            />
          ) : null}
        </Pressable>
        <Text
          style={{
            color: Colors.white,
            textAlign: 'center',

            flex: 1,
            fontFamily: Fonts.semibold,
            fontSize: FontSize.size._15px,
            // borderWidth: 1,
          }}>
          {headrtitle}
        </Text>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          {needrightImage ? (
            <Image
              source={rightIcon}
              style={{
                // marginStart: 15,

                width: 24,

                height: 24,
              }}
            />
          ) : null}
        </Pressable>
      </View>
    </View>
  );
};

export default CutomHeader;

const styles = StyleSheet.create({});
