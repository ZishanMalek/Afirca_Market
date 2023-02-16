import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {LANGUAGE_LABEL_DATA} from './Redux/ActionType';
import axios from 'axios';
import {BASE_URl, LABEL_DATA} from './res/BaseUrl/Baseurl';
import {Store} from './Redux/MainStore';
import {setSessionFild} from './Redux/SessionAction';
import {useEffect} from 'react';
import {useState} from 'react';
import {set} from 'lodash';

const LanguageTest = () => {
  const session = useSelector(state => state.session);
  const languageData = session[LANGUAGE_LABEL_DATA];
  console.log('languageData', languageData);
  const [labelData, setLabelData] = React.useState({});
  const [password, setpassword] = useState('');
  const [oldpassword, setoldpassword] = useState('');
  const [login, setlogin] = useState('');
  console.log('olpassword----', oldpassword);
  console.log(login, 'Login');
  console.log('passwrod', password);
  //   const userLanguage = languageData.filter(
  //     (item, id) => item.ModuleName === 'Change_Password',
  //   );

  //   const dashboard = languageData.filter(
  //     (item, id) => item.ModuleName === 'Dashboard',
  //   );

  // useEffect(() => {
  //   PostLangId();
  // }, []);

  // const PostLangId = async () => {
  //   axios
  //     .post(BASE_URl + LABEL_DATA, {
  //       LangId: 18,
  //     })
  //     .then(res => res.data)
  //     .then(res => {
  //       {
  //         console.log('res', res.data.LabelData);
  //         Store.dispatch(
  //           setSessionFild(LANGUAGE_LABEL_DATA, res.data.LabelData),
  //         );
  //       }
  //     })
  //     .catch(err => {
  //       console.log('err', err);
  //     });
  // };

  console.log(
    'languageData---------------  ',
    getLanguage('Change_Password'),
    // userLanguage[0].LabelData.Confirm_Password,
  );
  return (
    <View>
      {/* <Text>{userLanguage[0].LabelData.Confirm_Password}</Text> */}
      <Text>{getLanguage('Dashboard')[0].LabelData.Sell_All_Button}</Text>
    </View>
  );
};

export default LanguageTest;

export const getLanguage = screenName => {
  const LanguageData = useSelector(state => state.session[LANGUAGE_LABEL_DATA]);
  return LanguageData.filter((item, id) => item.ModuleName === screenName);
};

export const SCREEN_CHANGE_PASSWORD = 'Change_Password';
export const SCREEN_Dashboard = 'Dashboard';
export const SCREEN_Login = 'Login';
export const SCREEN_Menu = 'Menu';
export const SCREEN_Pay_Now = 'Pay_Now';
export const SCREEN_Product = 'Product';
export const SCREEN_Profile = 'Profile';
export const SCREEN_Register = 'Register';

export const SCREEN_Search = 'Search';
export const SCREEN_Seller_Profile = 'Seller_Profile';
export const SCREEN_Service = 'Service';
export const SCREEN_Support = 'Support';

const styles = StyleSheet.create({});
