import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Store} from '../../../../Redux/MainStore';
import {setSessionFild} from '../../../../Redux/SessionAction';
import {GETLOCATION} from '../../../../Redux/ActionType';
import Fonts from '../../../CustomData/Fonts';
import FontSize from '../../../CustomData/FontSize';
const GoogleSearchData = () => {
  const mapstyle = [
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          hue: '#47CDFE',
        },
        {
          saturation: -11,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          saturation: -78,
        },
        {
          hue: '#47CDFE',
        },
        {
          lightness: -47,
        },
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          hue: '#47CDFE',
        },
        {
          saturation: -79,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'all',
      stylers: [
        {
          lightness: 30,
        },
        {
          weight: 1.3,
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
        {
          hue: '#47CDFE',
        },
        {
          saturation: -16,
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'all',
      stylers: [
        {
          saturation: -72,
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          saturation: -65,
        },
        {
          hue: '#47CDFE',
        },
        {
          lightness: 8,
        },
      ],
    },
  ];
  const route = useRoute();
  console.log('route---->', route);
  const navigation = useNavigation();
  const [des, setdes] = useState('');

  console.log(des);
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);
  React.useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      console.log('Position', position);
      // clg
      const {latitude, longitude} = position.coords;
      console.log('latitude', latitude);
      console.log('longitude', longitude);

      setlat(latitude);
      setlong(longitude);
      // Store.dispatch(setSessionFild(Location, {latitude, longitude}));
    });
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            textInputProps={{
              placeholder: 'Enter Location',
              placeholderTextColor: '#A9AEB5',
              style: {
                fontFamily: Fonts.regular,
                fontSize: FontSize.size._15px,
                color: 'black',
              },
            }}
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log('data', details.address_components[0].long_name);
              setlat(details.geometry.location.lat);
              setlong(details.geometry.location.lng);
              setdes(details.address_components[0].long_name);
            }}
            query={{
              key: 'AIzaSyDJn3lkmc1GoVe1YMv0ZBzpUnLPlKnAeNQ',
              language: 'en',
            }}
            styles={{
              container: {
                flex: 0,
                position: 'absolute',
                // paddingHorizontal: 10,
                top: 10,
                // right: 10,

                left: 10,
                width: '100%',
                zIndex: 2,
              },
              textInputContainer: {
                borderBottomWidth: 1,
                borderBottomColor: '#E4E4E4',
                width: '100%',
                backgroundColor: 'white',
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
        </View>
        <MapView
          customMapStyle={mapstyle}
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            onPress={() => {
              // alert(des);
              navigation.navigate('BottomTab', {
                des: des,
              });
              Store.dispatch(setSessionFild(GETLOCATION, des));
            }}
            title={des}
            coordinate={{
              latitude: lat,
              longitude: long,
            }}></Marker>
        </MapView>
      </View>
    </>
  );
};

export default GoogleSearchData;

const styles = StyleSheet.create({
  container1: {
    height: 400,
    width: 400,
    justifyContent: 'center',
    // marginTop: des,
    alignItems: 'center',
  },
  map: {
    // height: '100%',
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: 44,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
  },
  poweredContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#c8c7cc',
    borderTopWidth: 0.5,
  },
  powered: {},
  listView: {},
  row: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    height: 44,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {},
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
});
