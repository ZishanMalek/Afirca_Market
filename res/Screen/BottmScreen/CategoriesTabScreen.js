import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  LogBox,
} from 'react-native';
import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import Images from '../../CustomData/Images';
import Fonts from '../../CustomData/Fonts';
import FontSize from '../../CustomData/FontSize';
import Colors from '../../CustomData/Colors';
import CustomLocation from '../../CustomComponet/CustomLocation';
import NetInfo from '@react-native-community/netinfo';

import ProductCategrois from './Home/AllCategorysub/ProductCategrois';
import ServicesCategoris from './Home/AllCategorysub/ServicesCategoris';
import CategorisScreenProduct from './Home/AllCategorysub/CategorisScreenProduct';
import CategorisScreenServies from './Home/AllCategorysub/CategorisScreenServies';

const HAIEDTH = Dimensions.get('window').height;
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {GETLOCATION, LOGIN, USERS_DATAS} from '../../../Redux/ActionType';
import {useIsFocused} from '@react-navigation/native';

import {BASE_URl, GET_PRODUCT_DASHBOARD} from '../../BaseUrl/Baseurl';
import axios from 'axios';
import {Store} from '../../../Redux/MainStore';
import {setSessionFild} from '../../../Redux/SessionAction';

const CategoriesTabScreen = ({props}) => {
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const [latitude, setlatitude] = useState('');
  const [logitude, setlogitude] = useState('');

  const session = useSelector(state => state.session);
  const locationdata = session[GETLOCATION];
  const [location, setlocation] = useState('');
  const Token = session[USERS_DATAS];
  console.log(Token.Token, 'TokenGet');
  const [iscolor, setiscolor] = useState(true);
  React.useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const getgeolocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('cuurent position -->', position);
        setlatitude(position.coords.latitude);
        setlogitude(position.coords.longitude);
        console.log(
          '---------------------------success getgeoocation---------------------------',
        );
        // getlocation();
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getgeolocation();
    // getlocation();
  }, []);

  useEffect(() => {
    getlocation();
  }, [latitude, logitude]);
  const getlocation = async () => {
    Geocoder.init('AIzaSyDJn3lkmc1GoVe1YMv0ZBzpUnLPlKnAeNQ');
    try {
      await Geocoder.from(latitude, logitude)
        .then(json => {
          var location = json.results[0].address_components[3].long_name;
          console.log('location', location);
          setlocation(location);
        })
        .catch(error =>
          console.warn(
            '----------error in getting name of location -------------',
            error,
          ),
        );
    } catch (error) {}
  };
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

          console.log('errget', err.response.data.status);
          setinvalidtoken(err.response.data.status);
        });
    }
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsHorizontalScrollIndicato={false}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#0048F7',
            // paddingHorizontal: 12,
          }}>
          <View style={{marginTop: 7}}>
            <CustomLocation text={locationdata} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              // alignSelf: 'center',
              width: '100%',
              marginTop: 11,
              // justifyContent: 'center',
              // backgroundColor: 'red',
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: '100%',
              // justifyContent: 'center',
              height: 54,
              // backgroundColor: 'red',
            }}>
            <Pressable
              onPress={() => {
                setiscolor(true);
              }}
              style={{
                width: '50%',
                backgroundColor: iscolor ? '#0033AF' : '#0048F7',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  // color: Colors.skyBlue,
                  color: 'white',
                  opacity: iscolor ? 0.5 : 1,
                  fontSize: FontSize.size._16px,
                }}>
                Product
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setiscolor(false);
              }}
              style={{
                width: '50%',
                backgroundColor: iscolor ? '#0048F7' : '#0033AF',

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  // color: Colors.skyBlue,
                  color: Colors.white,
                  opacity: iscolor ? 1 : 0.5,

                  fontSize: FontSize.size._16px,
                }}>
                Services
              </Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            // marginTop: 10,
            paddingHorizontal: 13,
          }}>
          {iscolor ? <CategorisScreenProduct /> : <CategorisScreenServies />}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoriesTabScreen;

const styles = StyleSheet.create({});
