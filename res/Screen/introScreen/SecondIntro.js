import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {UtilsStyles} from '../../CustomData/Utils';
import Colors from '../../CustomData/Colors';
import Images from '../../CustomData/Images';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import axios from 'axios';
import {BASE_URl, LABEL_DATA} from '../../BaseUrl/Baseurl';
import {setSessionFild} from '../../../Redux/SessionAction';
import {Store} from '../../../Redux/MainStore';
import {useSelector} from 'react-redux';
import {
  ENGLISH_LABEL_DATA,
  LANGUAGE_LABEL_DATA,
  LOGIN,
  ONLY_ENGLISTH_DATA,
} from '../../../Redux/ActionType';
import {useState} from 'react';
import {Login} from '../Index';

const SecondIntro = ({}) => {
  const navigation = useNavigation();
  const session = useSelector(state => state.session);
  const LableData = session[ENGLISH_LABEL_DATA];

  //   const Lang_Id = data1.data.LanguageData.lang_id;

  // console.log('LableData', LableData);
  const data = [
    {label: 'English', value: '1'},
    {label: 'Garman', value: '18'},
    {label: 'French', value: '17'},
    {label: 'Spanish', value: '16'},
    {label: 'Portuguese', value: '19'},
    {label: 'Mandarin', value: '20'},
    {label: 'Arabic', value: '21'},
    {label: 'Swahili', value: '22'},
    {label: 'Hindi', value: '23'},

    {label: 'Russian', value: '24'},

    {label: 'Japanese', value: '26'},
    {label: ' Indonesian', value: '27'},
  ];

  const Id = 1;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, []);
  const onpressbuton = () => {
    setCount(count + 1);
  };

  // const PostLangId = async () => {
  //   axios
  //     .post(BASE_URl + LABEL_DATA, {
  //       LangId: 1,
  //     })
  //     .then(res => res.data)
  //     .then(res => {
  //       {
  //         console.log('res', res.data.LabelData);
  //         Store.dispatch(
  //           setSessionFild(LANGUAGE_LABEL_DATA, res.data.LabelData),
  //           navigation.navigate('BottomTab'),
  //         );
  //       }
  //     })
  //     .catch(err => {
  //       console.log('err', err);
  //     });
  // };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
      }}>
      <SafeAreaView>
        <StatusBar backgroundColor={'black'} />

        <Image source={Images['intro']} style={{width: 220, height: 210}} />
      </SafeAreaView>
    </View>
  );
};

export default SecondIntro;

const styles = StyleSheet.create({});
