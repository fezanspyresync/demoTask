import {Alert, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
export const PLATEFORM_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};

export const PLATFORM_CAMERA_PERMISSIONS = {
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
};
export const PLATFORM_PHOTO_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

export const PLATFORM_MIC_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.MICROPHONE,
};

export const REQUEST_PERMISSION_TYPE = {
  location: PLATEFORM_LOCATION_PERMISSIONS,
  camera: PLATFORM_CAMERA_PERMISSIONS,
  photo: PLATFORM_PHOTO_PERMISSIONS,
  mic: PLATFORM_MIC_PERMISSIONS,
};

export const PERMISSION_TYPE = {
  location: 'location',
  camera: 'camera',
  mic: 'mic',
  photo: 'photo',
};

export const checkPermission = async type => {
  const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
  if (!permissions) {
    return true;
  }
  try {
    var result = await check(permissions);
    console.log('Result====>', result);
    if (result == RESULTS.GRANTED) {
      return true;
    } else {
      return await requestPermission(permissions), false;
    }
  } catch (error) {
    console.log('Error--->', error);
  }
};
export const requestPermission = async permissions => {
  try {
    var result = await request(permissions);
    if (result == 'granted') {
      return true;
    } else if (result == 'blocked') {
      return false;
    } else if (result == 'limited') {
      return false;
    } else if (result == 'unavailable') {
      return false;
    } else if (result == 'denied') {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
