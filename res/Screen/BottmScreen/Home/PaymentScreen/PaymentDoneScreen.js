import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Images from '../../../../CustomData/Images';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import CustomButtom from '../../../../CustomComponet/CustomButtom';
import Colors from '../../../../CustomData/Colors';
import {useNavigation} from '@react-navigation/native';

const PaymentDoneScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        backgroundColor: 'white',
      }}>
      <Image
        source={Images['payment']}
        style={{
          width: 187,
          height: 170,
        }}
      />

      <Text
        style={{
          color: '#202328',
          fontFamily: Fonts.bold,
          fontSize: FontSize.size._22px,
          marginTop: 9,
        }}>
        Payment Done!
      </Text>

      <Text
        style={{
          color: '#202328',
          fontFamily: Fonts.regular,
          textAlign: 'center',
          marginTop: 9,
          fontSize: FontSize.size._13px,
        }}>
        You have successfully completed the payment. The Seller will contact you
        soon.
      </Text>
      <Pressable
        onPress={() => navigation.navigate('PurchaseProduct')}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
          width: '60%',
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
          Ok
        </Text>
      </Pressable>
    </View>
  );
};

export default PaymentDoneScreen;

const styles = StyleSheet.create({});
