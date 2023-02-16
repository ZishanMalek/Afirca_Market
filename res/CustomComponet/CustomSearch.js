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
import {DeviceWidth} from '../constants/utils';
import Fonts from '../CustomData/Fonts';
import FontSize from '../CustomData/FontSize';

const CustomSearch = ({
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

        <TextInput
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeHolder}
          onChange={onChange}
          value={value}
          onChangeText={onChangeText}
          style={{
            // marginLeft: needLeftImage ? 13 : 5,
            color: 'black',
            marginStart: 8,
            width: '100%',
            fontFamily: Fonts.regular,
            fontSize: FontSize.size._16px,

            // fontSize: Fonts.size._14px,
            // width: '83%',
            // height: 44,
          }}
          placeholderTextColor={'#A9AEB5'}
        />

        <Pressable style={{position: 'absolute', right: 10}} onPress={onPress}>
          {needRigtImage ? (
            <Image source={rightIcon} style={{width: 21, height: 17}} />
          ) : null}
        </Pressable>
      </View>
    </>
  );
};

export {CustomSearch};
