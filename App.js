import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  LogBox,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Pstore, Store} from './Redux/MainStore';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {IntroScreen, Login, Register} from './res/Screen/Index';
import RootNavigation from './res/Navigation/RootNavigation';
import {useSelector} from 'react-redux';
import Colors from './res/CustomData/Colors';
import LanguageTest from './LanguageTest';
const Stack = createStackNavigator();

const App = () => {
  const [isdata, setisdata] = useState(true);
  const [intialScreen, setIntialScreen] = useState(<IntroScreen />);
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {}
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Pstore}>
        <StatusBar backgroundColor={Colors.blue} />
        <RootNavigation />
        {/* <LanguageTest /> */}
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
