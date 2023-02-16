import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Images from '../CustomData/Images';
import FontSize from '../CustomData/FontSize';
import Fonts from '../CustomData/Fonts';

const ServicesData = ({data}) => {
  console.log('data', data.price);
  return (
    <View style={{width: 323, height: 162, marginHorizontal: 3, marginTop: 2}}>
      <Image source={data.image} style={{width: 323, height: 161}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 6,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: Fonts.bold,
            color: '#202328',
            fontSize: FontSize.size._14px,
          }}>
          {data.title}
        </Text>
        <Image
          source={data.eye}
          style={{
            width: 24,

            marginStart: 60,
            height: 20,
          }}
        />
        <Image
          source={data.heart}
          style={{
            width: 24,

            height: 20,
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: Fonts.bold,
          color: '#202328',
          fontSize: FontSize.size._14px,
        }}>
        {data.price}
      </Text>
    </View>
  );
};

export const ServicesDataGet = () => {
  return (
    <FlatList
      data={ServidataGet}
      // keyExtractor={item => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => <ServicesData data={item} />}
    />
  );
};

export default ServicesData;

const styles = StyleSheet.create({});
