import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CutomHeader from '../../../CustomComponet/CutomHeader';
import Images from '../../../CustomData/Images';
import {Produdata} from '../Home/ProductAndSevicesoverview/ProductOverview';
import {productHorzotaldtaGet} from '../../../CustomComponet/ProductScreen';
import Fonts from '../../../CustomData/Fonts';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

import FontSize from '../../../CustomData/FontSize';
import {useState} from 'react';
import Colors, {WIDTHGet} from '../../../CustomData/Colors';
import {
  BASE_URl,
  GET_PRODUCT_DASHBOARD,
  GET_SERVICES_LIST,
  PRODUCT_LIST,
} from '../../../BaseUrl/Baseurl';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {USERS_DATAS} from '../../../../Redux/ActionType';
import CustomLoader from '../../../ActivityIndicator/CustomLoader';

const Mywatchlist = () => {
  const [iscolor, setiscolor] = useState(false);
  const [nearyou, setnearyou] = useState('');
  const [latitude, setlatitude] = useState('');
  const [logitude, setlogitude] = useState('');
  const [loder, setloder] = useState(false);
  const [serviceslist, setserviceslist] = useState('');

  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        setlatitude(position.coords.latitude);
        setlogitude(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        // console.log(error.code, error.message);
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
  const Produdata = ({data}) => {
    console.log('producdtat', data);
    return (
      <View
        style={{
          width: WIDTHGet * 0.44,
          height: 195,
          // backgroundColor: 'red',
          // top: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          // borderWidth: 1,
        }}>
        <Pressable onPress={() => {}}>
          <Image
            source={{uri: data.Images}}
            style={{width: WIDTHGet * 0.44, height: 141, borderRadius: 3}}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: Fonts.regular,
            marginTop: 4,
            width: WIDTHGet * 0.44,
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
            width: WIDTHGet * 0.4,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              color: '#202328',
              fontSize: FontSize.size._15px,
            }}>
            {data.Price}
          </Text>

          <Pressable
            onPress={() => {
              // setiscolor(!iscolor);
              console.log(data.id);
            }}>
            <Image
              //   source={iscolor ? data.sky : dat}

              source={Images['deleted']}
              style={{
                width: 24,

                // backgroundColor: iscolor == false ? '#F5F5F5' : 'red',
                height: 20,
              }}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  async function GET_PRODUCT_DASHBOARD_Get() {
    setloder(true);
    // {
    //   islike ? setloder(false) : setloder(true);
    // }
    let isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      // setloder(true);
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
        url: BASE_URl + PRODUCT_LIST,
        data: {
          ListFor: '4',
          PageId: '1',
          PerPage: '2',
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + Token.Token,
        },
      })
        .then(res => res.data)
        .then(res => {
          setloder(false);
          setnearyou(res.data.product_data);
          console.log('res', res.data.product_data);
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

  async function GET_SERVICES_LISTDATA() {
    setloder(true);
    // {
    //   islike ? setloder(false) : setloder(true);
    // }
    let isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      // setloder(true);
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
        url: BASE_URl + GET_SERVICES_LIST,
        data: {
          ListFor: '4',
          PageId: '1',
          PerPage: '2',
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + Token.Token,
        },
      })
        .then(res => res.data)
        .then(res => {
          setloder(false);
          setserviceslist(res.data.service_data);
          console.log('res', res.data.service_data);
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
  useEffect(() => {
    GET_PRODUCT_DASHBOARD_Get();
    GET_SERVICES_LISTDATA();
  }, []);

  const Servicedata = ({data}) => {
    console.log('producdtat', data);
    return (
      <View
        style={{
          width: WIDTHGet * 0.44,
          height: 195,
          // backgroundColor: 'red',
          // top: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          // borderWidth: 1,
        }}>
        <Pressable onPress={() => {}}>
          <Image
            source={{uri: data.Images}}
            style={{width: WIDTHGet * 0.44, height: 141, borderRadius: 3}}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: Fonts.regular,
            marginTop: 4,
            width: WIDTHGet * 0.44,
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
            width: WIDTHGet * 0.4,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              color: '#202328',
              fontSize: FontSize.size._15px,
            }}>
            {data.Price}
          </Text>

          <Pressable
            onPress={() => {
              // setiscolor(!iscolor);
              console.log(data.id);
            }}>
            <Image
              //   source={iscolor ? data.sky : dat}

              source={Images['deleted']}
              style={{
                width: 24,

                // backgroundColor: iscolor == false ? '#F5F5F5' : 'red',
                height: 20,
              }}
            />
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 100}}>
      <CutomHeader headrtitle="My Watchlist" leftIcon={Images['whiteremove']} />
      <CustomLoader visible={loder} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
          justifyContent: 'space-around',
        }}>
        <Pressable
          onPress={() => {
            setiscolor(false);
          }}
          style={{
            width: WIDTHGet * 0.4,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',

            height: 40,
            backgroundColor: iscolor ? '#E9EDF6' : '#0048F7',
          }}>
          <Text
            style={{
              color: iscolor ? 'black' : 'white',
              fontFamily: Fonts.semibold,
            }}>
            Products
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setiscolor(true);
          }}
          style={{
            width: WIDTHGet * 0.4,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',

            height: 40,
            backgroundColor: iscolor ? '#0048F7' : '#E9EDF6',
          }}>
          <Text
            style={{
              color: iscolor ? Colors.white : Colors.black,
              fontFamily: Fonts.semibold,
            }}>
            Services
          </Text>
        </Pressable>
      </View>
      <View style={{marginVertical: 10, paddingHorizontal: 10}}>
        {iscolor == false ? (
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={nearyou}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item}) => <Produdata data={item} />}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={serviceslist}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item}) => <Servicedata data={item} />}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Mywatchlist;

const styles = StyleSheet.create({});
