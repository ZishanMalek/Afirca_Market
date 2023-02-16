import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CutomHeader from '../../CustomComponet/CutomHeader';
import Colors, {WIDTHGet} from '../../CustomData/Colors';
import ImagePicker from 'react-native-image-crop-picker';

import Fonts from '../../CustomData/Fonts';
import FontSize from '../../CustomData/FontSize';
import Images from '../../CustomData/Images';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import Cutominputreg from '../../CustomComponet/Cutominputreg';
import NetInfo from '@react-native-community/netinfo';

import CustomButtom from '../../CustomComponet/CustomButtom';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {getLanguage, SCREEN_Product} from '../../../LanguageTest';
import axios from 'axios';
import {
  BASE_URl,
  CREATE_GALLERY,
  CREATE_PRODUCT,
  GET_PRODUCT_DASHBOARD,
} from '../../BaseUrl/Baseurl';
import {useSelector} from 'react-redux';
import {
  GET_IMAGE,
  GET_IMAGE1,
  GET_IMAGE2,
  GUST_ACCOUNT,
  Location,
  LOGIN,
  USERS_DATAS,
} from '../../../Redux/ActionType';
import CustomLoader from '../../ActivityIndicator/CustomLoader';
import {Store} from '../../../Redux/MainStore';
import {setSessionFild} from '../../../Redux/SessionAction';
import {useEffect} from 'react';
import Snackbar from 'react-native-snackbar';

import Geolocation from 'react-native-geolocation-service';
import ProductSelltab from './Home/SelltabScreen/ProductSelltab';
import ServicesSelltab from './Home/SelltabScreen/ServicesSelltab';

const SellTabScreen = ({}) => {
  const [iscolor, setiscolor] = useState(false);
  const isFocused = useIsFocused();

  // console.log('imagesget', imagesget);
  const session = useSelector(state => state.session);

  const Token = session[USERS_DATAS];
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
  const GUST_Account = session[GUST_ACCOUNT];
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
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingBottom: 0,
          // paddingHorizontal: 10,
          // borderWidth: 1,
        }}>
        <SafeAreaView>
          <ScrollView>
            <CutomHeader headrtitle="Sell Products or Offer Services" />
            <Toast />

            <View style={{paddingHorizontal: 16}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                  flexWrap: 'wrap',
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
              {/* ------------------------data show---------------------- */}
              {iscolor == 0 ? (
                <>
                  <ProductSelltab />
                </>
              ) : (
                <>
                  <ServicesSelltab />
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
};

export default SellTabScreen;

const styles = StyleSheet.create({});
