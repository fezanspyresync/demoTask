import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={styles.logoText}> NordStone</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0882C',
  },
  imageContainer: {
    width: '90%',
    height: 150,

    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: wp('10%'),
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
