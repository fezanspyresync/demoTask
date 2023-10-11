import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from './notification';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {Platform, StyleSheet, Text, View} from 'react-native';
Text;

import {
  heightPercentageToDP as HP,
  widthPercentageToDP as WP,
} from 'react-native-responsive-screen';
import Upload from './upload';
import Writer from './writer';
import Calculate from './calculate';
import colors from '../utility/constant';

const Tab = createBottomTabNavigator();

function Tabnavigators() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarStyle: {height: HP(7)}}}>
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: () => null,

          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.parentContainer}>
              {focused ? (
                <View style={styles.focusindicator} />
              ) : (
                <View style={{height: 6}} />
              )}

              <View style={styles.tabIconContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={35}
                  color={focused ? colors.orange : colors.iconColor}
                />

                {/* <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>Notification</Text>
                </View> */}
              </View>
            </View>
          ),

          // headerShown: false,

          // tabBarActiveTintColor: 'blue',

          // tabBarInactiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabel: () => null,

          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.parentContainer}>
              {focused ? (
                <View style={styles.focusindicator} />
              ) : (
                <View style={{height: 6}} />
              )}

              <View style={styles.tabIconContainer}>
                <AntDesign
                  name="clouduploado"
                  size={35}
                  color={focused ? colors.orange : colors.iconColor}
                />

                {/* <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>Notification</Text>
                </View> */}
              </View>
            </View>
          ),

          // headerShown: false,

          // tabBarActiveTintColor: 'blue',

          // tabBarInactiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="typewriter"
        component={Writer}
        options={{
          tabBarLabel: () => null,

          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.parentContainer}>
              {focused ? (
                <View style={styles.focusindicator} />
              ) : (
                <View style={{height: 6}} />
              )}

              <View style={styles.tabIconContainer}>
                <Ionicons
                  name="document-text-outline"
                  size={35}
                  color={focused ? colors.orange : colors.iconColor}
                />

                {/* <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>Notification</Text>
                </View> */}
              </View>
            </View>
          ),
          // headerShown: false,
          // tabBarActiveTintColor: 'blue',
          // tabBarInactiveTintColor: '#000000',
        }}
      />
      <Tab.Screen
        name="calculator"
        component={Calculate}
        options={{
          tabBarLabel: () => null,

          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.parentContainer}>
              {focused ? (
                <View style={styles.focusindicator} />
              ) : (
                <View style={{height: 6}} />
              )}
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name="calculator-outline"
                  size={35}
                  color={focused ? colors.orange : colors.iconColor}
                />

                {/* <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>Notification</Text>
                </View> */}
              </View>
            </View>
          ),

          // headerShown: false,

          // tabBarActiveTintColor: 'blue',

          // tabBarInactiveTintColor: '#000000',
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    top: 0,

    position: 'absolute',

    alignItems: 'center',
  },

  tabIconContainer: {
    alignItems: 'center',

    // marginTop: Platform.OS == 'ios' ? HP('1') : 0

    height: Platform.OS == 'android' ? HP('7') : HP('3.8'),

    marginTop: HP('1'),
  },

  titleContainer: {
    marginTop: Platform.OS == 'android' ? HP('0.3') : HP('0.6'),
  },

  titleText: {
    color: 'blue',

    fontSize: WP('3.5'),
  },

  focusindicator: {
    backgroundColor: colors.orange,

    height: 6,

    width: WP('13'),

    borderBottomRightRadius: 10,

    borderBottomLeftRadius: 10,

    // top: 0,

    // position: 'absolute'
  },

  chatIndicator: {
    backgroundColor: 'blue',

    height: WP('2.5'),

    width: WP('2.5'),

    borderRadius: 10,

    position: 'absolute',

    top: 0,

    right: 0,

    zIndex: 10,
  },
});

export default Tabnavigators;
