import React, {useState} from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getLanguage, SCREEN_Dashboard} from '../../LanguageTest';
import {LABEL_DATA} from '../BaseUrl/Baseurl';
import {DeviceWidth} from '../constants/utils';
import Fonts from '../CustomData/Fonts';
import FontSize from '../CustomData/FontSize';

const FixedSeach = ({
  leftIcon,
  placeHolder,
  rightIcon,
  keyboardType,
  secureTextEntry,
  onChange,
  onpressLeft = () => {},
  onRightIconPress,
  needLeftImage = true,
  needRigtImage = true,
  onPress = () => {},
  value,
  onChangeText = '',
}) => {
  const [isvible, setisvible] = useState(false);

  return (
    <>
      <View
        style={{
          height: 40,
          // width: '50%',
          // marginTop: 10,
          //   borderWidth: 1,
          //   borderBottomWidth: 1,
          //   borderBottomColor: '#E4E4E4',
          marginVertical: 10,
          // paddingVertical: 10,
          // paddingBottom: -70,

          justifyContent: 'flex-start',
          flexDirection: 'row',
          //   paddingHorizontal: 15,
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          borderRadius: 4,
          //   borderColor: '#D7DBD1',
        }}>
        <Pressable onPress={onpressLeft}>
          {needLeftImage ? (
            <Image
              source={leftIcon}
              style={{
                marginStart: 10,

                width: 24,

                height: 24,
              }}
            />
          ) : null}
        </Pressable>

        <Text
          style={{
            // marginLeft: needLeftImage ? 13 : 5,
            color: '#A9AEB5',
            // left: Lang_Id == 21 ? 0 : null,
            // paddingEnd: Lang_Id == 21 ? 10 : null,
            // position: Lang_Id == 21 ? 'absolute' : null,

            width: '86%',
            // backgroundColor: 'red',

            fontFamily: Fonts.regular,
            // marginStart: SCREEN_Dashboard ? 10 : 0,
            marginStart: getLanguage(SCREEN_Dashboard)[0].LabelData.Search_Area
              ? 10
              : 9,
            // fontSize: Lang_Id == 18 ? FontSize.size._13px : FontSize.size._16px,

            // fontSize: Fonts.size._14px,
            // width: '83%',
            // height: 44,
          }}>
          {getLanguage(SCREEN_Dashboard)[0].LabelData.Search_Area}
        </Text>
      </View>
    </>
  );
};

export {FixedSeach};
