/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/splash';
import Tabnavigators from './src/screens/tabnavigators';
import Signup from './src/screens/signup';
import Signin from './src/screens/signin';
import Toast from 'react-native-toast-message';
import ForgotPassword from './src/screens/forgotPassword';
import {requestUserPermission} from './src/utility/utility';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    // requestNotificationPermission();
    requestUserPermission();
  }, []);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Forget"
            component={ForgotPassword}
            options={{title: 'Forget Password'}}
          />
          <Stack.Screen
            name="Home"
            component={Tabnavigators}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
