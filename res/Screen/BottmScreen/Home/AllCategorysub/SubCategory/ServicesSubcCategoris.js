import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CutomHeader from '../../../../../CustomComponet/CutomHeader';
import Images from '../../../../../CustomData/Images';
import Fonts from '../../../../../CustomData/Fonts';
import FontSize from '../../../../../CustomData/FontSize';
import {
  ExpandData,
  ServiecsAllGetDataFeach,
  TraveldataList,
} from '../../../../../Flatlistdata/prodctScreenData/TravelData';
import {
  BASE_URl,
  GET_SERVICES_CATEGORY,
  GET_SERVICES_SUBCATEGORY,
} from '../../../../../BaseUrl/Baseurl';
import {useSelector} from 'react-redux';
import {USERS_DATAS} from '../../../../../../Redux/ActionType';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';
import axios from 'axios';
import CustomLoader from '../../../../../ActivityIndicator/CustomLoader';
import Colors from '../../../../../CustomData/Colors';

const ServicesSubcCategoris = ({route}) => {
  const [setsubcategories, setsetsubcategories] = useState();
  console.log(setsubcategories);
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  console.log('Token', Token.Token);
  const [iscolor, setiscolor] = useState(0);
  console.log(iscolor);
  const routeData = route.params.data;
  console.log('routeData', routeData);
  const [apiindex, setApiindex] = useState(1);

  const [seleteditem, setseleteditem] = useState(routeData.cat_id);
  console.log('seleteditem', seleteditem);
  const [loder, setloder] = useState(false);
  const ProductCategroisSubData = ({data, index}) => {
    return (
      <View style={{}}>
        <Pressable
          onPress={() => {
            setseleteditem(data.cat_id);
            setApiindex(index + 1);
          }}
          style={{
            width: 163,
            height: 66,
            backgroundColor: '#F5FAFB',
            overflow: 'hidden',
            borderRadius: 3,
            borderColor:
              seleteditem === data.cat_id ? Colors.skyBlue : '#F5FAFB',

            flexDirection: 'row',
            // flex: 1,
            marginHorizontal: 3,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
          }}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            source={{uri: data.cat_image}}
            style={{width: 30, height: 30}}
          />
          <Text
            allowFontScaling={false}
            style={{
              color: '#202328',
              marginStart: 4,

              textAlign: 'center',
              fontFamily: Fonts.regular,
              fontSize: FontSize.size._12px,
            }}>
            {data.cat_title}
          </Text>
        </Pressable>
      </View>
    );
  };
  useEffect(() => {
    get_services_subcategors();
  }, []);
  useEffect(() => {
    get_services_subcategors();
  }, [apiindex, iscolor]);
  useEffect(() => {
    // get_product_categorys();
    get_services_categorys();
  }, []);

  const ExpandDataList = ({data}) => {
    const [isdown, setisdown] = useState(false);
    return (
      <View>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomColor: '#E3E3E3',
            borderBottomWidth: 1,
            marginTop: 15,
            paddingBottom: 15,
          }}
          onPress={() => {
            setisdown(!isdown);
          }}>
          <Text style={{color: 'black'}}>{data.Ssubat_title}</Text>
          <Image
            source={isdown ? Images['downdark'] : Images['forward']}
            style={{width: 30, height: 30}}
          />
          {/* { ExpandData.map((item, index) => {
            console.log(item.subCaqtegory);
            isdown ? <Text>{item.subCaqtegory}</Text> : null;
          })} */}
        </Pressable>
        {isdown
          ? ExpandData.map((item, index) => {
              console.log(item.subCaqtegory);
              return (
                <View
                  style={{
                    justifyContent: 'space-between',
                    borderBottomColor: '#E3E3E3',
                    borderBottomWidth: 1,
                    marginTop: 15,
                    paddingBottom: 15,
                  }}>
                  <Text style={{color: '#202328'}}>{item.subCaqtegory}</Text>
                </View>
              );
            })
          : null}
      </View>
    );
  };

  async function get_services_subcategors() {
    // let data = {OldPassword, NewPassword, ConfirmPassword};
    // setisloding(true);
    setloder(true);

    axios({
      method: 'POST',
      url: BASE_URl + GET_SERVICES_SUBCATEGORY,
      data: {
        CatId: seleteditem,
      },
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
            visibilityTime: 1200,
            text2: res.message,
          });
          if (res.status == 'success') {
            // Store.dispatch(setSessionFild(USERS_DATAS, res.data));
            // Store.dispatch(setSessionFild(LOGIN, true));
            // console.log('here', res.data);
            setsetsubcategories(res.data);
          }
        }
      })
      .catch(err => {
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
            visibilityTime: 1500,
            text2: res.message,
          });
          if (res.status == 'success') {
            // Store.dispatch(setSessionFild(USERS_DATAS, res.data));
            // Store.dispatch(setSessionFild(LOGIN, true));
            // console.log('here', res.data);
            setServicesData(res.data);
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
  const [setdata, setServicesData] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CutomHeader
        headrtitle="Service Sub Category"
        leftIcon={Images['whiteremove']}
      />
      <Toast />
      <CustomLoader visible={loder} />
      <View style={{marginTop: 14, paddingHorizontal: 12}}>
        <FlatList
          onScrollAnimationEnd={() => {
            console.log('onScrollAnimationEnd');
          }}
          data={setdata}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ProductCategroisSubData data={item} index={index} />
          )}
        />
        <Text
          style={{
            marginTop: 19,
            lineHeight: 27,
            color: '#202328',
            fontSize: FontSize.size._20px,
            fontFamily: Fonts.bold,
          }}>
          Sub Categories
        </Text>

        <FlatList
          data={setsubcategories}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ExpandDataList data={item} />}
        />
      </View>
    </View>
  );
};

export default ServicesSubcCategoris;

const styles = StyleSheet.create({});
