import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import colors from '../utility/constant';
import * as ImagePicker from 'react-native-image-picker';
import {
  PERMISSION_TYPE,
  checkPermission,
  requestPermission,
} from '../components/permissions';
import {PERMISSIONS, openSettings} from 'react-native-permissions';
import storage from '@react-native-firebase/storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {toast} from 'react-toastify';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Upload() {
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  // <ActivityIndicator size="large" color="#00ff00" />

  const ImageOptions = {
    title: 'Select Image',
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    // maxWidth: 500,
    // maxHeight: 500,
    quality: 0.3,
    maxWidth: 1080,
    maxHeight: 1080,
    includeBase64: true,
  };
  const uploadImage = async val => {
    if (val == 1) {
      ImagePicker.launchCamera(ImageOptions, async response => {
        if (response.didCancel) {
          // setimageLoader(false);
        } else if (response.error) {
          // setimageLoader(false);
        } else if (response.customButton) {
          // setimageLoader(false);
        } else {
          setLoading(true);
          console.log('camera', response?.assets[0]?.uri);
          const uid = await AsyncStorage.getItem('uid');

          const path = response?.assets[0]?.uri;
          const filename =
            new Date().getTime() + path.substring(path.lastIndexOf('/') + 1);
          // store data into firestore bucket
          const reference = storage().ref(filename);
          await reference.putFile(path);
          const imageUrl = await storage().ref(filename).getDownloadURL();

          setFile(imageUrl);
          setLoading(false);
          // store data into firestore
          const collectionRef = firestore().collection(`Users${uid}photo`);
          collectionRef
            .get()
            .then(snapshot => {
              if (snapshot.empty) {
                console.log('The collection does not exist.');
                firestore()
                  .collection(`Users${uid}photo`)
                  .doc(`${uid}`)
                  .set({
                    image: imageUrl,
                  })
                  .then(() => {
                    console.log('User added!');
                    Toast.show({
                      type: 'success',
                      text1: 'success',
                      text2: 'image is successfully added',
                    });
                  });
              } else {
                console.log('The collection exists.');
                firestore()
                  .collection(`Users${uid}photo`)
                  .doc(`${uid}`)
                  .update({
                    image: imageUrl,
                  })
                  .then(() => {
                    Toast.show({
                      type: 'success',
                      text1: 'success',
                      text2: 'image is successfully updated',
                    });
                  });
              }
            })
            .catch(error => {
              console.error('Error getting collection:', error);
            });

          console.log(imageUrl);
        }
      });
    } else if (val == 2) {
      ImagePicker.launchImageLibrary(ImageOptions, async response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else if (response.customButton) {
        } else {
          setLoading(true);
          console.log('camera', response?.assets[0]?.uri);
          const uid = await AsyncStorage.getItem('uid');
          const path = response?.assets[0]?.uri;
          const filename =
            new Date().getTime() + path.substring(path.lastIndexOf('/') + 1);
          const reference = storage().ref(filename);
          await reference.putFile(path);
          const imageUrl = await storage().ref(filename).getDownloadURL();
          setFile(imageUrl);
          setLoading(false);
          const collectionRef = firestore().collection(`Users${uid}photo`);
          collectionRef.get().then(snapshot => {
            if (snapshot.empty) {
              console.log('The collection does not exist.');
              firestore()
                .collection(`Users${uid}photo`)
                .doc(`${uid}`)
                .set({
                  image: imageUrl,
                })
                .then(() => {
                  console.log('User added!');
                  Toast.show({
                    type: 'success',
                    text1: 'success',
                    text2: 'image is successfully added',
                  });
                });
            } else {
              console.log('The collection exists.');
              firestore()
                .collection(`Users${uid}photo`)
                .doc(`${uid}`)
                .update({
                  image: imageUrl,
                })
                .then(() => {
                  Toast.show({
                    type: 'success',
                    text1: 'success',
                    text2: 'image is successfully updated',
                  });
                });
            }
          });
          console.log(imageUrl);
        }
      });
    }
  };

  const openImageOptions = () => {
    Alert.alert(
      'Upload Image',
      'Choose image upload option',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled'),
        },
        {
          text: 'Open Camera',
          onPress: async () => {
            if (Platform.OS == 'ios') {
              const permission = await checkPermission(PERMISSION_TYPE.camera);
              console.log('PERMISSION: ', permission);
              if (permission) {
                uploadImage(1);
              } else {
                const response = await requestPermission(
                  PERMISSIONS.IOS.CAMERA,
                );
                console.log('Permission:', response);
                if (!response) {
                  Alert.alert(
                    'Permission Required',
                    'Please Allow camera permission from your settings to use camera',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancelled'),
                      },
                      {
                        text: 'Settings',
                        onPress: () =>
                          openSettings().catch(e =>
                            Alert.alert(
                              'Error',
                              "Sorry, couldn't open settings for you!",
                            ),
                          ),
                      },
                    ],
                  );
                }
              }
            } else {
              const permissionCamera = await checkPermission(
                PERMISSION_TYPE.camera,
              );
              if (permissionCamera) {
                uploadImage(1);
              } else {
                const response = await requestPermission(
                  PERMISSIONS.ANDROID.CAMERA,
                );
                console.log('Permission:', response);
                if (!response) {
                  Alert.alert(
                    'Permission Required',
                    'Please Allow camera permission from your settings to use camera',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancelled'),
                      },
                      {
                        text: 'Settings',
                        onPress: () =>
                          openSettings().catch(e =>
                            Alert.alert(
                              'Error',
                              "Sorry, couldn't open settings for you!",
                            ),
                          ),
                      },
                    ],
                  );
                } else {
                  uploadImage(1);
                }
              }
            }
          },
        },
        {
          text: 'Open Gallery',
          onPress: () => uploadImage(2),
        },
      ],
      {cancelable: false},
    );
  };

  const removeImage = () => {
    setFile('');
  };

  useEffect(() => {}, []);
  return (
    <View style={styles.contai9ner}>
      <View style={styles.imageContainer}>
        {file && (
          <TouchableOpacity
            onPress={() => removeImage()}
            style={{position: 'absolute', right: 5, top: 5, zIndex: 10}}>
            <Entypo name="circle-with-cross" color={'red'} size={30} />
          </TouchableOpacity>
          // <Text
          //   onPress={() => removeImage()}
          //   style={{
          //     color: 'red',
          //     position: 'absolute',
          //     right: 5,
          //     top: 5,
          //     zIndex: 1000,
          //     font
          //   }}>
          //   X
          // </Text>
        )}
        {file && (
          <Image
            source={{uri: file}}
            resizeMode="cover"
            style={{height: '100%', width: '100%'}}
          />
        )}
        {file == '' && (
          <>
            {loading == false ? (
              <TouchableOpacity
                style={styles.pickerIcon}
                onPress={() => {
                  openImageOptions();
                }}>
                <Icon name="upload" color={colors.orange} size={40} />
              </TouchableOpacity>
            ) : (
              <ActivityIndicator
                size="large"
                color={colors.orange}
                style={styles.pickerIcon}
              />
            )}
          </>
        )}
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontSize: 12,
          fontStyle: 'italic',
          margin: 10,
        }}>
        {file}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contai9ner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    height: heightPercentageToDP('40'),
    width: widthPercentageToDP('70'),
    borderRadius: 10,
    //borderWidth: 1,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,

    elevation: 1,
    overflow: 'hidden',
  },
  pickerIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
  },
});
