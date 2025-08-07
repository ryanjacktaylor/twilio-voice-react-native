import { Platform } from 'react-native';
import { requireNativeModule } from 'expo-modules-core';

// Import the existing native wrappers
import { NativeModule } from './common';

// Create a type for the Android Expo native module
interface AndroidExpoNativeModule {
  voice_connect(accessToken: string): Promise<any>;
  voice_register(accessToken: string): Promise<boolean>;
  voice_unregister(accessToken: string): Promise<boolean>;
  voice_accept_call_invite(callInvite: any): Promise<any>;
  voice_reject_call_invite(callInvite: any): Promise<boolean>;
  voice_disconnect_call(call: any): Promise<boolean>;
}

// Get the Android Expo native module
const androidExpoNativeModule: AndroidExpoNativeModule = requireNativeModule('ExpoTwilioVoice');

// Create a new NativeModule class that uses Expo Modules API on Android
class ExpoNativeModule {
  async voice_connect(accessToken: string, params?: any) {
    if (Platform.OS === 'android') {
      return androidExpoNativeModule.voice_connect(accessToken);
    } else if (Platform.OS === 'ios') {
      // For iOS, we'll use the existing NativeModule but with proper parameters
      return NativeModule.voice_connect_ios(accessToken, params || {}, '');
    }
  }

  async voice_register(accessToken: string) {
    if (Platform.OS === 'android') {
      return androidExpoNativeModule.voice_register(accessToken);
    } else if (Platform.OS === 'ios') {
      return NativeModule.voice_register_ios(accessToken);
    }
  }

  async voice_unregister(accessToken: string) {
    if (Platform.OS === 'android') {
      return androidExpoNativeModule.voice_unregister(accessToken);
    } else if (Platform.OS === 'ios') {
      return NativeModule.voice_unregister_ios(accessToken);
    }
  }

  async voice_accept_call_invite(callInvite: any) {
    if (Platform.OS === 'android') {
      return androidExpoNativeModule.voice_accept_call_invite(callInvite);
    } else if (Platform.OS === 'ios') {
      return NativeModule.voice_accept_call_invite_ios(callInvite);
    }
  }

  async voice_reject_call_invite(callInvite: any) {
    if (Platform.OS === 'android') {
      return androidExpoNativeModule.voice_reject_call_invite(callInvite);
    } else if (Platform.OS === 'ios') {
      return NativeModule.voice_reject_call_invite_ios(callInvite);
    }
  }

  async voice_disconnect_call(call: any) {
    if (Platform.OS === 'android') {
      return androidExpoNativeModule.voice_disconnect_call(call);
    } else if (Platform.OS === 'ios') {
      return NativeModule.voice_disconnect_call_ios(call);
    }
  }
}

export default ExpoNativeModule;
