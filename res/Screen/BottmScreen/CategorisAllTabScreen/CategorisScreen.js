import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import Images from '../../../../CustomData/Images';
import Colors from '../../../../CustomData/Colors';
import Fonts from '../CategorisAllTabScreen/../';
import FontSize from '../../../../CustomData/FontSize';
import {TraveldataList} from '../../../../Flatlistdata/prodctScreenData/TravelData';
import CutomHeader from '../../../../CustomComponet/CutomHeader';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

const HEIAGHT = Dimensions.get('window').height;
const ProductCategroisData = ({data, route}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',

        flex: 1,
        // borderWidth: 1,
        // marginTop: 20,
        // marginVertical: 20,
        // marginHorizontal: 20,
      }}>
      <Pressable
        onPress={() => {
          navigation.navigate('ProuductSubCategoris', {data: data});
        }}
        style={{
          backgroundColor: '#F5FAFB',
          width: 85,
          height: 85,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
        }}>
        <Image source={data.image} style={{width: 39.11, height: 40.94}} />
      </Pressable>
      <Text
        style={{
          color: '#202328',
          marginTop: 10,
          textAlign: 'center',
          fontFamily: Fonts.regular,
          fontSize: FontSize.size._13px,
        }}>
        {' '}
        {data.title}
      </Text>
    </View>
  );
};
const CategorisScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <FlatList
          data={TraveldataList}
          renderItem={({item}) => <ProductCategroisData data={item} />}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default CategorisScreen;

const styles = StyleSheet.create({});
