import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CutomHeader from '../../CustomComponet/CutomHeader';
import Images from '../../CustomData/Images';
import Fonts from '../../CustomData/Fonts';
import FontSize from '../../CustomData/FontSize';
import {useNavigation} from '@react-navigation/native';
import {Card, UserImg, UserInfo} from '../../Customstyle/CustomStyle';
const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: Images['profile'],
    messageTime: '4 mins ago',
    messageText: 'Hey there.....',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: Images['profile'],

    messageTime: '2 hours ago',
    messageText: 'Hey there.....',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: Images['profile'],

    messageTime: '1 hours ago',
    messageText: 'Hey there.....',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: Images['profile'],

    messageTime: '1 day ago',
    messageText: 'Hey there.....',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: Images['profile'],

    messageTime: '2 days ago',
    messageText: 'Hey there.....',
  },
];

const MessagesTabScreen = () => {
  const navigation = useNavigation();
  const Mesaggess = ({data}) => {
    return (
      <>
        <Pressable
          onPress={() => {
            navigation.navigate('ChatScreen');
          }}>
          <View></View>
        </Pressable>
      </>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CutomHeader headrtitle="Messages" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Messages}
        renderItem={({item}) => {
          return (
            <>
              <Pressable
                onPress={() => {
                  navigation.navigate('ChatScreen', {
                    name: item.userName,
                  });
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: 7,
                    paddingHorizontal: 12,
                    // alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Image
                    source={item.userImg}
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 55 / 2,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomColor: '#E4E4E4',
                      marginStart: 10,

                      paddingBottom: 10,

                      // marginBottom: 10,
                      borderBottomWidth: 1,
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <Text
                        style={{
                          color: '#202328',
                          fontFamily: Fonts.semibold,
                          fontSize: FontSize.size._16px,
                        }}>
                        {item.userName}
                        {/* {'\n'} */}
                      </Text>
                      <Text
                        style={{
                          color: '#4B5059',
                          fontFamily: Fonts.regular,
                          fontSize: FontSize.size._14px,
                        }}>
                        {item.messageText}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#4B5059',
                        fontFamily: Fonts.regular,
                        marginBottom: 15,
                        fontSize: FontSize.size._14px,
                      }}>
                      {item.messageTime}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </>
          );
        }}
      />
    </View>
  );
};

export default MessagesTabScreen;

const styles = StyleSheet.create({});
