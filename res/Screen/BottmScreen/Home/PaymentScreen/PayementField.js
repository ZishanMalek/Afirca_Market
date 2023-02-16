import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Images from '../../../../CustomData/Images';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import CustomButtom from '../../../../CustomComponet/CustomButtom';
import Colors from '../../../../CustomData/Colors';

const PayementField = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'white',
      }}>
      <Image
        source={Images['paymenfild']}
        style={{
          width: 237,
          height: 186,
        }}
      />

      <Text
        style={{
          color: '#202328',
          fontFamily: Fonts.bold,
          fontSize: FontSize.size._22px,
          marginTop: 9,
        }}>
        Payment Failed!
      </Text>

      <Text
        style={{
          color: '#202328',
          fontFamily: Fonts.regular,
          textAlign: 'center',
          marginTop: 9,
          fontSize: FontSize.size._13px,
        }}>
        Unfortunately, the payment for this order has failed You may need to
        update your payment details.
      </Text>
      <Pressable
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          width: '63%',
          height: 45,
          borderRadius: 4,
          // width: '100%',
          backgroundColor: Colors.skyBlue,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: Fonts.bold,
            fontSize: FontSize.size._16px,
          }}>
          PYAMENT DETAILS
        </Text>
      </Pressable>
    </View>
  );
};

export default PayementField;

const styles = StyleSheet.create({});
