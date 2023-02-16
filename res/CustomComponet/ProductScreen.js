import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

import FontSize from '../CustomData/FontSize';
import Fonts from '../CustomData/Fonts';
import {TraveldataList} from '../Flatlistdata/prodctScreenData/TravelData';
import Images from '../CustomData/Images';
import HomeText from './HomeText';
import {ProductNerarYourdata} from '../Flatlistdata/prodctScreenData/ProductNerarYourdata';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import Colors, {HEIGHTGet, WIDTHGet} from '../CustomData/Colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {
  GUST_ACCOUNT,
  LABEL_DATA,
  LOGIN,
  USERS_DATAS,
} from '../../Redux/ActionType';
import {getLanguage, SCREEN_Dashboard} from '../../LanguageTest';
import {getcolors} from '../Screen/BottmScreen/EditprofileScreen/Themeing';
import {
  BASE_URl,
  FAVOURITE_UNFAVOURITE,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_DASHBOARD,
  GET_SERVICES_CATEGORY,
  MY_PRODUCT,
} from '../BaseUrl/Baseurl';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import CustomLoader from '../ActivityIndicator/CustomLoader';
import Geolocation from 'react-native-geolocation-service';
import {Store} from '../../Redux/MainStore';
import LottieView from 'lottie-react-native';

import {setSessionFild} from '../../Redux/SessionAction';

export const ProdudataNearYor = ({data}) => {
  // console.log('ProdudataNearYor', data);
  return (
    <View style={{alignSelf: 'center'}}>
      <View
        style={{
          width: WIDTHGet * 0.44,
          // height: HEIGHTGet * 0.8,
          // backgroundColor: 'red',
          // top: 10,
          // alignItems: 'center',
          alignSelf: 'center',
          // borderWidth: 1,
          marginTop: 10,
          // borderWidth: 1,
          // marginHorizontal: WIDTHGet / 100,
          marginVertical: 10,
          // paddingHorizontal: 10,

          // flex: WIDTHGet * 0.7,

          //   marginStart: 10,
        }}>
        <Image
          source={{uri: data.Images}}
          style={{width: WIDTHGet * 0.44, height: 141, borderRadius: 3}}
        />
        <Text
          style={{
            marginTop: 4,
            fontFamily: Fonts.bold,
            color: '#202328',
            fontSize: FontSize.size._15px,
          }}>
          {data.Title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              color: '#202328',
              fontSize: FontSize.size._15px,
            }}>
            {data.Currency} {data.Price}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Pressable onPress={() => {}}>
              <Image
                source={Images['eye_open']}
                style={{
                  width: 24,
                  marginEnd: 10,
                  height: 20,
                }}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                // setislike(data.Id, LIke_And_DisLike(GET_PRODUCT_CATEGORY()));
              }}>
              <Image
                source={
                  data.IsFavourite === 'TRUE'
                    ? Images['fillheart']
                    : Images['balckheart']
                }
                style={{
                  width: 24,

                  // backgroundColor: iscolor == false ? '#F5F5F5' : 'red',
                  height: 20,
                }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const Traveldata = ({data}) => {
  const navigation = useNavigation();
  const session = useSelector(state => state.session);
  const GUST_Account = session[GUST_ACCOUNT];

  // console.log('GUST_Account', GUST_Account);
  return (
    <View
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        // marginHorizontal: 10,'
      }}>
      <Pressable
        onPress={() => {
          if (GUST_Account.UserType == 'GUEST') {
            Alert.alert(
              'Your Login As Guest Account',
              'Please Go  Login to use All functionality  ',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
            );
          } else {
            navigation.navigate('ProductCategrois');
          }
        }}
        style={{
          backgroundColor: '#F5FAFB',
          width: 85,
          height: 85,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
        }}>
        <Image
          resizeMode="contain"
          source={{uri: data.cat_image}}
          style={{
            width: 30,
            height: 30,
            tintColor:
              getcolors() == 'orange'
                ? 'orange'
                : getcolors() == '#998DA0'
                ? '#998DA0'
                : getcolors() == '#0048F7'
                ? '#0048F7'
                : Colors.skyBlue,
          }}
        />
      </Pressable>
      <Text
        style={{
          // borderWidth: 1,
          flexGrow: 1,
          width: WIDTHGet * 0.22,
          color: '#202328',
          marginTop: 10,
          textAlign: 'center',
          fontFamily: Fonts.regular,
          fontSize: FontSize.size._13px,
        }}>
        {' '}
        {data.cat_title}
      </Text>
    </View>
  );
};
const ProductScreen = ({}) => {
  const navigation = useNavigation();
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  const GUST_Account = session[GUST_ACCOUNT];

  const [islike, setislike] = useState('');

  const Produdata = ({data}) => {
    const GUST_Account = session[GUST_ACCOUNT];
    console.log('GUST_Account', GUST_Account);
    const navigation = useNavigation();

    return (
      <View
        style={{
          width: WIDTHGet * 0.44,
          // height: heightPercentageToDP('30%'),
          height: 195,
          // backgroundColor: 'red',
          // top: 10,
          // borderWidth: 1,
          marginTop: 10,
          // marginHorizontal: 4,
        }}>
        <Pressable
          onPress={() => {
            if (GUST_Account.UserType == 'GUEST') {
              Alert.alert(
                'Your Login As Guest Account',
                'Please Go  Login to use All functionality  ',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
              );
            } else {
              navigation.navigate('UserProductDetails', data.Id);
            }
          }}>
          <Image
            source={data.Images == '' ? Images['laptop'] : {uri: data.Images}}
            style={{width: WIDTHGet * 0.44, height: 141, borderRadius: 3}}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: Fonts.regular,
            marginTop: 4,
            color: '#202328',
            fontSize: FontSize.size._15px,
          }}>
          {data.Title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              color: '#202328',
              fontSize: FontSize.size._15px,
            }}>
            {data.Currency} {data.Price}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Pressable
              onPress={() => {
                navigation.navigate('UserProductDetails', data.Id);
              }}>
              <Image
                source={Images['eye_open']}
                style={{
                  width: 24,
                  marginEnd: 10,
                  height: 20,
                }}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                LIke_And_DisLike(data.Id);
              }}>
              <Image
                source={
                  data.IsFavourite === 'TRUE'
                    ? Images['fillheart']
                    : Images['balckheart']
                }
                style={{
                  width: 24,

                  // backgroundColor: iscolor == false ? '#F5F5F5' : 'red',
                  height: 20,
                }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  const [loder, setloder] = useState(false);
  // console.log('Token', Token.Token);

  const [propular, setpropular] = useState('');
  // let istrue = propular.map(item => item.IsFavourite);

  const [findby, setfindby] = useState('');
  const [nearyou, setnearyou] = useState('');
  const [latitude, setlatitude] = useState('');
  const [logitude, setlogitude] = useState('');
  const [homedata, sethomedata] = useState('');
  const [invalidtoken, setinvalidtoken] = useState('');
  console.log('invalidtoken', invalidtoken);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setlatitude(position.coords.latitude);
        setlogitude(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    GET_PRODUCT_DASHBOARD_Get();
  }, []);
  useEffect(() => {
    if (islike) {
      Get_like_data();
    }
  }, [islike]);

  useEffect(() => {
    setTimeout(() => {
      if (invalidtoken) {
        Store.dispatch(setSessionFild(LOGIN, false));
      }
    }, 3000);
  }, [invalidtoken]);

  async function GET_PRODUCT_DASHBOARD_Get() {
    setloder(true);
    let isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      setloder(true);
      Toast.show({
        type: 'error',
        text1: 'No Internet Connection',
        topOffset: 0,
        visibilityTime: 1200,
        text2: 'Please Check Your Internet Connection',
      });
    } else {
      // await axios(config)
      axios({
        method: 'POST',
        url: BASE_URl + GET_PRODUCT_DASHBOARD,
        data: {
          Latitude: latitude.toString(),
          Longitude: logitude.toString(),
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + Token.Token,
        },
      })
        .then(res => res.data)
        .then(res => {
          // console.log('res', res);
          setloder(false);
          {
            Toast.show({
              type: 'success',
              text1: 'Success',
              topOffset: 0,
              visibilityTime: 1200,
              text2: res.message,
            });
            setpropular(res.data.Popular_Product);

            console.log(res, 'res');
            sethomedata(res.data.Popular_Product);
            setfindby(res.data.Product_Category);
            setnearyou(res.data.NearYou_Product);
          }
        })
        .catch(err => {
          setloder(false);
          console.log('err', err);

          console.log('errget', err.response.data.status);
          setinvalidtoken(err.response.data.status);
          Toast.show({
            type: 'error',
            text1: 'error',
            topOffset: 0,
            visibilityTime: 1200,
            // text2: err.response.data.message,
          });
        });
    }
  }

  async function Get_like_data() {
    let isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      setloder(true);
      Toast.show({
        type: 'error',
        text1: 'No Internet Connection',
        topOffset: 0,
        visibilityTime: 1200,
        text2: 'Please Check Your Internet Connection',
      });
    } else {
      // await axios(config)
      axios({
        method: 'POST',
        url: BASE_URl + GET_PRODUCT_DASHBOARD,
        data: {
          Latitude: latitude.toString(),
          Longitude: logitude.toString(),
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + Token.Token,
        },
      })
        .then(res => res.data)
        .then(res => {
          // console.log('res', res);
          setloder(false);
          {
            Toast.show({
              type: 'success',
              text1: 'Success',
              topOffset: 0,
              visibilityTime: 1200,
              text2: res.message,
            });
            setpropular(res.data.Popular_Product);
            setfindby(res.data.Product_Category);
            setnearyou(res.data.NearYou_Product);
          }
        })
        .catch(err => {
          setloder(false);
          console.log('err', err);
          // console.log('err', err.response.data.message);
          Toast.show({
            type: 'error',
            text1: 'error',
            topOffset: 0,
            visibilityTime: 1200,
            // text2: err.response.data.message,
          });
        });
    }
  }
  async function LIke_And_DisLike(id) {
    console.log('id-------------------', id);
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
      // await axios(config)
      axios({
        method: 'POST',
        url: BASE_URl + FAVOURITE_UNFAVOURITE,
        data: {
          ProdId: id,
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + Token.Token,
        },
      })
        .then(res => res.data)
        .then(res => {
          console.log('res', res);

          setislike(res);
          {
            Toast.show({
              type: 'success',
              text1: 'Success',
              topOffset: 0,
              visibilityTime: 1200,
              text2: res.message,
            });
          }
        })
        .catch(err => {
          console.log('err', err);
          // console.log('err', err.response.data.message);
          Toast.show({
            type: 'error',
            text1: 'error',
            topOffset: 0,
            visibilityTime: 1200,
            // text2: err.response.data.message,
          });
        });
    }
  }
  return (
    <>
      <View>
        <CustomLoader visible={loder} />
        <>
          <View>
            <HomeText
              heading={
                getLanguage(SCREEN_Dashboard)[0].LabelData
                  .Popular_Product_Section
              }
              pressableText={
                getLanguage(SCREEN_Dashboard)[0].LabelData.Sell_All_Button
              }
              onpress={() => {
                console.log('Sell all');
              }}
            />

            {propular?.length > 0 ? (
              <>
                <FlatList
                  data={propular}
                  contentContainerStyle={{paddingHorizontal: 10}}
                  ItemSeparatorComponent={() => {
                    return (
                      <View
                        style={{
                          height: '100%',
                          // width: ,
                          marginHorizontal: 4,
                          // backgroundColor: '#CED0CE',
                        }}
                      />
                    );
                  }}
                  renderItem={({item}) => <Produdata data={item} />}
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            ) : (
              <>
                <View
                  style={{
                    height: 200,
                    width: '100%',
                  }}>
                  <LottieView
                    source={{
                      uri: 'https://assets1.lottiefiles.com/packages/lf20_scgyykem.json',
                    }}
                    autoPlay
                    loop={true}></LottieView>
                </View>
              </>
            )}

            <HomeText
              heading={
                getLanguage(SCREEN_Dashboard)[0].LabelData
                  .Product_Category_Section
              }
              pressableText={
                getLanguage(SCREEN_Dashboard)[0].LabelData.Sell_All_Button
              }
              onpress={() => {
                if (GUST_Account.UserType == 'GUEST') {
                  Alert.alert(
                    'Your Login As Guest Account',
                    'Please Go  Login to use All functionality  ',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                  );
                } else {
                  navigation.navigate('ProductCategrois');
                }
              }}
            />

            {findby?.length > 0 ? (
              <>
                <FlatList
                  data={findby}
                  contentContainerStyle={{paddingHorizontal: 10}}
                  renderItem={({item}) => <Traveldata data={item} />}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  ItemSeparatorComponent={() => {
                    return (
                      <View
                        style={{
                          // height: '100%',
                          alignItems: 'center',

                          marginHorizontal: 8,
                          justifyContent: 'center',
                          // backgroundColor: '#CED0CE',
                        }}
                      />
                    );
                  }}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            ) : (
              <>
                <View
                  style={{
                    width: '100%',
                    // height: heightPercentageToDP('30%'),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 195,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      marginTop: 30,

                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    Date is Fetching From Server
                  </Text>
                </View>
              </>
            )}
            <HomeText
              heading={
                getLanguage(SCREEN_Dashboard)[0].LabelData.Product_Near_You
              }
              pressableText={
                getLanguage(SCREEN_Dashboard)[0].LabelData.Sell_All_Button
              }
            />
            <FlatList
              data={nearyou}
              contentContainerStyle={{paddingHorizontal: 12, paddingTop: 8}}
              numColumns={2}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              renderItem={({item}) => <ProdudataNearYor data={item} />}
              removeClippedSubviews={false}
              vertical={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </>
      </View>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
