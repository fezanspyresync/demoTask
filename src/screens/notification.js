import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../utility/constant';

const Notification = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '##FF9C40',
  },
  btn: {
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(90),
    backgroundColor: colors.notificationColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: heightPercentageToDP(4),
  },
});

export default Notification;
