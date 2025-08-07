import './expo-config-plugin/ios.js';
import './expo-config-plugin/android.js';

export default {
  name: 'TwilioVoiceReactNative',
  slug: 'twilio-voice-react-native',
  version: '1.6.1',
  platforms: ['ios', 'android'],
  plugins: [
    './expo-config-plugin/ios.js',
    './expo-config-plugin/android.js'
  ]
};
