import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import Toast from 'react-native-toast-message';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {updatePasswordHandler} from '../utility/utility';
import {useNavigation} from '@react-navigation/native';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const navigation = useNavigation();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = text => {
    if (emailRegex.test(text) == false) {
      setEmailMessage('Invalid email*');
    } else {
      setEmailMessage('');
    }
    setEmail(text);
  };

  const emailHandler = () => {
    if (email == '') {
      Toast.show({
        type: 'info',
        text1: 'info',
        text2: `Please fill creditentials 👋`,
      });
    } else if (emailMessage) {
      Toast.show({
        type: 'info',
        text1: 'info',
        text2: `Please enter valid email 👋`,
      });
    } else {
      updatePasswordHandler(email, navigation);
      //   Toast.show({
      //     type: 'success',
      //     text1: 'success',
      //     text2: `email has been sent 👋`,
      //   });
    }
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.emailContainer}>
          <View style={styles.iconStyle}>
            <Icon name="email" size={30} color="#900" />
          </View>
          <TextInput
            style={styles.inputStyle}
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Email"
            keyboardType="email-address"
            //   onBlur={() => {
            //     if (email == '') {
            //       setEmailMessage('Required*');
            //     }
            //   }}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => emailHandler()}>
          <Text style={styles.btnText}>Sent</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '##FF9C40',
  },

  iconStyle: {
    paddingHorizontal: widthPercentageToDP(1),
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '##FF9C40',
    borderRadius: widthPercentageToDP(2),
    // marginBottom: heightPercentageToDP(3),
    // marginTop: heightPercentageToDP(3),
    backgroundColor: 'white',
    paddingHorizontal: widthPercentageToDP(2),
    width: widthPercentageToDP('90%'),
  },
  inputStyle: {
    flex: 1,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#FF9C40',
    height: heightPercentageToDP(6),

    width: '70%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(3),
  },
  btnText: {
    // textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
