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
import {LABEL_DATA, USERS_DATAS} from '../../../../../Redux/ActionType';
import {getLanguage, SCREEN_Product} from '../../../../../LanguageTest';
import axios from 'axios';
import {BASE_URl, GET_PRODUCT_CATEGORY} from '../../../../BaseUrl/Baseurl';
import Toast from 'react-native-toast-message';
import {useState} from 'react';
import {useEffect} from 'react';
import Indicater from '../../../../ActivityIndicator/ActivityIndicator';
import CustomLoader from '../../../../ActivityIndicator/CustomLoader';

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
const CategorisScreenProduct = () => {
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 50,
      }}>
      <SafeAreaView>
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

                  // flex: 1,
                  // borderWidth: 1,
                  marginTop: 19,
                  // marginVertical: 10,
                  marginHorizontal: 13,

                  // paddingBottom: 20,
                  // marginHorizontal: 20,
                }}>
                <Pressable
                  focusable={true}
                  onPress={() => {
                    // navigation.navigate('ProuductSubCategoris', {data: item});
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
                  {item.cat_title}
                </Text>
              </View>
            );
          }}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
            // marginHorizontal: 20,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default CategorisScreenProduct;

const styles = StyleSheet.create({});
