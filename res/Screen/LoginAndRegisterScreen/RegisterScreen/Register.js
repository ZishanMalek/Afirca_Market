import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Images from '../../../CustomData/Images';
import Colors, {HEIGHTGet} from '../../../CustomData/Colors';
import Fonts from '../../../CustomData/Fonts';
import FontSize from '../../../CustomData/FontSize';
import {Custominput} from '../../../CustomComponet/Custominput';
import CustomButtom from '../../../CustomComponet/CustomButtom';
import FixedSeach from '../../../CustomComponet/FixedSeach';

import Cutominputreg from '../../../CustomComponet/Cutominputreg';
import {
  LABEL_DATA,
  LOGIN,
  USERS_Data,
  USERS_DATAS,
} from '../../../../Redux/ActionType';
import {useSelector} from 'react-redux';
const HEIGHT = Dimensions.get('window').height;
import Modal from 'react-native-modal';
import ContryCodeAll, {CountryAllCode} from '../../../CustomData/ContryCodeAll';
import {getLanguage, SCREEN_Register} from '../../../../LanguageTest';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {BASE_URl, REGISTER_API, REGISTER_Api} from '../../../BaseUrl/Baseurl';
import axios from 'axios';
import Indicater from '../../../ActivityIndicator/ActivityIndicator';
import {setSessionFild} from '../../../../Redux/SessionAction';
import {Store} from '../../../../Redux/MainStore';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../ActivityIndicator/CustomLoader';

const Register = ({navigation}) => {
  const [isvible, setisvible] = useState(false);
  const [show, setShow] = useState(false);
  const [fistname, setfistname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  // const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [setno, setsetno] = useState('');
  const [countrycode, setcountrycode] = useState('+91');
  const [phone, setphone] = useState('');
  const [langid, setlangid] = useState(1);
  const [getNoti, setgetNoti] = useState('');
  const [isseletedmodel, setisseletedmodel] = useState(false);
  const [contryData, setcontryData] = useState(ContryCodeAll);
  // console.log('contryData', contryData);
  // console.log(setno);

  const [search, setsearch] = useState('');
  const [filterdata, setfilterdata] = useState(ContryCodeAll);
  const [masterdata, setmasterdata] = useState(ContryCodeAll);
  const Deviceget = JSON.stringify(Platform.OS);
  const Notification = JSON.stringify(getNoti);

  useEffect(() => {
    requestUserPermission();
    notifacitonListner();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      gettokenNoti();
    }
  }

  const gettokenNoti = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log('old', fcmToken);
    setgetNoti(fcmToken);

    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log(' new Genrate  Token', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const notifacitonListner = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });
    messaging().onMessage(async remoteMessage => {
      console.log('recived in forground', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  };
  // const [CountryCode, setCountryCode] = useState('+91');
  const [isCountryCodePickar, setisCountryCodePickar] = useState(false);

  // ---------------------------registe api--------------
  useEffect(() => {
    // RegisterApi();
  }, []);
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

  // const [isloder, setislogin] = useState(false);
  const [isloder, setisloder] = useState(false);
  async function RegisterApi() {
    setisloder(true);
    let isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      Toast.show({
        type: 'error',
        text1: 'No Internet Connection',
        topOffset: 0,
        visibilityTime: 1200,
        text2: 'Please Check Your Internet Connection',
      });
    } else {
      axios
        .post(BASE_URl + REGISTER_API, {
          LangId: '1',
          FirstName: fistname.trim(),
          LastName: lastname.trim(),
          CountryCode: '+91',
          MobileNumber: phone,
          Email: email.trim(),
          Password: confirmpassword.trim(),
          DeviceTocken: Notification,
          DeviceType: Deviceget,
        })
        .then(res => res.data)
        .then(res => {
          {
            setisloder(false);

            console.log('res', res.data);
            console.log(res);
            Toast.show({
              type: 'success',
              text1: 'success',
              topOffset: 0,
              visibilityTime: 1200,
              text2: res.message,
            });
            if (res.status == 'success') {
              Store.dispatch(setSessionFild(USERS_DATAS, res.data));
              Store.dispatch(setSessionFild(LOGIN, true));

              // navigation.navigate('B');/
            }
          }
        })
        .catch(err => {
          setisloder(false);

          console.log('err', err.response);
          Toast.show({
            type: 'error',
            text1: 'Error',
            topOffset: 0,
            visibilityTime: 1200,
            text2: err.response.data.message,
          });
        });
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <StatusBar backgroundColor={'white'} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}>
          <Toast />
          <CustomLoader visible={isloder} />
          <View style={{alignItems: 'center', marginTop: HEIGHTGet * 0.18}}>
            <Image source={Images['loginlogo']} />
            <Text
              style={{
                color: Colors.gray,
                fontFamily: Fonts.bold,
                marginTop: 25,
                fontSize: FontSize.size._25px,
              }}>
              {getLanguage(SCREEN_Register)[0].LabelData.Page_Title}
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 33,
              width: '100%',
              marginTop: 38,
              // alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // width: '100%',
                // backgroundColor: 'red',
                // alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Cutominputreg
                value={fistname}
                onchagentext={text => setfistname(text)}
                leftIcon={Images['users']}
                placeHolder={
                  getLanguage(SCREEN_Register)[0].LabelData.First_Name
                }
              />
              <Cutominputreg
                value={lastname}
                onchagentext={text => setlastname(text)}
                leftIcon={Images['users']}
                placeHolder={
                  getLanguage(SCREEN_Register)[0].LabelData.Last_Name
                }
              />
            </View>
            <Custominput
              value={email}
              onchagentext={text => setemail(text)}
              leftIcon={Images['email']}
              placeHolder={getLanguage(SCREEN_Register)[0].LabelData.Email}
              keyboardType={'EMAIL-ADDRESS'}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-between',
              }}>
              <Pressable
                onPress={() => setisCountryCodePickar(true)}
                style={{
                  flexDirection: 'row',
                  width: 100,
                  paddingBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottomColor: '#E4E4E4',
                  borderBottomWidth: 1,
                }}>
                <Image
                  source={Images['phone']}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    color: Colors.gray,
                    // height: 24,
                    fontFamily: Fonts.bold,
                  }}>
                  {setno == '' ? '+91' : '+' + setno}
                </Text>
                <Image
                  source={Images['downdark']}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </Pressable>
              <TextInput
                value={phone}
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
            </View>

            <View
              style={{
                height: 55,
                // width: '100%',
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
              <Image
                source={Images['Lock']}
                style={{
                  width: 24,

                  height: 24,
                }}
              />

              <TextInput
                value={confirmpassword}
                onChangeText={text => setconfirmpassword(text)}
                placeholder={getLanguage(SCREEN_Register)[0].LabelData.Password}
                secureTextEntry={isvible}
                style={{
                  // marginLeft: needLeftImage ? 13 : 5,
                  color: 'black',
                  marginStart: 8,
                  fontFamily: Fonts.regular,
                  fontSize: FontSize.size._16px,

                  width: '86%',

                  fontSize: FontSize.size._16px,

                  // height: 44,
                }}
                placeholderTextColor={'#A9AEB5'}
              />

              <Pressable
                // style={{position: 'absolute', right: 0}}
                onPress={() => {
                  setisvible(!isvible);
                  setShow(!show);
                }}>
                <Image
                  source={
                    isvible == false ? Images['eye_open'] : Images['eye_close']
                  }
                  style={{width: 21, height: 17}}
                />
              </Pressable>
            </View>

            <CustomButtom
              onpress={() => {
                RegisterApi();
              }}
              text={getLanguage(SCREEN_Register)[0].LabelData.Register_Button}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginTop: moderateScale(90),
              width: '100%',
              // margintop: 40,
              marginTop: HEIGHTGet * 0.1,

              // backgroundColor: 'red',
              justifyContent: 'center',
              // marginTop: 130,

              justifyContent: 'center',
              // display: 'none',
            }}>
            <Text
              style={{
                color: '#202328',
                fontFamily: Fonts.regular,
                textAlign: 'center',
                fontSize: FontSize.size._15px,
              }}>
              {/* jdkd */}
              {getLanguage(SCREEN_Register)[0].LabelData.Account_Redirect}
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text
                style={{
                  color: Colors.skyBlue,
                  borderBottomColor: Colors.skyBlue,
                  borderBottomWidth: 1,
                  marginStart: 7,
                  textAlign: 'center',
                  fontSize: FontSize.size._15px,

                  fontFamily: Fonts.semibold,
                }}>
                {getLanguage(SCREEN_Register)[0].LabelData.Sign_In}
              </Text>
            </TouchableOpacity>
          </View>
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
