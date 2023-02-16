import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Images from '../CustomData/Images';
import Fonts from '../CustomData/Fonts';
import FontSize from '../CustomData/FontSize';
import HomeText from './HomeText';
import {
  ServiecsAllGetDataFeach,
  TraveldataList,
} from '../Flatlistdata/prodctScreenData/TravelData';
import {useNavigation} from '@react-navigation/native';
import {WIDTHGet} from '../CustomData/Colors';
import {useSelector} from 'react-redux';
import {LABEL_DATA, LOGIN, USERS_DATAS} from '../../Redux/ActionType';
import {getLanguage, SCREEN_Dashboard} from '../../LanguageTest';
import axios from 'axios';
import {
  BASE_URl,
  GET_SERVICES_CATEGORY,
  GET_SERVICES_SUBCATEGORY,
  GET_SERVIES_DASHBOARD,
} from '../BaseUrl/Baseurl';
import Toast from 'react-native-toast-message';
import {useState} from 'react';
import {useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';

import CustomLoader from '../ActivityIndicator/CustomLoader';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import {Store} from '../../Redux/MainStore';
import {setSessionFild} from '../../Redux/SessionAction';

export const ServidataGet = [
  {
    id: 1,
    image: Images['service'],
    title: 'Salon Services (Lorem Ipsum)',
    price: '$432',
    eye: Images['eye_open'],
    heart: Images['heart'],
    threeDot: Images['threedots'],
  },
  {
    id: 2,
    image: Images['serveic2'],
    title: 'Salon Services (Lorem Ipsum)',
    price: '$432',
    eye: Images['eye_open'],
    heart: Images['heart'],
    threeDot: Images['threedots'],
  },
];
export const ServicesGetDataAll = ({data}) => {
  console.log(data, 'imagesdataget');
  return (
    <View
      style={{
        width: 323,
        height: 215,
        marginHorizontal: 3,
        marginTop: 10,
        //   backgroundColor: 'red',
      }}>
      <Image
        source={{
          uri: data.Images,
        }}
        style={{width: 323, height: 161}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: '#202328',
            fontSize: FontSize.size._14px,
          }}>
          {data.Currency} {data.Price}
        </Text>
        <Image
          source={Images['eye_open']}
          style={{
            width: 24,

            marginStart: 60,
            height: 20,
          }}
        />
        <Pressable
          onPress={() => {
            // console.log(data.Id);
            // setislike(data.Id);
            // LIke_And_DisLike(data.Id, GET_PRODUCT_DASHBOARD_Get());
          }}>
          <Image
            source={
              data.IsFavourite === 'TRUE' ? Images['heart'] : Images['skyheart']
            }
            style={{
              width: 24,

              // backgroundColor: iscolor == false ? '#F5F5F5' : 'red',
              height: 20,
            }}
          />
        </Pressable>
      </View>
      <Text
        style={{
          fontFamily: Fonts.bold,
          color: '#202328',
          fontSize: FontSize.size._14px,
        }}>
        {data.price}
      </Text>
    </View>
  );
};
const ServicesScreen = ({}) => {
  const navigation = useNavigation();
  const [loder, setloder] = useState(false);
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  const [homeservices, sethomeservices] = useState('');
  const [getsevices, setgetservices] = useState();

  const [findby, setfindby] = useState('');
  console.log('findby', findby);
  const [propularservices, setpropularservices] = useState('');
  console.log(propularservices, 'propularservices');

  const [nearyou, setnearyou] = useState('');
  const [latitude, setlatitude] = useState('');
  const [logitude, setlogitude] = useState('');
  const [invalidtoken, setinvalidtoken] = useState('');
  console.log('invalidtoken', invalidtoken);
  useEffect(() => {
    if (invalidtoken) {
      Store.dispatch(setSessionFild(LOGIN, false));
    } else {
    }
  }, [invalidtoken]);
  // console.log('latitude-----', latitude);
  // console.log('logitude--', logitude);
  // console.log('Token', Token.Token);
  useEffect(() => {
    Get_Services_Categorys();
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
  }, []);
  async function Get_Services_Categorys() {
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
        url: BASE_URl + GET_SERVIES_DASHBOARD,
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
          console.log('res', res);
          setloder(false);
          {
            Toast.show({
              type: 'success',
              text1: 'Success',
              topOffset: 0,
              visibilityTime: 1200,
              text2: res.message,
            });
            setpropularservices(res.data.Popular_Product);
            setfindby(res.data.Service_Category);
            sethomeservices(res);
            setnearyou(res.data.NearYou_Product);
          }
        })
        .catch(err => {
          setloder(false);
          console.log('err', err);
          console.log('err', err.response.data.message);
          setinvalidtoken(err.response.data.message);
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
  const ServicesGetDataAll1 = ({data}) => {
    return (
      <View
        style={{
          width: WIDTHGet * 0.92,
          height: 215,
          // marginHorizontal: 3,
          // alignItems: 'center',
          alignSelf: 'center',

          marginTop: 10,
          //   backgroundColor: 'red',
        }}>
        <Image
          source={{
            uri: data.Images,
          }}
          style={{width: WIDTHGet * 0.92, height: 161, borderRadius: 4}}
        />
        <View
          style={{
            flexDirection: 'row',
            width: WIDTHGet * 0.92,
            alignItems: 'center',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              color: '#202328',
              fontSize: FontSize.size._14px,
            }}>
            {data.Currency} {data.Title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              // width: '100%',
            }}>
            <Image
              source={data.eye}
              style={{
                width: 24,

                marginHorizontal: 10,
                height: 20,
              }}
            />
            <Image
              source={data.heart}
              style={{
                width: 24,

                height: 20,
              }}
            />
          </View>
        </View>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: '#202328',
            fontSize: FontSize.size._14px,
          }}>
          {data.Price}
        </Text>
      </View>
    );
  };
  const Traveldata = ({data}) => {
    const navigation = useNavigation();
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
            navigation.navigate('ServicesCategoris');
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
  const Serveicedata = ({data}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          width: 100,
          // marginHorizontal: 10,
        }}>
        <Pressable
          style={{
            backgroundColor: '#F5FAFB',
            width: 85,
            height: 85,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}>
          <Image
            source={{uri: data.cat_image}}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </Pressable>
        <Text
          ellipsizeMode="tail"
          noOfLines={2}
          allowFontScaling={false}
          style={{
            color: '#202328',
            marginTop: 10,
            textAlign: 'center',
            fontFamily: Fonts.regular,
            fontSize: FontSize.size._13px,
          }}>
          {data.cat_title}
        </Text>
      </View>
    );
  };
  return (
    <View>
      <ScrollView>
        <HomeText
          heading={
            getLanguage(SCREEN_Dashboard)[0].LabelData.Popular_Service_Section
          }
          pressableText={
            getLanguage(SCREEN_Dashboard)[0].LabelData.Sell_All_Button
          }
        />
        <CustomLoader visible={loder} />
        {homeservices.length > 0 ? (
          <>
            <FlatList
              data={propularservices}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingHorizontal: 10}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => <ServicesGetDataAll data={item} />}
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
            getLanguage(SCREEN_Dashboard)[0].LabelData.Product_Category_Section
          }
          pressableText={
            getLanguage(SCREEN_Dashboard)[0].LabelData.Sell_All_Button
          }
          onpress={() => navigation.navigate('ServicesCategoris')}
        />

        <FlatList
          data={findby}
          contentContainerStyle={{paddingHorizontal: 10}}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Traveldata data={item} />}
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

        <HomeText
          heading={getLanguage(SCREEN_Dashboard)[0].LabelData.Service_Near_You}
          pressableText={
            getLanguage(SCREEN_Dashboard)[0].LabelData.Sell_All_Button
          }
        />

        <FlatList
          data={nearyou}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <ServicesGetDataAll1 data={item} />}
        />
      </ScrollView>
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({});
