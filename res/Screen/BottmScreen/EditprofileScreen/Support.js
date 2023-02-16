import {
  Image,
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
import Colors, {HEIGHTGet} from '../../../CustomData/Colors';
import FontSize from '../../../CustomData/FontSize';
import CustomButtom from '../../../CustomComponet/CustomButtom';
import {useNavigation} from '@react-navigation/native';
import {
  getLanguage,
  SCREEN_Seller_Profile,
  SCREEN_Support,
} from '../../../../LanguageTest';

const Support = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 10}}>
      <SafeAreaView>
        <ScrollView>
          <CutomHeader
            headrtitle={getLanguage(SCREEN_Support)[0].LabelData.Support_Title}
            leftIcon={Images['whiteremove']}
          />
          <View style={{marginTop: 38, width: '100%', alignItems: 'center'}}>
            <Image
              source={Images['get']}
              style={{
                width: 287,
                height: 206,
              }}
            />

            <Text
              style={{
                fontFamily: Fonts.bold,
                marginTop: 13,
                color: '#202328',
                fontSize: FontSize.size._22px,
              }}>
              {getLanguage(SCREEN_Support)[0].LabelData.Tag_Line}{' '}
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 16,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.semibold,
                color: '#202328',
                marginStart: 5,
                fontSize: FontSize.size._15px,
              }}>
              {getLanguage(SCREEN_Support)[0].LabelData.Subject_Title}{' '}
            </Text>

            <TextInput
              style={{
                borderBottomColor: '#E4E4E4',
                borderBottomWidth: 1,
                color: 'black',
              }}
              placeholder={
                getLanguage(SCREEN_Support)[0].LabelData.Subject_Placeholder
              }
              placeholderTextColor={'#A9AEB5'}
            />

            <View style={{marginVertical: 30}}>
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  color: '#202328',
                  marginStart: 5,
                  fontSize: FontSize.size._15px,
                }}>
                {getLanguage(SCREEN_Support)[0].LabelData.Message_Title}{' '}
              </Text>

              <TextInput
                multiline={true}
                maxLength={100}
                style={{
                  borderBottomColor: '#E4E4E4',
                  borderBottomWidth: 1,
                  color: 'black',
                }}
                placeholder={
                  getLanguage(SCREEN_Support)[0].LabelData.Message_Placeholder
                }
                placeholderTextColor={'#A9AEB5'}
              />
            </View>
            <View style={{marginTop: HEIGHTGet * 0.19}}>
              <CustomButtom
                text={getLanguage(SCREEN_Support)[0].LabelData.Submit_Button}
                onpress={() => navigation.navigate('BottomTab')}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({});
