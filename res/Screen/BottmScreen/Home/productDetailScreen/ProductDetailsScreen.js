import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CutomHeader from '../../../../CustomComponet/CutomHeader';
import Images from '../../../../CustomData/Images';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import Colors, {WIDTHGet} from '../../../../CustomData/Colors';
import CustomView from '../../../../CustomComponet/CustomView';
import {ProductCategroisData} from '../AllCategorysub/ServicesCategoris';
import {
  productHorzotaldtaGet,
  Produdata,
} from '../../../../CustomComponet/ProductScreen';
import CustomButtom from '../../../../CustomComponet/CustomButtom';
import {useNavigation, useRoute} from '@react-navigation/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {getLanguage, SCREEN_Product} from '../../../../../LanguageTest';
import {useEffect} from 'react';
import axios from 'axios';
import {BASE_URl, GET_PRODUCT_DETAIL} from '../../../../BaseUrl/Baseurl';
import CustomLoader from '../../../../ActivityIndicator/CustomLoader';
import {get} from 'lodash';
import {useSelector} from 'react-redux';
import {USERS_DATAS} from '../../../../../Redux/ActionType';
import LottieView from 'lottie-react-native';

const HEIAGHT = Dimensions.get('window').height;
export const DetialsData = [
  {
    id: 1,
    image: Images['laptop'],
  },
  {
    id: 2,
    image: Images['apple'],
  },
  {
    id: 3,
    image: Images['apple1'],
  },
];
export const Dummaydata = [
  {
    id: 1,
    title: 'Lorem ipsum',
    title1: 'Consectetur adipiscing',
  },
  {
    id: 2,
    title: 'Lorem ipsum',
    title1: 'Consectetur adipiscing',
  },
  {
    id: 3,
    title: 'Lorem ipsum',
    title1: 'Consectetur adipiscing',
  },
  {
    id: 4,
    title: 'Lorem ipsum',
    title1: 'Consectetur adipiscing',
  },
  {
    id: 5,
    title: 'Lorem ipsum',
    title1: 'Consectetur adipiscing',
  },
  {
    id: 6,
    title: 'Lorem ipsum',
    title1: 'Consectetur adipiscing',
  },
];

const ProductDetailsScreen = ({}) => {
  console.log('kdkdk', getLanguage(SCREEN_Product)[0].LabelData.Description);
  const navigation = useNavigation();
  const [isdata, setisdata] = useState(false);
  const route = useRoute();
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  console.log('route', route.params);
  console.log(isdata);
  const onScroll = event => {
    const index = Math.floor(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    // console.log(index);
    setisdata(index);
  };

  const [isimages, setisimages] = useState([]);
  console.log('isimages', isimages);
  const [isloder, setloder] = useState(false);
  const [savedata, setSaveData] = useState('');
  useEffect(() => {
    Get_Product_Screen();
  }, []);
  async function Get_Product_Screen() {
    setloder(true);
    // await axios(config)
    GET_PRODUCT_DETAIL;
    axios({
      method: 'POST',
      url: BASE_URl + GET_PRODUCT_DETAIL,
      data: {
        ProdId: route.params,
      },

      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token.Token,
      },
    })
      .then(res => res.data)
      .then(res => {
        console.log('ProductDetials', res);
        setloder(false);
        setisimages(res.data.Images);
        setSaveData(res.data);
        {
          // Toast.show({
          //   type: 'success',
          //   text1: 'Success',
          //   topOffset: 0,
          //   visibilityTime: 1200,
          //   text2: res.message,
          // });
        }
      })
      .catch(err => {
        setloder(false);
        console.log('err', err);
        // console.log('err', err.response.data.message);
      });
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomLoader visible={isloder} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: '#0048F7',
            width: WIDTHGet,
            // marginTop: 10,
            height: HEIAGHT * 0.09,
            // alignSelf: 'center',
            // top: 20,

            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: HEIAGHT * 0.04,
            }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={Images['whiteremove']}
                style={{width: 15, height: 15}}
              />
            </Pressable>
            <Text
              style={{
                color: Colors.white,
                textAlign: 'center',

                flex: 1,
                fontFamily: Fonts.semibold,
                fontSize: FontSize.size._15px,
                marginStart: 50,
                // borderWidth: 1,
              }}>
              Product Detials
            </Text>

            <Image
              source={Images['love']}
              style={{
                marginStart: 10,

                width: 20,
                height: 20,
              }}
            />
          </View>
        </View>
        {isimages.length > 0 ? (
          <>
            <View style={{width: WIDTHGet}}>
              <FlatList
                onScroll={onScroll}
                data={isimages}
                showsHorizontalScrollIndicator={false}
                centerContent={true}
                // contentContainerStyle={{paddingHorizontal: 10}}
                // ItemSeparatorComponent={() => <View style={{width: 10}} />}
                horizontal={true}
                pagingEnabled={true}
                renderItem={({item, index}) => {
                  console.log(item, 'iteam');
                  return (
                    <View style={{marginTop: 10, width: WIDTHGet}}>
                      <Image
                        source={{
                          uri: item,
                        }}
                        resizeMode="cover"
                        style={{
                          // alignItems: 'center',
                          alignSelf: 'center',
                          width: 305,
                          // marginHorizontal: 10,
                          height: 235,
                          borderRadius: 5,
                          // marginHorizontal: 6,
                        }}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </>
        ) : (
          <View
            style={{
              height: 235,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <LottieView
              autoPlay
              style={{
                width: 100,
                height: 100,
              }}
              loop
              source={{
                uri: 'https://assets10.lottiefiles.com/packages/lf20_ynuaerju.json',
              }}></LottieView>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 13,
              flexDirection: 'row',
              // marginHorizontal: 10,
            }}>
            <View
              style={{
                width: 11,
                height: 2,
                backgroundColor: isdata == 0 ? '#0048F7' : '#E5E5E5',
                marginHorizontal: 5,
              }}></View>
            <View
              style={{
                width: 11,
                height: 2,
                backgroundColor: isdata == 1 ? '#0048F7' : '#E5E5E5',
                marginHorizontal: 5,
              }}></View>
            <View
              style={{
                width: 11,
                height: 2,
                backgroundColor: isdata == 2 ? '#0048F7' : '#E5E5E5',
                marginHorizontal: 5,
              }}></View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#202328',
                fontSize: FontSize.size._14px,
                fontFamily: Fonts.regular,
              }}>
              {savedata.Title}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.bold,
                marginTop: 4,
                color: '#202328',
                fontSize: FontSize.size._15px,
              }}>
              {savedata.Currency} {savedata.Price}
            </Text>
          </View>

          <Text
            style={{fontFamily: Fonts.medium, fontSize: FontSize.size._13px}}>
            07 May 2022
          </Text>

          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-around',
              // flex: 1,
              marginTop: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <Image
                source={Images['profile']}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  color: '#6E737E',
                  marginStart: 9,
                  fontSize: FontSize.size._12px,
                }}>
                Seller {'\n'}
                <Text
                  style={{
                    fontFamily: Fonts.semibold,
                    fontSize: FontSize.size._14px,
                    color: '#18251F',
                  }}>
                  Alma Daniel
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // right: 10,
                // marginHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Image source={Images['call']} style={{width: 42, height: 42}} />
              <Image
                source={Images['chat']}
                style={{width: 42, height: 42, marginStart: 5}}
              />
            </View>
          </View>

          <Text
            style={{
              color: '#202328',
              fontFamily: Fonts.regular,
              fontSize: FontSize.size._14px,
              marginTop: 15,
            }}>
            {savedata.Description}
          </Text>

          <Text
            style={{
              color: '#202328',
              fontFamily: Fonts.bold,
              fontSize: FontSize.size._18px,
              marginTop: 15,
            }}>
            {getLanguage(SCREEN_Product)[0].LabelData.Description}{' '}
          </Text>
          <FlatList
            data={savedata.Components}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              width: '100%',
            }}
            renderItem={({item, index}) => {
              return (
                <View>
                  <Pressable
                    style={{
                      height: 63,
                      width: WIDTHGet * 0.45,
                      // marginHorizontal: 5,
                      marginVertical: 10,
                      backgroundColor: '#FFFFFF',
                      borderWidth: 1,
                      // padding: 5,
                      // alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#E6E6E6',
                    }}>
                    <View style={{marginStart: 6}}>
                      <Text
                        style={{
                          color: '#25282D',
                          fontFamily: Fonts.bold,
                        }}>
                        {item.value}
                      </Text>
                      {/* <Text
                          style={{
                            color: '#25282D',
                            fontFamily: Fonts.regular,
                          }}>
                          {item.value}
                        </Text> */}
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />

          {/* <Text
              style={{
                color: '#202328',
                fontFamily: Fonts.bold,
                fontSize: FontSize.size._18px,
                marginTop: 15,
              }}>
              {getLanguage(SCREEN_Product)[0].LabelData.You_May_Also_Like_List}
            </Text> */}

          <View style={{paddingBottom: 10}}>
            <CustomButtom
              text={getLanguage(SCREEN_Product)[0].LabelData.Buy_Now_Button}
              onpress={() => {
                navigation.navigate('PaymentScreen');
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
