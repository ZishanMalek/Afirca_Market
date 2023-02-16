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
import NetInfo from '@react-native-community/netinfo';

import {
  ServiecsAllGetDataFeach,
  TraveldataList,
} from '../../../../Flatlistdata/prodctScreenData/TravelData';
import CutomHeader from '../../../../CustomComponet/CutomHeader';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {
  BASE_URl,
  GET_PRODUCT_DASHBOARD,
  GET_SERVICES_CATEGORY,
} from '../../../../BaseUrl/Baseurl';
import {LOGIN, USERS_DATAS} from '../../../../../Redux/ActionType';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../../ActivityIndicator/CustomLoader';
import {Store} from '../../../../../Redux/MainStore';
import {setSessionFild} from '../../../../../Redux/SessionAction';

const HEIAGHT = Dimensions.get('window').height;

const ServicesCategoris = () => {
  const SerivecsData = ({data}) => {
    const navigation = useNavigation();
    return (
      <View
        style={{
          // justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: 13,
          // flex: 1,
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('ServicesSubcCategoris', {data: data});
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
              // marginHorizontal: 10,
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
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  const [loder, setloder] = useState(false);
  const [getsevices, setgetservices] = useState();
  console.log('Token', Token.Token);
  useEffect(() => {
    get_services_categorys();
  }, []);
  async function get_services_categorys() {
    // let data = {OldPassword, NewPassword, ConfirmPassword};
    // setisloding(true);

    setloder(true);
    axios({
      method: 'GET',
      url: BASE_URl + GET_SERVICES_CATEGORY,

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
            visibilityTime: 1300,
            text2: res.message,
          });
          if (res.status == 'success') {
            // Store.dispatch(setSessionFild(USERS_DATAS, res.data));
            // Store.dispatch(setSessionFild(LOGIN, true));
            // console.log('here', res.data);
            setgetservices(res.data);
          }
        }
      })
      .catch(err => {
        setloder(false);
        setisloding(false);
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <CutomHeader
          headrtitle="Service Categories"
          leftIcon={Images['whiteremove']}
        />
        <Toast />

        <CustomLoader visible={loder} />
        <FlatList
          data={getsevices}
          renderItem={({item}) => <SerivecsData data={item} />}
          keyExtractor={item => item.id}
          numColumns={3}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          columnWrapperStyle={{
            // width: 300,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default ServicesCategoris;

const styles = StyleSheet.create({});
