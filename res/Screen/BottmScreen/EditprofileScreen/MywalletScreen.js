import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Fonts from '../../../CustomData/Fonts';
import FontSize from '../../../CustomData/FontSize';
import CustomButtom from '../../../CustomComponet/CustomButtom';
import CutomHeader from '../../../CustomComponet/CutomHeader';
import Images from '../../../CustomData/Images';
import Colors from '../../../CustomData/Colors';
import {useNavigation} from '@react-navigation/native';

const HEIGHT = Dimensions.get('window').height;

const MywalletScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              height: HEIGHT * 0.3,
              backgroundColor: '#0048F7',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 10,
              justifyContent: 'center',
            }}>
            <CutomHeader
              headrtitle="My Wallet"
              leftIcon={Images['whiteremove']}
            />
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  // marginTop: 10,
                  color: 'white',
                  textAlign: 'center',

                  fontSize: FontSize.size._40px,
                }}>
                $ 6,986
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  textAlign: 'center',

                  color: '#B2CDFB',
                  fontSize: FontSize.size._14px,
                }}>
                Current Balance
              </Text>
              <CustomButtom
                text="TRANSFFER"
                onpress={() => {
                  // navigation.navigate('');
                  Alert.alert('Coming Soon');
                }}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 16, marginTop: 9}}>
            <Text
              style={{
                color: '#202328',
                fontFamily: Fonts.bold,
                fontSize: FontSize.size._22px,
              }}>
              Saved Cards
            </Text>

            <View
              style={{
                height: 71,
                borderWidth: 1,
                borderColor: '#E2E1E5',
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginStart: 10,
                }}>
                <Image
                  source={Images['visa']}
                  style={{
                    height: 30,
                    width: 55,
                  }}
                />
                <Text
                  style={{
                    color: '#202328',
                    fontFamily: Fonts.semibold,
                    fontSize: FontSize.size._14px,
                    marginStart: 10,
                  }}>
                  XXXX XXXX XXXX 3455
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images['tic']}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
                <Image
                  source={Images['threedots']}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
              </View>
            </View>

            <View
              style={{
                height: 71,
                borderWidth: 1,
                borderColor: '#E2E1E5',
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginStart: 10,
                }}>
                <Image
                  source={Images['cash']}
                  style={{
                    height: 30,
                    width: 55,
                  }}
                />
                <Text
                  style={{
                    color: '#202328',
                    fontFamily: Fonts.semibold,
                    fontSize: FontSize.size._14px,
                    marginStart: 10,
                  }}>
                  XXXX XXXX XXXX 3455
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images['threedots']}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: 31,
            }}>
            <Image
              source={Images['add']}
              style={{
                width: 20,
                height: 20,
              }}
            />

            <Pressable style={{marginStart: 10}}>
              <Text
                style={{
                  fontSize: FontSize.size._15px,
                  color: Colors.skyBlue,
                  fontFamily: Fonts.bold,
                }}>
                Add New Card
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MywalletScreen;

const styles = StyleSheet.create({});
