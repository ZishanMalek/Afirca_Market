import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import React from 'react';
import Images from '../../../CustomData/Images';
import Colors from '../../../CustomData/Colors';
import Fonts from '../../../CustomData/Fonts';
import {useState} from 'react';
import ContryCodeAll from '../../../CustomData/ContryCodeAll';
import {getLanguage, SCREEN_Register} from '../../../../LanguageTest';
import FontSize from '../../../CustomData/FontSize';
import CustomButtom from '../../../CustomComponet/CustomButtom';

import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const MobileVerfication = ({}) => {
  const navigation = useNavigation();
  const [phone, setphone] = useState('');
  const [langid, setlangid] = useState(1);
  const [getNoti, setgetNoti] = useState('');
  const [isseletedmodel, setisseletedmodel] = useState(false);
  const [contryData, setcontryData] = useState(ContryCodeAll);
  const [setno, setsetno] = useState('');
  console.log('phone', phone.mobileNumber);

  // useEffect(() => {
  //   DeviceNumber.get().then(res => {
  //     console.log(res);
  //     // setsetno(res);
  //   });
  // }, []);
  const getno = () => {
    DeviceNumber.get().then(res => {
      console.log(res);
      // setsetno(res);
      setphone(res);
    });
  };

  const [isCountryCodePickar, setisCountryCodePickar] = useState(false);

  // console.log('contryData', contryData);
  // console.log(setno);

  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState(ContryCodeAll);
  const [masterdata, setmasterdata] = useState(ContryCodeAll);

  let phonoget = phone.mobileNumber;

  const searchData = text => {
    if (text) {
      const newData = masterdata.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log('newData', newData);
      setfilterdata(newData);
      setsearch(text);
    } else {
      setfilterdata(masterdata);
      setsearch(text);
    }

    // this.setState({offlineData:[...searchResult], arrCategoryList:[...searchResult]})
  };
  const signInWithPhoneNumber = async () => {
    // setAcitiviteIndishow(true);
    // setIstimerrunning(true);
    // Alert.alert(phoneno);
    try {
      //   const confirmation = await auth().signInWithPhoneNumber(phoneno);
      const confirm = await auth().signInWithPhoneNumber(phone.mobileNumber);

      // setConfirm(confirmation);
      console.log('confirm', confirm);

      if (confirm._auth._authResult) {
        navigation.navigate('Verificaion', {
          confirm: confirm,
        });
      } else {
        Alert.alert('worng input');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 19,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              // justifyContent: 'space-between',
            }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={Images['black']}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </Pressable>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
                width: '90%',
                color: '#000000',
              }}>
              Mobile Verification
            </Text>
          </View>
          <Text
            style={{
              color: Colors.gray,
              fontSize: 15,
              marginTop: 40,
              fontFamily: Fonts.semibold,
            }}>
            WellCome to
          </Text>
          <Text
            style={{
              color: Colors.gray,
              fontSize: 12,
              marginTop: 10,
              fontFamily: Fonts.medium,
            }}>
            Enter The Mobile Number You Used To Register With Us.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 30,
              // justifyContent: 'space-between',
            }}>
            <TextInput
              value={phone.mobileNumber}
              onFocus={() => getno()}
              onChangeText={text => setphone(text)}
              keyboardType={'number-pad'}
              placeholder={
                getLanguage(SCREEN_Register)[0].LabelData.Mobile_Number
              }
              style={{
                // marginLeft: needLeftImage ? 13 : 5,
                color: 'black',
                width: '67%',
                borderBottomColor: '#E4E4E4',
                borderBottomWidth: 1,
                // borderWidth: 1,
                marginStart: 8,
                marginBottom: 14,
                fontFamily: Fonts.regular,
                fontSize: FontSize.size._16px,

                // fontSize: Fonts.size._14px,
                // width: '83%',
                // height: 44,
              }}
              placeholderTextColor={'#A9AEB5'}
            />
            <View>
              <Modal isVisible={isCountryCodePickar}>
                <Pressable
                  style={{flex: 1, backgroundColor: 'white'}}
                  onPress={() => {
                    // setisCountryCodePickar(false);
                    // alert('sdf');
                  }}>
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
                    <Image
                      source={Images['Search']}
                      style={{
                        marginStart: 10,

                        width: 24,

                        height: 24,
                      }}
                    />

                    <TextInput
                      placeholder="Search Your Country Code"
                      placeholderTextColor={'#A9AEB5'}
                      value={search}
                      onChangeText={text => searchData(text)}
                      style={{
                        // marginLeft: needLeftImage ? 13 : 5,
                        marginStart: 8,
                        color: '#A9AEB5',

                        width: '86%',
                        // backgroundColor: 'red',

                        fontFamily: Fonts.regular,

                        width: '83%',
                        // height: 44,
                      }}
                    />
                  </View>
                  <FlatList
                    data={filterdata}
                    renderItem={({item}) => {
                      // setfilterdata(item);
                      // setmasterdata(item);
                      // console.log('item', item);
                      return (
                        <Pressable
                          onPress={() => {
                            // alert(item.name);
                            setsetno(item.callingCode);
                            setisCountryCodePickar(false);
                            setcontryData(item);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: 'white',
                              height: 50,
                              // justifyContent: 'space-evenly',
                              // marginHorizontal: 10,
                              marginVertical: 10,
                            }}>
                            <Image
                              // source={{uri: item.flag}}
                              source={item.flag}
                              style={{
                                width: 30,
                                height: 30,
                                marginHorizontal: 10,
                              }}
                              // resizeMode="contain"
                            />
                            <Text
                              style={{
                                color: '#202328',
                                fontFamily: Fonts.regular,
                                fontSize: FontSize.size._15px,
                              }}>
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                color: '#202328',
                                fontFamily: Fonts.regular,
                                fontSize: FontSize.size._15px,
                              }}>
                              {'+' + item.callingCode}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    }}
                  />
                </Pressable>
              </Modal>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={() => {
                signInWithPhoneNumber();

                navigation.navigate('VerficaionCode', {
                  mobileNumber: phone.mobileNumber,
                });
              }}
              // disabled={phone.mobileNumber == '' ? true : true}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
                height: 45,
                borderRadius: 4,
                // width: '100%',
                backgroundColor:
                  phone.mobileNumber > 0 ? Colors.skyBlue : '#E4E4E4',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.bold,
                  fontSize: FontSize.size._16px,
                }}>
                Send otp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MobileVerfication;

const styles = StyleSheet.create({});
