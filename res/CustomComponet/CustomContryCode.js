import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useState} from 'react';

const CustomContryCode = ({isviable}) => {
  const [isflase, setModalVisible] = useState(true);
  return (
    <View>
      <Modal visible={isviable}>
        <Pressable style={{backgroundColor: 'white'}} />
      </Modal>
    </View>
  );
};

export default CustomContryCode;

const styles = StyleSheet.create({});
