import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {create} from 'react-test-renderer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utility/constant';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export default function Writer() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageHandler = text => {
    setMessage(text);
  };
  const sendMessage = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      console.log('[[[[[[[[[]]]]]]]]]]]uid', uid);
      const userDocument = firestore()
        .collection(`Users${uid}`)
        .add({
          id: new Date().getTime(),
          message,
        })
        .then(() => {
          console.log('Message is send!');
          fetchData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      const snapshot = await firestore().collection(`Users${uid}`).get();
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('ygasdgastydfytfdtasfdafsdafdsyasf', messages);
      setMessageList(messages);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(messageList);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <TextInput
          placeholder="Message"
          value={message}
          onChangeText={messageHandler}
          style={styles.messageInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage()}>
          <Ionicons name="send" color={colors.orange} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingTop: 10}}>
        {messageList.length > 0 && (
          <FlatList
            data={messageList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.orangeLight,
                    margin: 5,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text>{item.message}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  messageInput: {
    width: widthPercentageToDP('70%'),
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: colors.orange,
  },
  sendBtn: {
    marginLeft: 10,
  },
});
