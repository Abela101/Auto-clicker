import { NativeModules, Platform, PermissionsAndroid } from 'react-native';

const { FloatingButton } = NativeModules;

export const requestOverlayPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW,
      {
        title: 'Overlay Permission',
        message: 'This app needs permission to display overlay on top of other apps.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // Always granted on iOS (if implemented)
};
