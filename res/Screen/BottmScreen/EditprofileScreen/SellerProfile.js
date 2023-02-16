import {
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
import CutomHeader from '../../../CustomComponet/CutomHeader';
import Images from '../../../CustomData/Images';
import FontSize from '../../../CustomData/FontSize';
import Fonts from '../../../CustomData/Fonts';
import Colors from '../../../CustomData/Colors';
import {
  productHorzotaldtaGet,
  Produdata,
  ProdudataNearYor,
} from '../../../CustomComponet/ProductScreen';
import {ProductNerarYourdata} from '../../../Flatlistdata/prodctScreenData/ProductNerarYourdata';
import {getLanguage, SCREEN_Seller_Profile} from '../../../../LanguageTest';

const SellerProfile = () => {
  const [iscolor, setiscolor] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        // paddingHorizontal: 16,
        // borderWidth: 1,
      }}>
      <SafeAreaView>
        <ScrollView>
          <CutomHeader
            headrtitle={
              getLanguage(SCREEN_Seller_Profile)[0].LabelData.Page_Title
            }
            leftIcon={Images['whiteremove']}
          />
          <View>
            <Image
              source={Images['profile']}
              style={{
                width: 127,
                height: 127,
                borderRadius: 127 / 2,
                alignSelf: 'center',
                marginTop: 30,
              }}
            />

            <Text
              style={{
                fontSize: FontSize.size._23px,
                fontFamily: Fonts['bold'],
                alignSelf: 'center',
                color: Colors['gray'],
                marginTop: 10,
              }}>
              Richard Martinez
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={Images['place']}
                style={{width: 24, height: 24}}
                resizeMode="cover"
              />
              <Text
                style={{
                  fontSize: FontSize.size._16px,
                  fontFamily: Fonts['regular'],
                  alignSelf: 'center',
                  color: Colors['gray'],
                  marginLeft: 5,
                }}>
                Los Angeles, CA, USA
              </Text>
            </View>

            <View style={{paddingHorizontal: 16}}>
              <Text
                style={{
                  fontSize: FontSize.size._17px,
                  fontFamily: Fonts['bold'],

                  // alignSelf: 'center',
                  color: Colors['gray'],

                  marginTop: 10,
                }}>
                {getLanguage(SCREEN_Seller_Profile)[0].LabelData.About} Richard
              </Text>

              <Text
                style={{
                  fontSize: FontSize.size._14px,
                  fontFamily: Fonts['regular'],
                  // alignSelf: 'center',
                  color: '#202328',
                  textAlign: 'justify',
                  marginTop: 10,
                }}>
                Fusce id ante vitae magna semper congue. Praesent aliquam mattis
                risus iaculis consectetur. Nullam vitae efficitur ex, et cursus
                nunc.
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: '100%',
                // justifyContent: 'center',
                // height: HEIGHTGet * 0.068,
                // height: hp('6%'),
                height: 55,
                // marginTop: -10,
                // backgroundColor: 'red',
              }}>
              <Pressable
                onPress={() => {
                  setiscolor(true);
                }}
                style={{
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottomWidth: 1,
                  borderBottomColor: iscolor ? '#47CDFE' : '#E5E5E5',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.bold,

                    // color: Colors.skyBlue,
                    color: iscolor ? '#47CDFE' : '#202328',
                    // opacity: iscolor ? 0.5 : 1,
                    fontSize: FontSize.size._16px,
                  }}>
                  {getLanguage(SCREEN_Seller_Profile)[0].LabelData.Products}{' '}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setiscolor(false);
                }}
                style={{
                  width: '50%',
                  borderBottomColor: iscolor ? '#E5E5E5' : '#47CDFE',
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    // color: Colors.skyBlue,
                    color: iscolor ? '#202328' : '#47CDFE',

                    fontSize: FontSize.size._16px,
                  }}>
                  {getLanguage(SCREEN_Seller_Profile)[0].LabelData.Services}{' '}
                </Text>
              </Pressable>
            </View>
            <FlatList
              data={ProductNerarYourdata}
              // contentContainerStyle={{marginHorizontal}}
              columnWrapperStyle={{justifyContent: 'space-around'}}
              numColumns={2}
              renderItem={({item}) => <ProdudataNearYor data={item} />}
              keyExtractor={item => item.id}
              // removeClippedSubviews={false}
              vertical={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SellerProfile;

const styles = StyleSheet.create({});
