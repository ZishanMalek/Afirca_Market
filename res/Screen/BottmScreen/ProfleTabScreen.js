import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Fonts from '../../CustomData/Fonts';
import FontSize from '../../CustomData/FontSize';
import Images from '../../CustomData/Images';
import {Custominput} from '../../CustomComponet/Custominput';
import CutomEditProfileInput from '../../CustomComponet/CutomEditProfileInput';
import {useNavigation} from '@react-navigation/native';
import {HEIGHTGet} from '../../CustomData/Colors';
import {Store} from '../../../Redux/MainStore';
import {setSessionFild} from '../../../Redux/SessionAction';
import {
  ENGLISH_LABEL_DATA,
  FBTYPE,
  FB_LOGIN,
  GOOGLETYPE,
  GOOGLE_LOGIN,
  GUST_ACCOUNT,
  LABEL_DATA,
  LOGIN,
  USERS_DATAS,
} from '../../../Redux/ActionType';
import {useSelector} from 'react-redux';
import {getLanguage, SCREEN_Profile} from '../../../LanguageTest';
import {useEffect} from 'react';
import {BASE_URl, GET_PRODUCT_DASHBOARD} from '../../BaseUrl/Baseurl';
import axios from 'axios';
const HEIGHT = Dimensions.get('window').height;
import {useIsFocused} from '@react-navigation/native';

const ProfleTabScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  console.log('isFocused', isFocused);

  const [isdone, setisdone] = useState(false);
  const session = useSelector(state => state.session);

  const GoogleData = session[GOOGLE_LOGIN];
  // console.log('GoogleData', GoogleData.user.givenName);
  const USERS_Data = session[USERS_DATAS];
  // console.log('USERS_Data', USERS_Data.FirstName);
  const Token = session[USERS_DATAS];
  // console.log(USERS_Data, 'TokenGet');

  const FbData = session[FB_LOGIN];
  const FBTYPEData = session[FBTYPE];

  const GoogleTYPEData = session[GOOGLETYPE];
  console.log('FBTYPEData', FbData.name);
  console.log('GoogleTYPEData', GoogleTYPEData);
  const [invalidtoken, setinvalidtoken] = useState('');
  console.log('invalidtoken', invalidtoken);
  useEffect(() => {
    if (invalidtoken) {
      Store.dispatch(setSessionFild(LOGIN, false));
    } else {
    }
  }, [invalidtoken]);
  useEffect(() => {
    GET_PRODUCT_DASHBOARD_Get();
  }, [isFocused]);

  async function GET_PRODUCT_DASHBOARD_Get() {
    let isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      alert('No Internet');
    } else {
      // await axios(config)
      axios({
        method: 'POST',
        url: BASE_URl + GET_PRODUCT_DASHBOARD,
        data: {
          Latitude: '28.626137',
          Longitude: '79.821602',
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + Token.Token,
        },
      })
        .then(res => res.data)
        .then(res => {
          // console.log('res', res);
        })
        .catch(err => {
          console.log('err', err);

          console.log('err', err.response.data.status);
          setinvalidtoken(err.response.data.status);
        });
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              height: HEIGHT * 0.33,
              backgroundColor: '#0048F7',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.semibold,
                color: 'white',
                marginTop: 20,
                fontSize: FontSize.size._16px,
              }}>
              {getLanguage(SCREEN_Profile)[0].LabelData.Page_Title}
            </Text>
            <Pressable onPress={() => navigation.navigate('SellerProfile')}>
              <View>
                <Image
                  source={Images['camara']}
                  style={{
                    width: 38,
                    height: 38,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    zIndex: 1,
                  }}
                />
                <Image
                  source={Images['pc']}
                  resizeMode="cover"
                  style={{
                    zIndex: -1,
                    width: 126,
                    height: 126,
                    marginTop: HEIGHTGet * 0.01,
                    borderRadius: 126 / 2,
                  }}
                />
              </View>
            </Pressable>
            <Text
              style={{
                fontFamily: Fonts.semibold,
                marginTop: HEIGHTGet * 0.01,
                color: 'white',
                fontSize: FontSize.size._22px,
              }}>
              {USERS_Data.FirstName} {USERS_Data.LastName}
            </Text>
          </View>

          <View>
            <CutomEditProfileInput
              leftimage={Images['editprofile']}
              onPress={() => {
                navigation.navigate('EditProfileScreen');
              }}
              text={getLanguage(SCREEN_Profile)[0].LabelData.Edit_Profile}
            />

            <CutomEditProfileInput
              onPress={() => {
                navigation.navigate('MywalletScreen');
              }}
              leftimage={Images['mywallted']}
              text={getLanguage(SCREEN_Profile)[0].LabelData.My_Wallet}
            />

            <View
              style={{
                marginTop: 21,
                alignItems: 'center',
                marginVertical: 10,
                marginStart: 50,

                flexDirection: 'row',
              }}>
              <Image
                source={Images['selling']}
                style={{
                  width: 24,
                  height: 24,
                }}
              />

              <Pressable
                onPress={() => {
                  // navigation.navigate('MainOver');
                }}
                style={{
                  color: 'black',

                  marginStart: 27,
                  paddingBottom: 10,
                  flex: 1,

                  fontFamily: Fonts.regular,
                  fontSize: FontSize.size._16px,
                }}>
                <Text
                  style={{
                    color: '#202328',
                    fontFamily: Fonts.semibold,
                    fontSize: FontSize.size._16px,
                  }}>
                  {getLanguage(SCREEN_Profile)[0].LabelData.Selling_Overview}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setisdone(!isdone);
                }}>
                <Image
                  source={Images['downdark']}
                  style={{
                    width: 24,
                    marginEnd: 10,
                    height: 24,
                  }}
                />
              </Pressable>
            </View>
            <View style={{display: isdone ? 'flex' : 'none'}}>
              <View
                style={{
                  marginStart: 106,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'space-evenly',
                }}>
                <Image
                  source={Images['blueforward']}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Pressable
                  onPress={() => {
                    navigation.navigate('MainOver');
                  }}>
                  <Text
                    style={{
                      color: '#202328',
                      textAlign: 'center',
                      fontFamily: Fonts.regular,
                      fontSize: FontSize.size._14px,
                    }}>
                    {getLanguage(SCREEN_Profile)[0].LabelData.Inventory}
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  marginStart: 106,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'space-evenly',
                }}>
                <Image
                  source={Images['blueforward']}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
                <Text
                  style={{
                    color: '#202328',
                    textAlign: 'center',
                    fontFamily: Fonts.regular,
                    fontSize: FontSize.size._14px,
                  }}>
                  {getLanguage(SCREEN_Profile)[0].LabelData.Sold}
                </Text>
              </View>
            </View>
            <Text
              style={{
                borderBottomColor: '#E4E4E4',
                borderBottomWidth: 1,
                marginTop: isdone ? -10 : -20,
                marginStart: 100,
              }}></Text>

            <CutomEditProfileInput
              onPress={() => {
                navigation.navigate('Mywatchlist');
              }}
              leftimage={Images['balckheart']}
              text={getLanguage(SCREEN_Profile)[0].LabelData.Watch_List}
            />

            <CutomEditProfileInput
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
              leftimage={Images['Lock']}
              text={getLanguage(SCREEN_Profile)[0].LabelData.Change_Password}
            />
            <CutomEditProfileInput
              onPress={() => {
                navigation.navigate('Support');
              }}
              leftimage={Images['supprot']}
              text={getLanguage(SCREEN_Profile)[0].LabelData.Support}
            />
            <CutomEditProfileInput
              onPress={() => {
                navigation.navigate('Setting');
              }}
              leftimage={Images['setting']}
              text={getLanguage(SCREEN_Profile)[0].LabelData.Settings}
            />
            <CutomEditProfileInput
              leftimage={Images['privacy']}
              text={getLanguage(SCREEN_Profile)[0].LabelData.Privacy_Policy}
            />
            <CutomEditProfileInput
              leftimage={Images['logout']}
              text={getLanguage(SCREEN_Profile)[0].LabelData.Logout}
              onPress={() => {
                Store.dispatch(setSessionFild(LOGIN, false));
                Store.dispatch(setSessionFild(GoogleTYPEData, {}));
                Store.dispatch(setSessionFild(GUST_ACCOUNT, 'FALSE'));

                // navigation.navigate('LoginScren');
                // Store.dispatch(setSessionFild(ENGLISH_LABEL_DATA, ));
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfleTabScreen;

const styles = StyleSheet.create({});
