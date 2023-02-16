import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../../../../CustomData/Images';
import Colors from '../../../../CustomData/Colors';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import CustomButtom from '../../../../CustomComponet/CustomButtom';
import {Dropdown} from 'react-native-element-dropdown';
import {months, years} from '../../../../CustomData/Dropdowndata';
import {useNavigation} from '@react-navigation/native';
const HEIGHT = Dimensions.get('window').height;
const WEIGHT = Dimensions.get('window').width;

const PaymentScreen = () => {
  const [isdone, setisdone] = useState(false);
  const [cardMonth, setCardMonth] = useState(null);
  const [cardYear, setCardYear] = useState(null);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              height: HEIGHT * 0.24,
              paddingHorizontal: 16,
              // marginTop: 40,
              zIndex: 2,
              width: '100%',
              backgroundColor: '#0048F7',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={Images['whiteremove']}
                  style={{width: 15, height: 15}}
                />
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
                Payment
              </Text>
            </View>

            <Text
              style={{
                textAlign: 'center',
                fontFamily: Fonts.bold,
                marginStart: 16,
                fontSize: FontSize.size._30px,
                color: 'white',
              }}>
              $ 939
            </Text>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Image
                source={Images['card']}
                style={{width: 343, height: 177, zIndex: 1}}
              />
            </View>
          </View>

          <View style={{marginTop: 130, paddingHorizontal: 19}}>
            <View
              style={{
                flexDirection: 'row',
                // borderWidth: 1,
                borderBottomWidth: 1,
                alignItems: 'center',
                borderBottomColor: '#E4E4E4',
                // paddingBottom: 10,
              }}>
              <Image source={Images['users']} style={{width: 24, height: 24}} />
              <TextInput
                placeholder="Name on card"
                placeholderTextColor={'#A9AEB5'}
                style={{
                  fontSize: 14,
                  fontFamily: Fonts.regular,
                  marginStart: 13,
                  width: '100%',
                  color: 'black',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 20,
                borderBottomWidth: 1,
                alignItems: 'center',
                borderBottomColor: '#E4E4E4',
                // paddingBottom: 10,
              }}>
              <Image
                source={Images['cardicons']}
                style={{width: 24, height: 24}}
              />
              <TextInput
                placeholder="Card Number"
                placeholderTextColor={'#A9AEB5'}
                style={{
                  fontSize: 14,
                  fontFamily: Fonts.regular,
                  marginStart: 13,
                  width: '100%',
                  color: 'black',
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginVertical: 20,

                // paddingBottom: 10,
              }}>
              <Image
                source={Images['expired']}
                style={{width: 24, height: 24}}
              />

              <Text
                style={{
                  color: '#202328',
                  fontFamily: Fonts.semibold,
                  fontSize: FontSize.size._14px,
                  marginStart: 14,
                }}>
                {' '}
                Expiry Date
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: -20}}>
              <Dropdown
                data={months}
                onChange={value => setCardMonth(value)}
                placeholder="Month"
                placeholderTextColor={'#A9AEB5'}
                placeholderStyle={{
                  fontSize: 14,
                  fontFamily: Fonts.regular,
                  color: 'black',
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  fontFamily: Fonts.regular,
                  color: '#264653',
                }}
                containerStyle={{
                  backgroundColor: '#0048F7',
                }}
                itemTextStyle={{
                  backgroundColor: '#0048F7',
                }}
                itemContainerStyle={{
                  backgroundColor: '#0048F7',
                }}
                // backgroundColor={'#2A9D8F'}
                statusBarIsTranslucent={true}
                labelField="label"
                valueField="value"
                dropdownPosition={'bottom'}
                style={styles.Dropdown}
                value={cardMonth}
              />
              <Dropdown
                data={years}
                onChange={value => setCardYear(value)}
                placeholder="YYYY"
                placeholderTextColor={'#A9AEB5'}
                placeholderStyle={{
                  fontSize: 14,
                  fontFamily: Fonts.regular,
                  color: 'black',
                }}
                selectedTextStyle={{
                  fontSize: 16,
                  fontFamily: Fonts.regular,
                  color: '#264653',
                }}
                containerStyle={{
                  backgroundColor: '#0048F7',
                }}
                itemTextStyle={{
                  backgroundColor: '#0048F7',
                }}
                itemContainerStyle={{
                  backgroundColor: '#0048F7',
                }}
                // backgroundColor={'#2A9D8F'}
                statusBarIsTranslucent={true}
                labelField="label"
                valueField="value"
                dropdownPosition={'bottom'}
                style={styles.Dropdown}
                value={years}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',

                  paddingHorizontal: 8,
                  // paddingBottom: 8,
                  // marginBottom: 6,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E4E4E4',
                }}>
                <TextInput
                  placeholder={'CVV'}
                  maxLength={3}
                  keyboardType={'numeric'}
                  placeholderTextColor="#A9AEB5"
                  style={styles.Dropdown1}
                />
                <Image
                  source={Images['info']}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 30,
              }}>
              <Pressable
                onPress={() => {
                  setisdone(!isdone);
                }}
                style={{
                  width: 20,
                  marginStart: 10,
                  height: 20,
                  alignItems: 'center',
                  backgroundColor: isdone ? Colors.skyBlue : 'white',
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: '#D5D5D5',
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  paddingHorizontal: 19,
                  color: '#202328',
                  marginStart: 10,
                  textAlign: 'justify',
                  fontSize: FontSize.size._12px,
                }}>
                By accepting our Terms and Conditions of Use, you agree to
                donate 1 US dollar each time you sell a product through our
                platform (AfricaMarket App).We do not charge any fees to Seller
                or Buyer.
                {'\n\n'}
                <Text style={{marginTop: 10}}>
                  Thank you - Your Africa Market™ Team.
                </Text>
              </Text>
            </View>

            <Pressable
              onPress={() => {
                navigation.navigate('PaymentDoneScreen');
              }}
              disabled={!isdone}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,

                // flex: 1,
                height: 45,
                // width: '100%',
                backgroundColor: isdone ? Colors.skyBlue : '#D5D5D5',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.bold,
                  fontSize: FontSize.size._16px,
                }}>
                PAY NOW
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  Dropdown: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingBottom: 0,
    // marginBottom: 6,
  },
  Dropdown1: {
    flex: 1,

    borderRadius: 8,
    color: 'black',
    paddingHorizontal: 8,
    paddingBottom: 8,
    marginBottom: 6,
  },
});
