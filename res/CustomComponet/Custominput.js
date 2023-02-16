import React, {useState} from 'react';
import {
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import {DeviceWidth} from '../constants/utils';
import Fonts from '../CustomData/Fonts';
import FontSize from '../CustomData/FontSize';

const Custominput = ({
  leftIcon,
  placeHolder,
  rightIcon,
  keyboardType,

  value,
  onchagentext = () => {},
  secureTextEntry,
  onRightIconPress,
  needLeftImage = true,
  needRigtImage = true,
}) => {
  const [isvible, setisvible] = useState(false);
  return (
    <>
      <View
        style={{
          height: 50,
          // width: '50%',
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
          value={value}
          onChangeText={onchagentext}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          placeholder={placeHolder}
          style={{
            // marginLeft: needLeftImage ? 13 : 5,
            color: 'black',
            width: '84%',
            // borderWidth: 1,
            marginStart: 8,
            fontFamily: Fonts.regular,
            fontSize: FontSize.size._16px,

            // fontSize: Fonts.size._14px,
            // width: '83%',
            // height: 44,
          }}
          placeholderTextColor={'#A9AEB5'}
        />

        <Pressable
          style={{position: 'absolute', right: 0}}
          onPress={onRightIconPress}>
          {needRigtImage ? (
            <Image source={rightIcon} style={{width: 21, height: 17}} />
          ) : null}
        </Pressable>
      </View>
    </>
  );
};

export {Custominput};
