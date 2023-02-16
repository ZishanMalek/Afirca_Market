import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../CustomData/Colors';

const Getmessage = ({message, isOwner}) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isOwner ? styles.messageContainerRight : styles.messageContainerLeft,
      ]}>
      <Text style={[styles.text, isOwner ? styles.textRight : styles.textLeft]}>
        {message}
      </Text>
    </View>
  );
};

Getmessage.propTypes = {
  message: PropTypes.string,
  isOwner: PropTypes.bool,
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '80%',
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    flexGrow: 1,
  },
  messageContainerLeft: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    backgroundColor: Colors.blue,
  },
  messageContainerRight: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
    backgroundColor: Colors.ligtGray,
  },
  text: {
    lineHeight: 25,
  },
  textLeft: {
    textAlign: 'left',
    color: 'black',
  },
  textRight: {
    textAlign: 'right',
    color: Colors.skyBlue,
  },
});

export default Getmessage;
