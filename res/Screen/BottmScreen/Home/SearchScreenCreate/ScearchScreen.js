import {
  Dimensions,
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
import {CustomSearch} from '../../../../CustomComponet/CustomSearch';
import Images from '../../../../CustomData/Images';
import Colors from '../../../../CustomData/Colors';
import Fonts from '../../../../CustomData/Fonts';
import FontSize from '../../../../CustomData/FontSize';
import {
  productHorzotaldtaGet,
  Produdata,
} from '../../../../CustomComponet/ProductScreen';
import {ServiecsAllGetDataFeach} from '../../../../Flatlistdata/prodctScreenData/TravelData';
import {ProductCategroisData} from '../AllCategorysub/ServicesCategoris';
import {
  ServicesGetDataAll,
  ServidataGet,
} from '../../../../CustomComponet/ServicesScreen';
import {useNavigation} from '@react-navigation/native';
import {LABEL_DATA} from '../../../../BaseUrl/Baseurl';
import {useSelector} from 'react-redux';
import {getLanguage, SCREEN_Search} from '../../../../../LanguageTest';

const HEIAGHT = Dimensions.get('window').height;

const ScearchScreen = () => {
  const [isdata, setIsdata] = useState(false);
  console.log('isdata', isdata);

  const [data, setData] = useState([]);
  // // console.log('data', data);
  const Addvale = () => {
    if (data.length < 6) {
      setData([...data, isdata]);
    }
  };
  const navigation = useNavigation();
  const session = useSelector(state => state.session);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              // width: '100%',
              backgroundColor: '#0048F7',
              // height: HEIAGHT * 0.1,
              paddingHorizontal: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // justifyContent: 'space-around',
                // paddingHorizontal: 10,
                justifyContent: 'center',

                flex: 1,

                marginTop: HEIAGHT * 0.01,
              }}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={Images['whiteremove']}
                  style={{width: 17, height: 17, marginEnd: 10}}
                />
              </Pressable>
              <View style={{marginTop: 7, flex: 1}}>
                <CustomSearch
                  leftIcon={Images['Search']}
                  onpressLeft={() => {
                    Addvale();
                  }}
                  value={isdata}
                  onChangeText={setIsdata}
                  placeHolder={
                    getLanguage(SCREEN_Search)[0].LabelData.Search_Area
                  }
                  onPress={() => setIsdata('')}
                  rightIcon={isdata?.length > 0 ? Images['close'] : null}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingHorizontal: 15,
              marginTop: 15,
            }}>
            <Text
              style={{
                fontFamily: Fonts.bold,
                color: Colors.gray,
                fontSize: FontSize.size._18px,
              }}>
              {getLanguage(SCREEN_Search)[0].LabelData.Recent_search}
            </Text>

            <View>
              <FlatList
                data={data}
                numColumns={3}
                renderItem={({item}) => {
                  console.log('item', item);
                  {
                    return (
                      <View
                        style={{
                          marginHorizontal: 4,
                          marginVertical: 10,
                          flexGrow: 1,
                          // width: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#F5F5F5',
                        }}>
                        <Text
                          style={{
                            color: Colors.gray,
                            fontFamily: Fonts.medium,
                            height: 40,
                            padding: 10,
                            // alignItems: 'center',
                            // borderRadius: 4,
                            // backgroundColor: '#F5F5F5',
                          }}>
                          {item}
                        </Text>
                      </View>
                    );
                  }
                }}
              />
            </View>

            <Text
              style={{
                fontFamily: Fonts.bold,
                color: Colors.gray,
                marginTop: 20,
                fontSize: FontSize.size._18px,
              }}>
              {getLanguage(SCREEN_Search)[0].LabelData.Recommended_Products}{' '}
            </Text>
            <View>
              <FlatList
                data={productHorzotaldtaGet}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        height: '100%',
                        // borderWidth: 1,
                        // width: ,
                        marginHorizontal: 4,
                        // backgroundColor: '#CED0CE',
                      }}
                    />
                  );
                }}
                // renderItem={({item}) => <Produdata data={item} />}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <Text
              style={{
                fontFamily: Fonts.bold,
                color: Colors.gray,
                marginTop: 20,
                fontSize: FontSize.size._18px,
              }}>
              {getLanguage(SCREEN_Search)[0].LabelData.Recommended_Service}
            </Text>

            <View>
              <FlatList
                data={ServidataGet}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // renderItem={({item}) => <ServicesGetDataAll data={item} />}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ScearchScreen;

const styles = StyleSheet.create({});
