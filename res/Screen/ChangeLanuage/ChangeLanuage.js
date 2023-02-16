import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {LANGUAGE_LABEL_DATA} from '../../../Redux/ActionType';
import {Store} from '../../../Redux/MainStore';
import {setSessionFild} from '../../../Redux/SessionAction';
import Indicater from '../../ActivityIndicator/ActivityIndicator';
import {BASE_URl, LABEL_DATA} from '../../BaseUrl/Baseurl';
import CustomButtom from '../../CustomComponet/CustomButtom';
import CutomHeader from '../../CustomComponet/CutomHeader';
import Colors from '../../CustomData/Colors';
import Fonts from '../../CustomData/Fonts';
import Images from '../../CustomData/Images';

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
const getvalue = data[1].label;
console.log('getvalue', getvalue);
const ChangeLanuage = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(data[1].label);
  const [isFocus, setIsFocus] = useState(false);
  const [isloder, setisloder] = useState(false);

  const PostLangId = async () => {
    setisloder(true);
    axios
      .post(BASE_URl + LABEL_DATA, {
        LangId: value,
      })
      .then(res => res.data)
      .then(res => {
        {
          setisloder(false);
          console.log('res', res.data.LabelData);
          Store.dispatch(
            setSessionFild(LANGUAGE_LABEL_DATA, res.data.LabelData),
            navigation.navigate('BottomTab'),
          );
        }
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CutomHeader headrtitle="Language" leftIcon={Images['whiteremove']} />

      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          containerStyle={{
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginTop: 20,
            paddingHorizontal: 10,
          }}
          itemContainerStyle={{
            // backgroundColor: Colors.black,
            borderRadius: 10,
            marginTop: 20,
            paddingHorizontal: 10,
          }}
          itemTextStyle={{
            color: Colors.gray,
            fontFamily: Fonts.bold,
            fontSize: 16,
          }}
          maxHeight={300}
          labelField="label"
          // onFocus={PostLangId}
          valueField="value"
          placeholder="Select Langeuage"
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
        <CustomButtom onpress={PostLangId} text="Change Language" />
      </View>
    </View>
  );
};

export default ChangeLanuage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
    borderWidth: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',

    padding: 20,
    color: 'black',
    backgroundColor: Colors.skyBlue,
    borderWidth: 0.5,
    borderRadius: 8,
    // paddingHorizontal: 30,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'red',
    // borderWidth: 1,
    paddingHorizontal: 8,
    color: 'red',
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
    fontFamily: Fonts.bold,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    color: 'black',
    height: 40,
    fontSize: 16,
  },
});
