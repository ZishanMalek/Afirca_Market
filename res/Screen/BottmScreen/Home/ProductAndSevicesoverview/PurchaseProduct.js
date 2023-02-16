import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CutomHeader from '../../../../CustomComponet/CutomHeader';
import Images from '../../../../CustomData/Images';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import {productHorzotaldtaGet} from '../../../../CustomComponet/ProductScreen';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const PurchaseProduct = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('BottomTab');
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CutomHeader
        headrtitle="Purchased Products"
        leftIcon={Images['whiteremove']}
      />

      <FlatList
        data={productHorzotaldtaGet}
        renderItem={({item}) => {
          return (
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 14,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#E5E5E5',
                paddingBottom: 13,
              }}>
              <Image
                source={item.image}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 4,
                }}
              />

              <View style={{marginStart: 10}}>
                <Text
                  style={{
                    color: '#202328',
                    fontFamily: Fonts.regular,
                    fontSize: FontSize.size._14px,
                  }}>
                  {item.title}
                  {'\n'}
                  <Text
                    style={{
                      fontFamily: Fonts.bold,
                      color: '#202328',
                      fontSize: FontSize.size._15px,
                    }}>
                    {item.price}
                  </Text>
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PurchaseProduct;

const styles = StyleSheet.create({});
