import {
  Button,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  useWindowDimensions,
  PixelRatio,
  ScrollView,
  LogBox,
  Alert,
  SafeAreaView,
  PermissionsAndroid,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useNavigation, useRoute} from '@react-navigation/native';
import Images from '../../CustomData/Images';
import Fonts from '../../CustomData/Fonts';
import FontSize from '../../CustomData/FontSize';
import Colors, {WIDTHGet} from '../../CustomData/Colors';
import {CustomSearch} from '../../CustomComponet/CustomSearch';
import CustomLocation from '../../CustomComponet/CustomLocation';
import ProductScreen from '../../CustomComponet/ProductScreen';
import ServicesScreen from '../../CustomComponet/ServicesScreen';
import {FixedSeach} from '../../CustomComponet/FixedSeach';
import {useSelector} from 'react-redux';
import {
  GETLOCATION,
  GUST_ACCOUNT,
  LABEL_DATA,
  Location,
} from '../../../Redux/ActionType';
import {getLanguage, SCREEN_Dashboard} from '../../../LanguageTest';
import {getcolors} from './EditprofileScreen/Themeing';

const HAIEDTH = Dimensions.get('screen').height;
const pic = PixelRatio.getPixelSizeForLayoutSize(
  Dimensions.get('window').width,
);

// console.log(pic);

// const windowWidth = useWindowDimensions().height;
// console.log(windowWidth);
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {Store} from '../../../Redux/MainStore';
import {setSessionFild} from '../../../Redux/SessionAction';
import {useEffect} from 'react';

const HomeTabSceeen = ({props}) => {
  const navigation = useNavigation();
  const [latitude, setlatitude] = useState('');
  const [logitude, setlogitude] = useState('');
  const route = useRoute();
  const [location, setlocation] = useState('');
  const [iscolor, setiscolor] = useState(true);

  const session = useSelector(state => state.session);
  const locationdata = session[GETLOCATION];

  const GUST_Account = session[GUST_ACCOUNT];
  console.log('GUST_Account', GUST_Account);
  const getgeolocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('cuurent position -->', position);
        setlatitude(position.coords.latitude);
        setlogitude(position.coords.longitude);

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
          // console.log('location', location);
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
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <View
        style={{
          // width: '100%',
          backgroundColor: getcolors() === 'green' ? 'green' : '#0048F7',
          // height: HAIEDTH * 0,
          // height: HAIEDTH * 0.17,
          paddingHorizontal: 12,
        }}>
        <CustomLocation
          text={locationdata === undefined ? location : locationdata}
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
              navigation.navigate('GoogleSearchData');
            }
          }}
        />
        <Pressable
          onPress={() => {
            navigation.navigate('ScearchScreen');
          }}>
          <View style={{marginTop: hp('1%')}}>
            <FixedSeach leftIcon={Images['Search']} />
          </View>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: '100%',
          // justifyContent: 'center',
          height: 60,
          marginTop: -10,
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
            {getLanguage(SCREEN_Dashboard)[0].LabelData.Section_Product_Title}
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
            {getLanguage(SCREEN_Dashboard)[0].LabelData.Section_Service_Title}
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          // height: HAIEDTH * 0.7,
          flex: 1,
          // alignItems: 'center',
          // justifyContent: 'center',
          // flex: ,
          // marginTop: 10,
          // paddingHorizontal: 13,
        }}>
        {iscolor ? <ProductScreen /> : <ServicesScreen />}
      </View>
    </ScrollView>
  );
};

export default HomeTabSceeen;

const styles = StyleSheet.create({});
