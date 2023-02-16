import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {Pstore, Store} from '../../../../Redux/MainStore';

import React, {useState} from 'react';
import Images from '../../../CustomData/Images';
import Colors, {HEIGHTGet} from '../../../CustomData/Colors';
import Fonts from '../../../CustomData/Fonts';
import FontSize from '../../../CustomData/FontSize';
import {Custominput} from '../../../CustomComponet/Custominput';
import CustomButtom from '../../../CustomComponet/CustomButtom';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequestManager,
  GraphRequest,
} from 'react-native-fbsdk-next';

import {
  ENGLISH_LABEL_DATA,
  FBTYPE,
  FB_LOGIN,
  GOOGLETYPE,
  GOOGLE_LOGIN,
  GUST_ACCOUNT,
  LOGIN,
  TOKEN,
  USERS_Data,
  USERS_DATAS,
} from '../../../../Redux/ActionType';
import {setSessionFild} from '../../../../Redux/SessionAction';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

import _, {result} from 'lodash';
import {useEffect} from 'react';
import axios, {Axios} from 'axios';
import {
  BASE_URl,
  LABEL_DATA,
  LOGIN_API,
  MASTER_DATA,
  REGISTER_Api,
  SOCIAL_LOGIn,
} from '../../../BaseUrl/Baseurl';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getLanguage,
  SCREEN_Dashboard,
  SCREEN_Login,
} from '../../../../LanguageTest';
import Indicater from '../../../ActivityIndicator/ActivityIndicator';
import CustomLoader from '../../../ActivityIndicator/CustomLoader';

const Login = ({}) => {
  const navigation = useNavigation();
  // const [email, setEmail] = useState('');

  const [isactive, setisactive] = useState(true);
  const [isvible, setisvible] = useState(false);
  const [show, setShow] = useState(false);
  const [getNoti, setgetNoti] = useState('');
  const [fbdata, setfbdata] = useState('');
  const [googledata, setgoogledata] = useState('');
  const [fbtype, setfbtype] = useState('');
  const [googletype, setgoogletype] = useState('');
  const [isloder, setisloder] = useState(false);
  // const GUST_Account = session[GUST_ACCOUNT];
  // console.log('GUST_Account', GUST_Account);

  const Device = Platform.OS;

  useEffect(() => {
    requestUserPermission();
    notifacitonListner();
    GoogleSignin.configure({
      webClientId:
        '742527363660-adchv1s017h1jqmpkno7r9vvcprn300d.apps.googleusercontent.com',
    });
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
  const session = useSelector(state => state.session);
  const FBDATA = session[FB_LOGIN];
  const GOOGLEDATA = session[GOOGLE_LOGIN];

  const Deviceget = JSON.stringify(Platform.OS);
  const Notification = JSON.stringify(getNoti);

  const gettokenNoti = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log('old', fcmToken);
    setgetNoti(fcmToken);

    if (!fcmToken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          // console.log(' new Genrate  Token', fcmToken);
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const Fblogin = async rescallBack => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        console.log('result', result);
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          const infoRequest = new GraphRequest(
            '/me?fields=name,email,picture.type(large)',
            null,
            rescallBack,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },

      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const onFblogin = async () => {
    try {
      await Fblogin(_responseInfoCallback);
    } catch (error) {
      console.log(error);
    }
  };

  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error);
    } else {
      const userInfo = result;
      // console.log('Success fetching data: ', userInfo);
      Store.dispatch(setSessionFild(FB_LOGIN, userInfo));
      Store.dispatch(setSessionFild(FBTYPE, 'Facebook'));

      setfbdata(userInfo.id);
      setfbtype('Facebook');
      SocialLogin();
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
      // console.log('recived in forground', remoteMessage);
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

  const Singin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Store.dispatch(setSessionFild(GOOGLE_LOGIN, userInfo));
      GoogleSignin.signOut();
      setgoogledata(userInfo.user.id);
      setgoogletype('Google');
      Store.dispatch(setSessionFild(GOOGLETYPE, 'Google'));

      SocialLogin();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };
  // --------------api take usestate-----------------------

  // ------------------post LangId api-----------------------

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  async function LoginApi() {
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
        .post(BASE_URl + LOGIN_API, {
          LangId: '1',
          Email: email.trim(),
          Password: password.trim(),
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
              console.log('here', res.data);
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
  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  async function SocialLogin() {
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
        .post(BASE_URl + SOCIAL_LOGIn, {
          LangId: '1',
          socialId:
            fbtype == 'Facebook'
              ? fbdata
              : googletype == 'Google'
              ? googledata
              : '1',
          socialType:
            fbtype == 'Facebook'
              ? 'Facebook'
              : googletype == 'Google'
              ? 'Google'
              : '1',

          DeviceTocken: Notification,
          DeviceType: Deviceget,
        })
        .then(res => res.data)
        .then(res => {
          setisloder(false);
          // {
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
            console.log('here', res.data);
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
  const OnGustRegsiter = async () => {
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
        .post(BASE_URl + LOGIN_API, {
          LangId: '1',
          Email: 'GuestAfricaMarket@gmail.com',
          Password: '123456',
          DeviceTocken: 'as34k',
          DeviceType: 'A',
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
              Store.dispatch(setSessionFild(GUST_ACCOUNT, res.data));
              Store.dispatch(setSessionFild(LOGIN, true));
              console.log('here', res.data);
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
  };

  // };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Toast />
      <SafeAreaView>
        <CustomLoader visible={isloder} />
        <StatusBar backgroundColor={'white'} />
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View
            style={{
              alignItems: 'center',
              marginTop: HEIGHTGet * 0.18,
            }}>
            <Image source={Images['loginlogo']} />

            <Text
              style={{
                color: Colors.gray,
                fontFamily: Fonts.bold,
                marginTop: 25,
                fontSize: FontSize.size._25px,
              }}>
              {getLanguage(SCREEN_Login)[0].LabelData.Page_Title}
            </Text>
          </View>

          <View
            style={{
              paddingHorizontal: 33,

              width: '100%',
              marginTop: HEIGHTGet * 0.01,
              // alignItems: 'center',
            }}>
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
                source={Images['email']}
                style={{
                  // marginStart: 15,

                  width: 24,

                  height: 24,
                }}
              />

              <TextInput
                value={email}
                onChangeText={setemail}
                placeholder={
                  getLanguage(SCREEN_Login)[0].LabelData.Email_Address
                }
                keyboardType="email-address"
                style={{
                  color: 'black',
                  // borderWidth: 1,
                  marginStart: 10,

                  fontFamily: Fonts.regular,
                  fontSize: FontSize.size._16px,

                  width: '90%',
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
                  // marginStart: 15,

                  width: 24,

                  height: 24,
                }}
              />

              <TextInput
                value={password}
                onChangeText={setpassword}
                placeholder={getLanguage(SCREEN_Login)[0].LabelData.Password}
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
                // style={{}}
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
            <Text
              style={{
                color: Colors.skyBlue,
                fontFamily: Fonts.regular,
                marginTop: 23,
                textAlign: 'center',
                fontSize: FontSize.size._16px,
              }}>
              {getLanguage(SCREEN_Login)[0].LabelData.Forgot_Password}
            </Text>
            <CustomButtom
              text={getLanguage(SCREEN_Login)[0].LabelData.Login_Button}
              onpress={() => {
                LoginApi();
              }}
            />

            <Text
              style={{
                color: '#202328',
                marginTop: HEIGHTGet * 0.02,

                fontFamily: Fonts.regular,
                textAlign: 'center',
                fontSize: FontSize.size._15px,
              }}>
              {getLanguage(SCREEN_Login)[0].LabelData.Or_Condition}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                // borderWidth: 1,
                marginTop: 20,
                width: '68%',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity onPress={onFblogin}>
                <Image
                  source={Images['facebook']}
                  style={{width: 60, height: 60}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Singin();
                }}>
                <Image
                  source={Images['google']}
                  style={{width: 60, height: 60}}
                />
              </TouchableOpacity>
              <Image
                source={Images['applelogin']}
                style={{width: 60, height: 60}}
              />
            </View>
            <Pressable
              onPress={() => {
                OnGustRegsiter();
              }}
              style={{
                height: 45,
                borderWidth: 1,
                borderColor: '#47CDFE',
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  color: Colors.sky,
                  fontSize: FontSize.size._15px,
                }}>
                {getLanguage(SCREEN_Login)[0].LabelData.Login_Guest}
              </Text>
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop: moderateScale(90),
                // margintop: 40,
                // backgroundColor: 'red',
                marginTop: HEIGHTGet * 0.023,
                // marginBottom: HEIGHTGet * 0.03,
                // marginTop: 16,

                justifyContent: 'center',
                // display: 'none',
              }}>
              <Text
                style={{
                  color: '#202328',
                  fontFamily: Fonts.regular,
                  fontSize: FontSize.size._15px,
                }}>
                {getLanguage(SCREEN_Login)[0].LabelData.Account_Redirect}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text
                  style={{
                    color: Colors.skyBlue,
                    borderBottomColor: Colors.skyBlue,
                    borderBottomWidth: 1,
                    marginStart: 7,
                    fontSize: FontSize.size._15px,

                    fontFamily: Fonts.semibold,
                  }}>
                  {getLanguage(SCREEN_Login)[0].LabelData.Sign_Up}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
