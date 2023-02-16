import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import CutomHeader from '../../../CustomComponet/CutomHeader';
import Images from '../../../CustomData/Images';
import Fonts from '../../../CustomData/Fonts';
import FontSize from '../../../CustomData/FontSize';
import CutomEditProfileInput from '../../../CustomComponet/CutomEditProfileInput';
import CutomInputEdit from './CutomInputEdit';
import CustomButtom from '../../../CustomComponet/CustomButtom';
import RBSheet from 'react-native-raw-bottom-sheet';

import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const EditProfileScreen = () => {
  const [images, setimages] = useState('');
  console.log('images', images);

  const refRBSheet = React.useRef();
  const camara = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      refRBSheet.current.close();
      console.log(image);
      setimages(image.path);
    });
  };

  const garlary = () => {
    // Alert.alert('k');
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      refRBSheet.current.close();
      console.log(image);
      setimages(image.path);
    });
  };
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 10}}>
      <SafeAreaView>
        <ScrollView>
          <CutomHeader
            headrtitle="Edit Profile"
            leftIcon={Images['whiteremove']}
          />
          <View style={{paddingHorizontal: 16}}>
            <Pressable
              onPress={() => refRBSheet.current.open()}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                // width: '50%',
                marginTop: 30,
                width: 127,
                height: 127,
              }}>
              <Image
                source={images ? null : Images['camara']}
                style={{
                  width: 38,
                  height: 38,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  zIndex: 1,
                }}
              />
              <Image
                source={images ? {uri: images} : Images['default']}
                resizeMode="contain"
                style={{
                  zIndex: -1,
                  width: 126,
                  height: 126,
                  marginTop: 20,
                  borderRadius: 126 / 2,
                }}
              />
            </Pressable>

            <View style={{marginTop: 55}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View style={{width: '48%'}}>
                  <CutomInputEdit
                    text="First Name"
                    placeholder="Enter First Name"
                  />
                </View>
                <View style={{width: '48%'}}>
                  <CutomInputEdit
                    text="Last Name"
                    placeholder="Enter Last Name"
                  />
                </View>
              </View>
              <CutomInputEdit
                text="Mobile"
                placeholder="Mobile No"
                keyboardType="Numeric"
              />

              <CutomInputEdit
                text="Email"
                placeholder="Enter The Email"
                keyboardType="email-address"
              />
              <CutomInputEdit
                text="Date Of Birth"
                placeholder="Enter Birth Date"
                keyboardType="date"
              />
              <CutomInputEdit
                text="Adress"
                placeholder="1137 Zape Point, Ab Road, Texas, USA"
                keyboardType="date"
              />
              <CustomButtom
                text="Save"
                onpress={() => navigation.navigate('BottomTab')}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
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
            <Image source={Images['galrary']} style={{width: 36, height: 36}} />
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
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
