import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CutomHeader from '../../../CustomComponet/CutomHeader';
import Images from '../../../CustomData/Images';
import Fonts from '../../../CustomData/Fonts';
import FontSize from '../../../CustomData/FontSize';
import Colors from '../../../CustomData/Colors';
import {Custominput} from '../../../CustomComponet/Custominput';
import CustomButtom from '../../../CustomComponet/CustomButtom';
import {useNavigation} from '@react-navigation/native';
import {getLanguage, SCREEN_CHANGE_PASSWORD} from '../../../../LanguageTest';
import {useSelector} from 'react-redux';
import {USERS_Data, USERS_DATAS} from '../../../../Redux/ActionType';
import {BASE_URl, CHANGE_PASSWORD_API} from '../../../BaseUrl/Baseurl';
import {useState} from 'react';
import Toast from 'react-native-toast-message';

import axios from 'axios';
import CustomLoader from '../../../ActivityIndicator/CustomLoader';
const HEIGHT = Dimensions.get('window').height;
const ChangePassword = () => {
  const navigation = useNavigation();
  const session = useSelector(state => state.session);
  const Token = session[USERS_DATAS];
  console.log('Token', Token.Token);

  const [isloder, setisloder] = useState(false);
  const [OldPassword, setOldPassword] = useState('');
  const [isviable, setisviable] = useState(false);
  const [isviable1, setisviable1] = useState(false);

  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  async function ChangePassword() {
    setisloder(true);
    // let data = {OldPassword, NewPassword, ConfirmPassword};

    axios({
      method: 'POST',
      url: BASE_URl + CHANGE_PASSWORD_API,

      data: {
        OldPassword: OldPassword.trim(),
        NewPassword: NewPassword.trim(),
        ConfirmPassword: ConfirmPassword.trim(),
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Token.Token,
      },
    })
      .then(res => res.data)
      .then(res => {
        setisloder(false);

        {
          console.log('res', res.data);
          console.log(res);
          Toast.show({
            type: 'success',
            text1: 'success',
            topOffset: 0,
            visibilityTime: 1200,
            text2: res.message,
          });

          if (res.status == 'true') {
            navigation.navigate('BottomTab');
          }
        }
      })
      .catch(err => {
        setisloder(false);

        console.log('err', err.response.data.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          topOffset: 0,
          visibilityTime: 1200,
          text2: err.response.data.message,
        });
      });
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <ScrollView>
          <Toast />
          <CustomLoader visible={isloder} />
          <View
            style={{
              height: HEIGHT * 0.2,
              //   paddingHorizontal: 16,
              // marginTop: 40,
              zIndex: -1,
              width: '100%',
              backgroundColor: '#0048F7',
            }}>
            <View style={{marginTop: 0}}>
              <CutomHeader
                headrtitle={
                  getLanguage(SCREEN_CHANGE_PASSWORD)[0].LabelData.Page_Title
                }
                leftIcon={Images['whiteremove']}
              />
            </View>
            <Image
              source={Images['chagepassword']}
              style={{
                width: 137,
                height: 137,
                zIndex: 1,
                alignSelf: 'center',
                // bottom: 80,
                // marginBottom: 60,
                // bottom: ,
              }}
            />
          </View>

          <View
            style={{
              //   alignItems: 'center',

              marginTop: 50,
              // width: '100%',

              // borderWidth: 1,
            }}>
            <View style={{paddingHorizontal: 33}}>
              <Custominput
                value={OldPassword}
                // onChangeText={text => setOldPassword(text)}
                secureTextEntry={isviable}
                onRightIconPress={() => {
                  setisviable(!isviable);
                }}
                onchagentext={text => setOldPassword(text)}
                placeHolder={
                  getLanguage(SCREEN_CHANGE_PASSWORD)[0].LabelData.Old_Password
                }
                leftIcon={Images['Lock']}
                rightIcon={Images['eye_open']}
              />
              <Custominput
                secureTextEntry={isviable1}
                onRightIconPress={() => {
                  setisviable1(!isviable1);
                }}
                value={NewPassword}
                onchagentext={text => setNewPassword(text)}
                placeHolder={
                  getLanguage(SCREEN_CHANGE_PASSWORD)[0].LabelData.New_Password
                }
                leftIcon={Images['Lock']}
                rightIcon={Images['eye_open']}
              />
              <Custominput
                value={ConfirmPassword}
                onchagentext={text => setConfirmPassword(text)}
                placeHolder={
                  getLanguage(SCREEN_CHANGE_PASSWORD)[0].LabelData
                    .Confirm_Password
                }
                leftIcon={Images['Lock']}
              />

              <CustomButtom
                text={
                  getLanguage(SCREEN_CHANGE_PASSWORD)[0].LabelData
                    .Confirm_Password_Button
                }
                onpress={() => ChangePassword()}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
