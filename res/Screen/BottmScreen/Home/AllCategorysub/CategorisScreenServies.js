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
import {
  ServiecsAllGetDataFeach,
  TraveldataList,
} from '../../../../Flatlistdata/prodctScreenData/TravelData';
import CutomHeader from '../../../../CustomComponet/CutomHeader';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URl, GET_SERVICES_CATEGORY} from '../../../../BaseUrl/Baseurl';
import {USERS_DATAS} from '../../../../../Redux/ActionType';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../../ActivityIndicator/CustomLoader';

const HEIAGHT = Dimensions.get('window').height;

const CategorisScreenServies = () => {
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
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <Toast />

        <CustomLoader visible={loder} />
        <FlatList
          data={getsevices}
          renderItem={({item}) => <SerivecsData data={item} />}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={{
            // marginHorizontal: 10,
            // width: 300,
            justifyContent: 'space-between',
            // alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default CategorisScreenServies;

const styles = StyleSheet.create({});
