import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {USERS_DATAS} from '../../../../../Redux/ActionType';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {
  BASE_URl,
  CREATE_GALLERY,
  CREATE_PRODUCT,
  CREATE_SERVICES,
  GET_SERVICES_CATEGORY,
  GET_SERVICES_SUBCATEGORY,
} from '../../../../BaseUrl/Baseurl';
import {getLanguage, SCREEN_Product} from '../../../../../LanguageTest';
import CustomButtom, {
  CustomButtom1,
} from '../../../../CustomComponet/CustomButtom';
import Images from '../../../../CustomData/Images';
import FontSize from '../../../../CustomData/FontSize';
import Fonts from '../../../../CustomData/Fonts';
import Colors from '../../../../CustomData/Colors';

import RBSheet from 'react-native-raw-bottom-sheet';

import ImagePicker from 'react-native-image-crop-picker';

import {useEffect} from 'react';
import Snackbar from 'react-native-snackbar';
import CustomLoader from '../../../../ActivityIndicator/CustomLoader';
import {
  categotydata,
  Nodata,
  servicesCategriosdata,
  SoftwareData,
  subcategotydata,
} from '../../../../CustomData/Dropdowndata';
import {Dropdown} from 'react-native-element-dropdown';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const ServicesSelltab = () => {
  const [images, setImages] = useState([]);
  // console.log(data);
  const navigation = useNavigation();

  const [iscolor, setiscolor] = useState(false);
  const [istitle, setistitle] = useState('');

  console.log(istitle);
  const [isprice, setisprice] = useState('');
  console.log(isprice);
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);
  const [isdes, setisdes] = useState('');
  // console.log(isdes);

  const refRBSheet = React.useRef();

  const Ondeleted = path => {
    setImages(data => {
      return data.filter(item => {
        return item.path != path;
      });
    });
    // alert('Deleted Pic');
  };
  const camara = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImages(data => {
        refRBSheet.current.close();
        return [...data, image];
      });
    });
  };

  const garlary = () => {
    // Alert.alert('k');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    }).then(imgs => {
      refRBSheet.current.close();
      setImages([...images, ...imgs]);
    });
  };
  const [isloder, setisloder] = useState(false);
  const session = useSelector(state => state.session);
  const Location = session[Location];
  // console.log(Location);
  const [image1, setimage1] = useState('');
  const [image2, setimage2] = useState('');

  const [image3, setimage3] = useState('');

  let allgetimages = {
    image1: image1,
    image2: image2,
    image3: image3,
  };
  let imagesget = [
    allgetimages.image1.toString(),
    allgetimages.image2.toString(),
    allgetimages.image3.toString(),
  ];

  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [location, setlocation] = useState('');
  const [categoty, setcategoty] = useState('');
  // console.log(categoty);

  const [des, setdes] = useState('');
  // console.log(des);
  const [subcategory, setsubcategory] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        // console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const Token = session[USERS_DATAS];

  useEffect(() => {
    // console.log('images', images);
    if (!images.length == 0) {
      get_pic_api();
    }
  }, [images]);

  async function get_pic_api() {
    setisloder(true);
    let isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      setisloder(true);
      Toast.show({
        type: 'error',
        text1: 'No Internet Connection',
        topOffset: 0,
        visibilityTime: 1200,
        text2: 'Please Check Your Internet Connection',
      });
    } else {
      // console.log('in else part');

      // await axios(config)
      const formdatais = new FormData();
      images.map((item, index) => {
        formdatais.append('img', {
          uri: item.path,
          name: 'image.png',
          filename: 'images',
          type: item.mime,
        });
      });
      // console.log('fordata', formdatais);
      axios({
        method: 'POST',
        url: BASE_URl + CREATE_GALLERY,
        data: formdatais,
        headers: {
          'Content-Type': 'multipart/form-data',

          Authorization: 'Bearer ' + Token.Token,
        },
      })
        .then(res => res.data)
        .then(res => {
          setisloder(false);
          if (images.length == 1) {
            // console.log('res1', res);
            setimage1(res.data);
          }

          if (images.length == 2) {
            // console.log('res2', res);
            setimage2(res.data);
          }

          if (images.length == 3) {
            // console.log('res3', res);
            setimage3(res.data);
          }
          {
            Toast.show({
              type: 'success',
              text1: 'sucess',
              topOffset: 0,
              visibilityTime: 1200,
              text2: res.message,
            });
          }
        })
        .catch(err => {
          setisloder(false);
          // console.log('getpicapi', err);
          // console.log('err', err.response.data.message);
          Toast.show({
            type: 'error',
            text1: 'error',
            topOffset: 0,
            visibilityTime: 1200,
            text2: err,
          });
        });
    }
  }

  // console.log(getLanguage(SCREEN_Product)[0].LabelData.Add_List);
  navigation.addListener('focus', () => {
    setistitle('');
    setisdes('');
    setImages([]);
    setisprice('');
  });
  const [isgetservicesdata, setisgetservicesdata] = useState([]);
  const [isgetSubCategoris, setisgetSubCategoris] = useState([]);
  // console.log('isgetSubCategoris', isgetSubCategoris);

  useEffect(() => {
    get_services_categorys();
  }, []);
  async function get_services_categorys() {
    // let data = {OldPassword, NewPassword, ConfirmPassword};
    // setisloding(true);

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
            setisgetservicesdata(res.data);
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
  useEffect(() => {
    if (categoty) {
      get_services_subcategors();
    }
  }, [categoty]);

  async function get_services_subcategors() {
    // let data = {OldPassword, NewPassword, ConfirmPassword};
    // setisloding(true);

    axios({
      method: 'POST',
      url: BASE_URl + GET_SERVICES_SUBCATEGORY,
      data: {
        CatId: categoty.value,
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
          setisgetSubCategoris(res.data);
          // console.log('res', res.data);
          // setisloding(false);
          Toast.show({
            type: 'success',
            text1: 'success',
            topOffset: 0,
            visibilityTime: 1200,
            text2: res.message,
          });
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
  async function Get_Service_page() {
    setisloder(true);
    let isConnected = await NetInfo.fetch();
    if (!isConnected.isConnected) {
      setisloder(true);
      Toast.show({
        type: 'error',
        text1: 'No Internet Connection',
        topOffset: 0,
        visibilityTime: 1200,
        text2: 'Please Check Your Internet Connection',
      });
    } else {
      axios({
        method: 'POST',
        url: BASE_URl + CREATE_SERVICES,
        data: {
          Title: istitle.trim(),
          Category: categoty.value,
          Subcategory: subcategory.value,
          Latitude: latitude.toString(),
          Longitude: longitude.toString(),
          Location: des.trim(),
          Description: isdes.trim(),
          Currency: '$',
          Price: isprice.trim(),
          Gallery: imagesget.toString(),
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + Token.Token,
        },
      })
        .then(res => res.data)
        .then(res => {
          console.log('resMain', res);
          navigation.navigate('MainOver');
          setisloder(false);
          {
            Snackbar.show({
              duration: Snackbar.DURATION_LONG,

              text: 'Product Added Successfully',
              action: {
                text: 'Check',

                textColor: 'green',
                // onPress: () => { /* Do something. */ },
              },

              backgroundColor: '#33515D',
            });
            setistitle('');
            setisdes('');
            setImages([]);
            setisprice('');
          }
        })
        .catch(err => {
          setisloder(false);
          console.log('Create A Product ', err);
          console.log('err', err.response.data.message);
          Snackbar.show({
            duration: Snackbar.LENGTH_SHORT,

            // text: err.response.data.message,
            action: {
              text: 'Check',

              textColor: 'green',
              // onPress: () => { /* Do something. */ },
            },

            backgroundColor: '#33515D',
          });
        });
    }
  }
  return (
    <ScrollView
      stickyHeaderHiddenOnScroll
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices
      style={{
        flex: 1,
      }}>
      <View>
        <Text
          style={{
            fontFamily: Fonts.semibold,
            fontSize: FontSize.size._15px,
            color: '#202328',
            marginTop: 20,
          }}>
          {getLanguage(SCREEN_Product)[0].LabelData.Upload_Pictures}
        </Text>
        <CustomLoader visible={isloder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
            width: '100%',
          }}>
          <View
            style={{
              margin: 5,
              position: 'relative',
              top: 10,
              // borderWidth: 1,
              justifyContent: 'center',
              height: 100,
            }}>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <Image
                source={Images['addphotos']}
                style={{
                  width: 78,
                  height: 78,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={images}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <>
                <View style={{overflow: 'visible', marginBottom: 0}}>
                  <Pressable
                    onPress={() => Ondeleted(item.path)}
                    style={{
                      width: 90,
                      // height: 24,

                      position: 'relative',
                      left: 70,
                      top: 10,
                    }}>
                    <Image
                      style={{
                        // marginStart: 80,
                        // marginHorizontal: 10,
                        width: 19,
                        height: 19,
                      }}
                      source={Images['imgclose']}
                      resizeMode="contain"
                    />
                  </Pressable>
                  <View
                    key={index}
                    style={{
                      // backgroundColor: 'red',
                      // marginTop: 10,
                      // borderRadius: 90,
                      marginStart: 6,
                      zIndex: -1,
                    }}>
                    <Image
                      source={{uri: item.path}}
                      style={{
                        width: 78,
                        height: 78,
                        borderRadius: 4,

                        backgroundColor: '#FF9800',
                      }}
                    />
                  </View>
                </View>
              </>
            )}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: Fonts.semibold,
              fontSize: FontSize.size._14px,
              color: '#202328',
            }}>
            {getLanguage(SCREEN_Product)[0].LabelData.Title}
          </Text>

          <TextInput
            value={istitle}
            onChangeText={text => setistitle(text)}
            placeholder={getLanguage(SCREEN_Product)[0].LabelData.Title}
            placeholderTextColor={'#A9AEB5'}
            style={{
              color: 'black',
              borderBottomWidth: 1,
              borderBottomColor: '#E9EDF6',
            }}
          />

          <Text
            style={{
              fontFamily: Fonts.semibold,
              fontSize: FontSize.size._14px,
              marginTop: 20,
              color: '#202328',
            }}>
            Services Category
          </Text>

          <Dropdown
            data={isgetservicesdata.map((item, index) => {
              return {
                value: item.cat_id,
                label: item.cat_title,
              };
            })}
            iconColor="black"
            onChange={value => setcategoty(value)}
            placeholder="Select Category"
            placeholderTextColor={'#A9AEB5'}
            placeholderStyle={{
              fontFamily: Fonts.regular,
              fontSize: FontSize.size._15px,
              marginStart: 10,
              color: '#A9AEB5',
            }}
            selectedTextStyle={{
              fontSize: 14,
              fontFamily: Fonts.regular,
              color: 'black',
              // marginStart: -5,
            }}
            itemTextStyle={{
              color: 'black',
              fontFamily: Fonts.bold,
            }}
            statusBarIsTranslucent={true}
            labelField="label"
            valueField="value"
            dropdownPosition={'bottom'}
            style={styles.Dropdowm3}
            value={categoty}
          />
          <Text
            style={{
              fontFamily: Fonts.semibold,
              fontSize: FontSize.size._14px,
              marginTop: 20,
              color: '#202328',
            }}>
            Services SubCategory
          </Text>

          <Dropdown
            data={isgetSubCategoris.map((item, i) => {
              return {
                value: item.Subcat_id,
                label: item.Ssubat_title,
              };
            })}
            iconColor="black"
            onChange={value => setsubcategory(value)}
            placeholder="Select SubCategory"
            placeholderTextColor={'#A9AEB5'}
            placeholderStyle={{
              fontFamily: Fonts.regular,
              fontSize: FontSize.size._15px,
              marginStart: 10,
              color: '#A9AEB5',
            }}
            selectedTextStyle={{
              fontSize: 14,
              fontFamily: Fonts.regular,
              color: 'black',
              height: categoty.label === 'Software Services' ? 50 : null,
            }}
            itemTextStyle={{
              color: 'black',
              fontFamily: Fonts.bold,
            }}
            statusBarIsTranslucent={true}
            labelField="label"
            valueField="value"
            dropdownPosition={'bottom'}
            style={styles.Dropdowm3}
            value={subcategory}
          />
          <Text
            style={{
              fontFamily: Fonts.semibold,
              fontSize: FontSize.size._14px,
              marginTop: 20,
              color: '#202328',
            }}>
            Location
          </Text>

          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={true}
            textInputProps={{
              placeholder: 'Enter Location',
              placeholderTextColor: '#A9AEB5',
              style: {
                fontFamily: Fonts.regular,
                fontSize: FontSize.size._15px,
                marginStart: -4,
                color: 'black',
              },
            }}
            returnKeyType={'default'}
            fetchDetails={true}
            keepResultsAfterBlur={true}
            listViewDisplayed={false}
            onPress={(data, details = null) => {
              // console.log('data', details.address_components[0].long_name);
              setlat(details.geometry.location.lat);
              setlong(details.geometry.location.lng);
              setdes(details.address_components[0].long_name);
            }}
            query={{
              key: 'AIzaSyDJn3lkmc1GoVe1YMv0ZBzpUnLPlKnAeNQ',
              language: 'en',
            }}
            styles={{
              textInputContainer: {
                borderBottomWidth: 1,
                borderBottomColor: '#E4E4E4',
                width: '100%',
                color: 'black',
              },

              textInput: {
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: 'black',
              },
              description: {
                fontWeight: 'bold',
                color: 'black',
              },

              listView: {
                backgroundColor: '#686868',
              },
            }}
          />
          <View style={{marginVertical: 20}}>
            <Text
              style={{
                fontFamily: Fonts.semibold,
                fontSize: FontSize.size._14px,
                color: '#202328',
              }}>
              {getLanguage(SCREEN_Product)[0].LabelData.Price}
            </Text>

            <TextInput
              value={isprice}
              onChangeText={text => setisprice(text)}
              placeholder="$"
              placeholderTextColor={'#A9AEB5'}
              style={{
                color: 'black',
                borderBottomWidth: 1,
                borderBottomColor: '#E9EDF6',
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: Fonts.semibold,
              fontSize: FontSize.size._14px,
              color: '#202328',
            }}>
            {getLanguage(SCREEN_Product)[0].LabelData.Description}
          </Text>

          <TextInput
            value={isdes}
            onChangeText={text => setisdes(text)}
            placeholder="Write your description here"
            multiline={true}
            placeholderTextColor={'#A9AEB5'}
            style={{
              color: 'black',
              borderBottomWidth: 1,
              borderBottomColor: '#E9EDF6',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
          }}></View>
        <CustomButtom1
          text={getLanguage(SCREEN_Product)[0].LabelData.Submit_Button}
          color={Colors.skyBlue}
          onpress={() => {
            // get_services_categorys();
            Get_Service_page();

            // navigation.navigate('MainOver');
            // setImages([]);
            // setistitle('');
            // setisprice('');
            // setisdes('');
            // setcategoty('');
            // setsubcategory('');
            // setlocation('');
          }}
        />
        <RBSheet
          // openDuration={1000}
          // closeDuration={1000}
          ref={refRBSheet}
          customStyles={{
            container: {
              backgroundColor: 'white',
              // borderRadius: 30,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,

              // height: 320,
            },

            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
            draggableIcon: {
              backgroundColor: 'white',
            },
          }}>
          <Text
            style={{
              color: '#202328',
              textAlign: 'center',
              marginTop: 10,
              fontFamily: Fonts.regular,
            }}>
            Add Image From
          </Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              elevation: 2,
            }}>
            <Pressable
              onPress={camara}
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#0048F7',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                elevation: 2,
              }}>
              <Image
                source={Images['phonecamera']}
                style={{width: 36, height: 36}}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontFamily: Fonts.regular,
                }}>
                Camara
              </Text>
            </Pressable>

            <Pressable
              onPress={garlary}
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#0048F7',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                elevation: 2,
              }}>
              <Image
                source={Images['galrary']}
                style={{width: 36, height: 36}}
              />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 13,
                  top: 10,
                  fontFamily: Fonts.regular,
                }}>
                Gallery
              </Text>
            </Pressable>
          </View>
        </RBSheet>
      </View>
    </ScrollView>
  );
};

export default ServicesSelltab;

const styles = StyleSheet.create({
  Dropdown: {
    // flex: 1,
    height: 50,

    width: '32%',
    borderRadius: 5,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingBottom: 0,
    // marginBottom: 6,
  },
  Dropdowm3: {
    // flex: 1,

    flex: 1,
    marginTop: 10,
    borderRadius: 5,
    borderRadius: 5,
    height: 50,
    // width: '50%',
    // marginTop: 10,
    //   borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    paddingHorizontal: 8,
    paddingBottom: 0,
    // marginBottom: 6,
  },
  Dropdown2: {
    // flex: 1,
    height: 50,

    width: '32%',
    marginHorizontal: 8,
    // borderRadius: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingBottom: 0,
    // marginBottom: 6,
  },
  Dropdown1: {
    height: 45,

    // flex: 1,

    // borderRadius: 2,
    color: 'black',
    paddingHorizontal: 8,
    paddingBottom: 8,
    marginBottom: 6,
  },
});
