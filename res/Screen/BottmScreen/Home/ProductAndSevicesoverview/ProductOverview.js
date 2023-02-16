import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {productHorzotaldtaGet} from '../../../../CustomComponet/ProductScreen';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import Images from '../../../../CustomData/Images';
import Colors, {HEIGHTGet, WIDTHGet} from '../../../../CustomData/Colors';
import CustomLoader, {
  Imageloder,
} from '../../../../ActivityIndicator/CustomLoader';
import {useSelector} from 'react-redux';
import {USERS_DATAS} from '../../../../../Redux/ActionType';
const HEIGHT = Dimensions.get('window').height;
import Toast from 'react-native-toast-message';
import {
  BASE_URl,
  GET_PRODUCT_DELETED,
  MY_PRODUCT,
} from '../../../../BaseUrl/Baseurl';
import axios from 'axios';
import {useEffect} from 'react';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {ServidataGet} from '../../../../CustomComponet/ServicesScreen';
import {ServicesGetDataAll1} from './ServiesOverView';
import {ActivityIndicator} from 'react-native-paper';
import LottieView from 'lottie-react-native';

const ProductOverview = () => {
  const [isproductdata, setisproductdata] = useState('');
  const [isloder, setloder] = useState(false);
  const session = useSelector(state => state.session);
  const [imageload, setimageload] = useState(false);
  const Token = session[USERS_DATAS];
  const [isgetid, setisgetid] = useState('');
  console.log('isgetid', isgetid);
  const [visible, setVisible] = useState(false);
  const Produdata = ({data}) => {
    const [iscolor, setiscolor] = useState(false);
    const navigation = useNavigation();
    console.log(data.id);

    function onloaing(value, label) {
      // setloder(value);
    }

    return (
      <View
        onPress={() => {}}
        style={{
          width: 164,
          height: 195,
          // backgroundColor: 'red',
          margin: 5,
          // justifyContent: 'center',
          marginTop: 10,
          // paddingHorizontal: 20,
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('ProductDetailsScreen', {
              id: data.Id,
            });
          }}>
          {isproductdata.length > 0 ? (
            <>
              <Image
                source={{uri: data.Images}}
                onLoadStart={() => onloaing(true, 'Loading')}
                onLoadEnd={() => onloaing(false, 'Loading')}
                style={{width: 164, height: 141, borderRadius: 3}}
              />
            </>
          ) : (
            <>
              <LottieView
                style={{
                  width: 50,
                  height: 50,
                  alignItems: 'center',
                }}
                autoPlay
                source={{
                  uri: 'https://assets10.lottiefiles.com/packages/lf20_ynuaerju.json',
                }}></LottieView>
            </>
          )}
        </Pressable>
        <Text
          style={{
            fontFamily: Fonts.regular,
            // marginTop: 4,

            width: 164,
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
            width: 164,
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

          <Pressable
            onPress={() => {
              setisgetid(data.Id);
              setVisible(!visible);
              setiscolor(!iscolor);
              // alert('hello');
            }}>
            <Image
              //   source={iscolor ? d  ata.sky : dat}

              source={Images['threedots']}
              style={{
                width: 24,
                tintColor: iscolor ? '#FF0000' : '#000000',

                height: 24,
              }}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  useEffect(() => {
    GET_my_Product();
  }, []);
  const ISmodel = ({visible}) => {
    <Modal transparent visible={visible}>
      <View
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          height: 400,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
          }}>
          <Text>hello</Text>
        </View>
      </View>
    </Modal>;
  };

  async function GET_my_Product() {
    setloder(true);

    // await axios(config)
    axios({
      method: 'GET',
      url: BASE_URl + MY_PRODUCT,
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
        setloder(false);
        console.log('res', res);
        setisproductdata(res.data);
        {
          Toast.show({
            type: 'success',
            text1: res.message,
            topOffset: 100,
            visibilityTime: 1200,
            // text2: err.response.data.message,
          });
        }
      })
      .catch(err => {
        setloder(false);
        console.log('err', err);
        // console.log('err', err.response.data.message);
        Toast.show({
          type: 'error',
          text1: 'error',
          topOffset: 100,
          visibilityTime: 1200,
          // text2: err.response.data.message,
        });
      });
  }

  async function DeletedProduct() {
    setloder(true);

    // await axios(config)
    axios({
      method: 'POST',
      url: BASE_URl + GET_PRODUCT_DELETED,
      data: {
        ProdId: isgetid,
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token.Token,
      },
    })
      .then(res => res.data)
      .then(res => {
        setloder(false);
        console.log('res', res);
        {
          Toast.show({
            type: 'success',
            text1: 'Success',
            topOffset: 10,
            visibilityTime: 1200,
            text2: res.message,
          });
        }
      })
      .catch(err => {
        setloder(false);
        console.log('err', err);
        // console.log('err', err.response.data.message);
        Toast.show({
          type: 'error',
          text1: 'error',
          topOffset: 100,
          visibilityTime: 1200,
          // text2: err.response.data.message,
        });
      });
  }
  return (
    <View
      style={{
        height: '100%',
      }}>
      <CustomLoader visible={isloder} />
      <FlatList
        data={isproductdata}
        contentContainerStyle={{}}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          // height: '100%',
          // flex: 1,
          // width: '100%',
        }}
        numColumns={2}
        renderItem={({item, index}) => <Produdata data={item} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductOverview;

const styles = StyleSheet.create({});
