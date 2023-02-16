import {
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CutomHeader from '../../../../../CustomComponet/CutomHeader';
import Images from '../../../../../CustomData/Images';
import Fonts from '../../../../../CustomData/Fonts';
import FontSize from '../../../../../CustomData/FontSize';
import {
  ExpandData,
  TraveldataList,
} from '../../../../../Flatlistdata/prodctScreenData/TravelData';
import {getLanguage, SCREEN_Product} from '../../../../../../LanguageTest';
import {
  BASE_URl,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_SUBCATEGORY,
} from '../../../../../BaseUrl/Baseurl';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';
import {USERS_DATAS} from '../../../../../../Redux/ActionType';
import {useSelector} from 'react-redux';
import CustomLoader from '../../../../../ActivityIndicator/CustomLoader';
import Colors, {HEIGHTGet, WIDTHGet} from '../../../../../CustomData/Colors';
import {useRef} from 'react';

const ProuductSubCategoris = ({route}) => {
  const routeData = route.params.data;
  console.log('routeData', routeData);
  const [iscolor, setiscolor] = useState(0);
  const [apiindex, setApiindex] = useState(1);
  // console.log(iscolor);
  const [setsubcategories, setsetsubcategories] = useState();
  const [loder, setloder] = useState(false);
  // console.log(setsubcategories);
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  // console.log('Token', Token.Token);
  const [seleteditem, setseleteditem] = useState(routeData.cat_id);
  console.log('seleteditem', seleteditem);
  // console.log('seleteditem ===>>>>', seleteditem);
  const ProductCategroisSubData = ({data, index}) => {
    // console.log(index);
    return (
      <View>
        <Pressable
          onPress={() => {
            // setiscolor(!iscolor);
            setseleteditem(data.cat_id);
            setApiindex(index + 1);
            // get_prouct_subcategors();
          }}
          style={{
            width: 161,
            height: 66,
            // overflow: 'hidden',s
            backgroundColor: '#F5FAFB',

            borderRadius: 3,
            borderColor:
              seleteditem === data.cat_id ? Colors.skyBlue : '#F5FAFB',
            flexDirection: 'row',
            // flex: 1,
            marginHorizontal: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
          }}>
          <Image
            source={{uri: data.cat_image}}
            style={{width: 30, height: 30}}
            resizeMode="contain"
          />
          <Text
            style={{
              color: '#202328',
              marginStart: 10,

              textAlign: 'center',
              fontFamily: Fonts.regular,
              fontSize: FontSize.size._13px,
            }}>
            {data.cat_title}
          </Text>
        </Pressable>
      </View>
    );
  };

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
        </Pressable>
      </View>
    );
  };

  useEffect(() => {
    get_prouct_subcategors();
  }, [seleteditem]);
  useEffect(() => {
    get_prouct_subcategors();
  }, [apiindex, iscolor]);
  useEffect(() => {
    get_product_categorys();
  }, [seleteditem]);

  const [setdata, setgetproductdata] = useState();

  const flatListRef = useRef(null);

  // const [index, setindex] = useState(seleteditem);
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
          console.log(res);
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

  async function get_prouct_subcategors() {
    setloder(true);
    axios({
      method: 'POST',
      url: BASE_URl + GET_PRODUCT_SUBCATEGORY,
      data: {
        // CatId: apiindex,
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
        setloder(false);
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
    <SafeAreaView>
      <ScrollView>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <CutomHeader
            headrtitle={
              getLanguage(SCREEN_Product)[0].LabelData.Product_Subcategory_Title
            }
            leftIcon={Images['whiteremove']}
          />
          <Toast />
          <CustomLoader visible={loder} />

          <View style={{marginTop: 14, paddingHorizontal: 12}}>
            <FlatList
              onScrollAnimationEnd={() => {
                console.log('onScrollAnimationEnd');
              }}
              ref={flatListRef}
              getItemLayout={(data, index) => ({
                length: 80,
                offset: 80 * index,
                index,
              })}
              initialNumToRender={seleteditem}
              data={setdata}
              pagingEnabled={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <ProductCategroisSubData data={item} index={index} />
              )}
            />
            <Text
              style={{
                marginTop: 15,
                lineHeight: 27,
                color: '#202328',
                fontSize: FontSize.size._20px,
                fontFamily: Fonts.bold,
              }}>
              {
                getLanguage(SCREEN_Product)[0].LabelData
                  .Product_Subcategory_Subtitle
              }{' '}
            </Text>

            <FlatList
              data={setsubcategories}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <ExpandDataList data={item} />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProuductSubCategoris;

const styles = StyleSheet.create({});
