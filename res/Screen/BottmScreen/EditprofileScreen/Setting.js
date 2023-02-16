import {
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import CutomHeader from '../../../CustomComponet/CutomHeader';
import Images from '../../../CustomData/Images';
import Fonts from '../../../CustomData/Fonts';
import FontSize from '../../../CustomData/FontSize';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {BASE_URl, LABEL_DATA} from '../../../BaseUrl/Baseurl';
import axios from 'axios';
import Indicater from '../../../ActivityIndicator/ActivityIndicator';
import {setSessionFild} from '../../../../Redux/SessionAction';
import {Store} from '../../../../Redux/MainStore';

const Setting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isvible, setisvible] = useState(false);
  const navigation = useNavigation();
  const [checked, setChecked] = useState(1);
  const [isloder, setisloder] = useState(false);

  console.log('checked', checked);
  const PostLangId = async ({checked}) => {
    // setisvible(true);
    setisloder(true);
    axios
      .post(BASE_URl + LABEL_DATA, {
        LangId: 18,
      })
      .then(res => {
        setisloder(false);
        console.log('res', res.data);
        // Store.dispatch(setSessionFild(LABEL_DATA, res.data));
      })
      .catch(err => {
        setisloder(false);
        console.log('err', err);
      });
  };
  if (isloder) {
    return <Indicater />;
  }
  return (
    <View style={{flex: 1, borderStartColor: 'white'}}>
      <CutomHeader headrtitle="Setting" leftIcon={Images['whiteremove']} />

      <View style={{paddingHorizontal: 17}}>
        <View
          style={{
            height: 50,
            // width: '50%',
            // marginTop: 10,
            //   borderWidth: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#E4E4E4',
            marginVertical: 10,
            // paddingVertical: 10,

            // paddingBottom: -70,

            justifyContent: 'space-between',
            flexDirection: 'row',
            //   paddingHorizontal: 15,
            alignItems: 'center',
            // backgroundColor: '#F5F5F5',
            //   borderColor: '#D7DBD1',
          }}>
          <Text
            style={{
              color: '#202328',
              fontFamily: Fonts.semibold,
              fontSize: FontSize.size._16px,
            }}>
            Notification
          </Text>

          <Switch
            trackColor={{false: 'white', true: '#47CDFE'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsEnabled}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 17}}>
        <View
          style={{
            height: 50,
            // width: '50%',
            // marginTop: 10,
            //   borderWidth: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#E4E4E4',
            marginVertical: 10,
            // paddingVertical: 10,

            // paddingBottom: -70,

            justifyContent: 'space-between',
            flexDirection: 'row',
            //   paddingHorizontal: 15,
            alignItems: 'center',
            // backgroundColor: '#F5F5F5',
            //   borderColor: '#D7DBD1',
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('Themeing');
            }}>
            <Text
              style={{
                color: '#202328',
                fontFamily: Fonts.semibold,
                fontSize: FontSize.size._16px,
              }}>
              Change Theme
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{paddingHorizontal: 17}}>
        <View
          style={{
            height: 50,
            // width: '50%',
            // marginTop: 10,
            //   borderWidth: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#E4E4E4',
            marginVertical: 10,
            // paddingVertical: 10,

            // paddingBottom: -70,

            justifyContent: 'space-between',
            flexDirection: 'row',
            //   paddingHorizontal: 15,
            alignItems: 'center',
            // backgroundColor: '#F5F5F5',
            //   borderColor: '#D7DBD1',
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate('ChangeLanuage');
            }}>
            <Text
              style={{
                color: '#202328',
                fontFamily: Fonts.semibold,
                fontSize: FontSize.size._16px,
              }}>
              Change Language
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({});
