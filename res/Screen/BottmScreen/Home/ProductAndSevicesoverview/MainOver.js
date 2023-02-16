import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CutomHeader from '../../../../CustomComponet/CutomHeader';
import Images from '../../../../CustomData/Images';
import Colors from '../../../../CustomData/Colors';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import ProductOverview from './ProductOverview';
import ServiesOverView from './ServiesOverView';
const HEIGHT = Dimensions.get('window').height;
const MainOver = () => {
  const [iscolor, setiscolor] = useState(true);
  return (
    <ScrollView
      style={{height: '100%', backgroundColor: 'white'}}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <View
        style={{
          height: HEIGHT * 0.15,
          backgroundColor: '#0048F7',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CutomHeader
          headrtitle={iscolor ? 'My Products Overview' : 'My Services Overview'}
          leftIcon={Images['whiteremove']}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '100%',
            // justifyContent: 'center',
            height: 60,
            // marginTop: -10,
            // backgroundColor: 'red',
          }}>
          <Pressable
            onPress={() => {
              setiscolor(true);
            }}
            style={{
              width: '50%',
              backgroundColor: iscolor ? '#0033AF' : '#0048F7',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.bold,
                // color: Colors.skyBlue,
                color: 'white',
                opacity: iscolor ? 0.5 : 1,
                fontSize: FontSize.size._16px,
              }}>
              Product
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setiscolor(false);
            }}
            style={{
              width: '50%',
              backgroundColor: iscolor ? '#0048F7' : '#0033AF',

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.bold,
                // color: Colors.skyBlue,
                color: Colors.white,
                opacity: iscolor ? 1 : 0.5,

                fontSize: FontSize.size._16px,
              }}>
              Services
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        {iscolor ? <ProductOverview /> : <ServiesOverView />}
      </View>
    </ScrollView>
  );
};

export default MainOver;

const styles = StyleSheet.create({});
