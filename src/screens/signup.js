import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/Fontisto';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Feather from 'react-native-vector-icons/dist/Feather';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {signUpHandler} from '../utility/utility';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const navigation = useNavigation();

  const handleEmailChange = text => {
    if (emailRegex.test(text) == false) {
      setEmailMessage('Invalid email*');
    } else {
      setEmailMessage('');
    }
    setEmail(text);
  };

  const handlePasswordChange = text => {
    if (passwordRegex.test(text) == false) {
      setPasswordMessage('Invalid password*');
    } else {
      setPasswordMessage('');
    }
    setPassword(text);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = () => {
    if (email == '') {
      setEmailMessage('Required*');
    }
    if (password == '') {
      setPasswordMessage('Required*');
      return;
    }
    if (email !== '' && password !== '') {
      console.log('handler data here');
      signUpHandler(email, password, navigation);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={{marginBottom: 5}}>
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
              onBlur={() => {
                if (email == '') {
                  setEmailMessage('Required*');
                }
              }}
            />
          </View>
          <Text style={{color: 'red'}}>
            {emailMessage != '' && emailMessage}
          </Text>
        </View>
        <View>
          <View style={styles.emailContainer}>
            <View style={styles.iconStyle}>
              <MaterialIcons name="password" size={30} color="#900" />
            </View>
            <TextInput
              style={styles.inputStyle}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onBlur={() => {
                if (password == '') {
                  setPasswordMessage('Required*');
                }
              }}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.iconStyle}>
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#900"
              />
            </TouchableOpacity>
          </View>
          <Text style={{color: 'red'}}>
            {passwordMessage != '' && passwordMessage}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={() => submitHandler()}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '##FF9C40',
  },
  infoContainer: {
    height: heightPercentageToDP('50%'),
    width: widthPercentageToDP('90%'),
    justifyContent: 'center',
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
    borderRadius: widthPercentageToDP(2),
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
export default Signup;
