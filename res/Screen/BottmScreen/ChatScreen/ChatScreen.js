// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import firestore from '@react-native-firebase/firestore';
// import {useEffect} from 'react';
// import {GiftedChat} from 'react-native-gifted-chat';
// import {useState} from 'react';

// const ChatScreen = ({route}) => {
//   const uid = route.params.id;
//   const [message, setmessage] = useState([]);
//   useEffect(() => {
//     const subribe = firestore()
//       .collection('chatId5')
//       .onSnapshot(querySnap => {
//         querySnap.docChanges().forEach(change => {
//           if (change.type === 'added') {
//             const data = change.doc.data();
//             const createdAt = new Date();
//             console.log(data);
//             setmessage(previousMessages =>
//               GiftedChat.append(previousMessages, data, createdAt),
//             );
//           }
//         });
//       });
//     return () => subribe();
//   }, []);
//   const onSend = (message = []) => {
//     const getmessage = message[0];
//     firestore().collection('chatId5').doc().set(getmessage);
//   };
//   return (
//     <View
//       key={message._id}
//       style={{
//         flex: 1,
//       }}>
//       <GiftedChat
//         key={message._id}
//         messages={message}
//         onSend={data => onSend(data)}
//         user={{
//           _id: uid,
//           avatar: 'https://placeimg.com/140/140/any',
//           name: 'User',
//         }}
//       />
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({});

import {
  Image,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';

import CutomHeader from '../../../CustomComponet/CutomHeader';
import Images from '../../../CustomData/Images';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Fonts from '../../../CustomData/Fonts';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);

  const route1 = route.params.name;
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        // avatar: 'https://placeimg.com/140/140/any',

        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: Images['profile'],
        },
      },
      {
        _id: 2,

        text: 'I am a developer',
        createdAt: new Date(),
        avatar: Images['profile'],

        user: {
          _id: 1,
          name: 'React Native',
          avatar: Images['profile'],
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginBottom: 10, marginEnd: 10}}>
          <Image
            source={Images['send']}
            style={{
              width: 23,
              height: 23,
            }}
          />
        </View>
      </Send>
    );
  };
  const scrollToBottomComponent = props => {
    return <Image source={Images['chatdown']} />;
  };
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#E4E4E4',
            height: 50,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 12,
          },
          right: {
            // backgroundColor: 'red',
            // borderRadius: 1,
            height: 50,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 0,
          },
        }}
        textStyle={{
          left: {
            color: 'black',
            fontFamily: Fonts.medium,
          },
          right: {
            fontFamily: Fonts.medium,

            color: 'white',
          },
        }}
      />
    );
  };

  console.log(route1);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CutomHeader
        headrtitle={route.params.name}
        leftIcon={Images['whiteremove']}
        rightIcon={Images['callmessage']}
      />
      <GiftedChat
        messages={messages}
        bottomOffset={0}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          _id: 2,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        // renderMessageVideo=
        // isTyping={true}t

        textInputStyle={{
          fontFamily: Fonts.medium,
          fontSize: 14,
          color: '#202328',
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
