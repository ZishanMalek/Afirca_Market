import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CutomHeader from '../../../CustomComponet/CutomHeader';
import Images from '../../../CustomData/Images';
import {useNavigation} from '@react-navigation/native';
import {Store} from '../../../../Redux/MainStore';
import {setSessionFild} from '../../../../Redux/SessionAction';
import {THEMING_App} from '../../../../Redux/ActionType';
import {useSelector} from 'react-redux';

const Themeing = () => {
  const navigation = useNavigation();

  // const dat = getcolors();
  // console.log('dat', dat);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CutomHeader headrtitle="Change Theme" leftIcon={Images['whiteremove']} />
      <View style={{flexDirection: 'row', marginTop: 40, alignSelf: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BottomTab');
            Store.dispatch(setSessionFild(THEMING_App, 'orange'));
          }}
          style={{
            height: 100,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getcolors() == 'orange' ? 'orange' : 'orange',
            // getcolors('#0048F7') == '#0048F7' ? 'blue' : 'black',
          }}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BottomTab');
            Store.dispatch(setSessionFild(THEMING_App, '#998DA0'));
          }}
          style={{
            marginStart: 20,
            height: 100,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getcolors() == '#998DA0' ? '#998DA0' : '#998DA0',
            // backgroundColor: 'green',
          }}></TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BottomTab');
            Store.dispatch(setSessionFild(THEMING_App, '#0048F7'));
          }}
          style={{
            marginStart: 20,
            height: 100,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getcolors() == '#0048F7' ? '#0048F7' : '#0048F7',
            // backgroundColor: 'green',
          }}></TouchableOpacity>
      </View>
    </View>
  );
};

export default Themeing;

const styles = StyleSheet.create({});

export const getcolors = colors => {
  const colorsdata = useSelector(state => state.session[THEMING_App]);
  return colorsdata;
};

export const BLUE = '#0048F7';
export const Green = 'green';
// const colorsdata = useSelector(state => state.session[THEMING_App]);
