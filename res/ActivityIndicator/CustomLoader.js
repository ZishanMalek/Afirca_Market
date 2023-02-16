import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../CustomData/Colors';
import {UIActivityIndicator} from 'react-native-indicators';

const CustomLoader = ({visible}) => {
  return (
    <Modal transparent visible={visible}>
      <StatusBar backgroundColor={'#00000099'} />
      <View
        style={{
          backgroundColor: '#00000099',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            elevation: 10,
            padding: 10,
          }}>
          <ActivityIndicator
            size={'large'}
            color={'black'}
            style={{
              elevation: 40,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({});

export const Imageloder = ({visible}) => {
  return (
    <Modal
      transparent
      visible={visible}
      style={{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={'#00000099'} />
      <View
        style={{
          backgroundColor: '#00000099',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          height: 50,
          width: 50,
        }}>
        <View
          style={{
            backgroundColor: 'red',
            borderRadius: 10,
            padding: 20,
          }}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      </View>
    </Modal>
  );
};
