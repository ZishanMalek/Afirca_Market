import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ServidataGet} from '../../../../CustomComponet/ServicesScreen';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import {useState} from 'react';
import {USERS_DATAS} from '../../../../../Redux/ActionType';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {BASE_URl, GET_MY_SERVICES} from '../../../../BaseUrl/Baseurl';
import CustomLoader from '../../../../ActivityIndicator/CustomLoader';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-toast-message';
import Images from '../../../../CustomData/Images';
import {useNavigation} from '@react-navigation/native';

export const ServicesGetDataAll1 = ({data}) => {
  const navigation = useNavigation();
  console.log('data', data);
  return (
    <View
      style={{
        width: 360,
        height: 215,
        marginHorizontal: 3,
        //   alignItems: 'center',

        marginTop: 10,
        //   backgroundColor: 'red',
      }}>
      <Pressable
        onPress={() => {
          navigation.navigate('ServicesDetaliScreen', {
            id: data.Id,
          });
        }}>
        <Image
          source={{uri: data.Images}}
          resizeMode="cover"
          style={{width: '100%', height: 161}}
        />
      </Pressable>
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
          {data.Title}
        </Text>

        <Image
          source={Images['threedots']}
          style={{
            width: 24,

            height: 20,
          }}
        />
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
const ServiesOverView = () => {
  const [services, setservices] = useState('');
  console.log(services);
  const [isloder, setloder] = useState(false);
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  const [isgetid, setisgetid] = useState('');
  console.log('isgetid', isgetid);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Get_servies_my();
  }, []);
  // const ISmodel = ({visible}) => {
  //   <Modal transparent visible={visible}>
  //     <View
  //       style={{
  //         backgroundColor: 'red',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: 400,
  //       }}>
  //       <View
  //         style={{
  //           backgroundColor: 'white',
  //           borderRadius: 10,
  //           padding: 20,
  //         }}>
  //         <Text>hello</Text>
  //       </View>
  //     </View>
  //   </Modal>;
  // };

  async function Get_servies_my() {
    setloder(true);

    // await axios(config)
    axios({
      method: 'GET',
      url: BASE_URl + GET_MY_SERVICES,
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
        setservices(res.data);
        {
          // Toast.show({
          //   type: 'success',
          //   text1: res.message,
          //   topOffset: 100,
          //   visibilityTime: 1200,
          //   // text2: err.response.data.message,
          // });
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
    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 16}}>
      <CustomLoader visible={isloder} />
      <Toast />
      <View>
        <FlatList
          data={services}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <ServicesGetDataAll1 data={item} />}
        />
      </View>
    </View>
  );
};

export default ServiesOverView;

const styles = StyleSheet.create({});
