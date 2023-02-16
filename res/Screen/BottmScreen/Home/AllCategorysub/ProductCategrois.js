import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import Images from '../../../../CustomData/Images';
import Colors, {WIDTHGet} from '../../../../CustomData/Colors';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import {TraveldataList} from '../../../../Flatlistdata/prodctScreenData/TravelData';
import CutomHeader from '../../../../CustomComponet/CutomHeader';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {LABEL_DATA, LOGIN, USERS_DATAS} from '../../../../../Redux/ActionType';
import {getLanguage, SCREEN_Product} from '../../../../../LanguageTest';
import axios from 'axios';
import {
  BASE_URl,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_DASHBOARD,
} from '../../../../BaseUrl/Baseurl';
import Toast from 'react-native-toast-message';
import {useState} from 'react';
import {useEffect} from 'react';
import Indicater from '../../../../ActivityIndicator/ActivityIndicator';
import CustomLoader from '../../../../ActivityIndicator/CustomLoader';

import NetInfo from '@react-native-community/netinfo';
import {Store} from '../../../../../Redux/MainStore';
import {setSessionFild} from '../../../../../Redux/SessionAction';
const HEIAGHT = Dimensions.get('window').height;
const ProductCategroisData = ({data, route}) => {
  console.log('data', data);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',

        flex: 1,
        // borderWidth: 1,
        // marginTop: 20,
        marginVertical: 20,
        // marginHorizontal: 20,
      }}>
      <Pressable
        focusable={true}
        onPress={() => {
          navigation.navigate('ProuductSubCategoris', {data: data});
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
          source={{
            uri: 'https://africamarket.s3.amazonaws.com/164546_485701f975bc96da62510348caaf9127.png',
          }}
          // style={{width: data.width, height: data.heidth}}
        />
      </Pressable>
      <Text
        style={{
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
const ProductCategrois = () => {
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  const [getproductdata, setgetproductdata] = useState();
  console.log('Token', Token.Token);
  const navigation = useNavigation();
  const [loder, setloder] = useState(false);

  useEffect(() => {
    get_product_categorys();
  }, []);
  async function get_product_categorys() {
    // let data = {OldPassword, NewPassword, ConfirmPassword};
    // setisloding(true);
    setloder(true);

    axios({
      method: 'GET',
      url: BASE_URl + GET_PRODUCT_CATEGORY,

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token.Token,
      },
    })
      .then(res => res.data)
      .then(res => {
        {
          setloder(false);
          // setisloding(false);
          Toast.show({
            type: 'success',
            text1: 'success',
            topOffset: 0,
            visibilityTime: 1500,
            text2: res.message,
          });
          if (res.status == 'success') {
            // Store.dispatch(setSessionFild(USERS_DATAS, res.data));
            // Store.dispatch(setSessionFild(LOGIN, true));
            // console.log('here', res.data);
            setgetproductdata(res.data);
          }
        }
      })
      .catch(err => {
        setloder(false);
        console.log('err', err.response.data.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          topOffset: 0,
          visibilityTime: 1200,
          text2: err.response.data.message,
        });
      });
  }

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
  }, []);

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
    <View
      style={{
        // marginBottom: 20,
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 40,
      }}>
      <SafeAreaView>
        <CutomHeader
          headrtitle={
            getLanguage(SCREEN_Product)[0].LabelData.Product_Category_Title
          }
          leftIcon={Images['whiteremove']}
        />
        <Toast />
        <CustomLoader visible={loder} />
        <FlatList
          data={getproductdata}
          renderItem={({item}) => {
            console.log('item', item);
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',

                  marginTop: 19,
                }}>
                <Pressable
                  focusable={true}
                  onPress={() => {
                    navigation.navigate('ProuductSubCategoris', {data: item});
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
                    source={{
                      uri: item.cat_image,
                    }}
                    style={{width: 30, height: 30}}
                  />
                </Pressable>
                <Text
                  style={{
                    flexGrow: 1,
                    width: WIDTHGet * 0.22,
                    color: '#202328',
                    marginTop: 10,
                    textAlign: 'center',
                    fontFamily: Fonts.regular,
                    fontSize: FontSize.size._13px,
                    // marginBottom: 40,
                  }}>
                  {' '}
                  {item.cat_title}{' '}
                </Text>
              </View>
            );
          }}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={{
            paddingHorizontal: 30,
          }}
          columnWrapperStyle={{
            // marginHorizontal: 20,

            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default ProductCategrois;

const styles = StyleSheet.create({});
