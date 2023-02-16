import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import Images from '../CustomData/Images';
import Colors from '../CustomData/Colors';
import BorderView from './ExportData/BorderView';
import Message from './ExportData/Message';
import Getmessage from './Getmessage';

const MessageInput = ({onPressSend}) => {
  const [message, setMessage] = useState('');

  const changeTextHandler = value => {
    setMessage(value);
  };

  const submitMessageHandler = () => {
    if (message) {
      // return value
      onPressSend(message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <BorderView style={styles.messageInputContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={message}
            style={{
              color: 'black',
            }}
            placeholder="Type Message"
            onChangeText={changeTextHandler}
            onSubmitEditing={submitMessageHandler}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={submitMessageHandler}>
          <Image
            source={Images['send']}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
      </BorderView>
    </KeyboardAvoidingView>
  );
};

MessageInput.propTypes = {
  onPressSend: PropTypes.func,
};

const styles = StyleSheet.create({
  messageInputContainer: {
    flexDirection: 'row',
    width: '100%',

    height: 50,
    marginBottom: 15,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  textInputContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: Colors.blue,
    padding: 10,
    borderRadius: 25,
  },
});

export default MessageInput;
