const { withAndroidManifest, withProjectBuildGradle, withAppBuildGradle } = require('@expo/config-plugins');

const withTwilioVoiceAndroid = (config) => {
  // Add Google Services Plugin to project build.gradle
  config = withProjectBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes('classpath "com.google.gms:google-services"')) {
      config.modResults.contents = config.modResults.contents.replace(
        'dependencies {',
        `dependencies {
        classpath "com.google.gms:google-services:4.3.10"`
      );
    }
    return config;
  });

  // Add Google Services Plugin to app build.gradle
  config = withAppBuildGradle(config, (config) => {
    if (!config.modResults.contents.includes('apply plugin: "com.google.gms.google-services"')) {
      config.modResults.contents = config.modResults.contents.replace(
        'apply plugin: "com.android.application"',
        `apply plugin: "com.android.application"
apply plugin: "com.google.gms.google-services"`
      );
    }
    return config;
  });

  // Add required permissions to AndroidManifest.xml
  config = withAndroidManifest(config, (config) => {
    const { manifest } = config.modResults;

    // Add permissions
    const permissions = [
      'android.permission.RECORD_AUDIO',
      'android.permission.BLUETOOTH',
      'android.permission.BLUETOOTH_CONNECT',
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.FOREGROUND_SERVICE_PHONE_CALL',
      'android.permission.FOREGROUND_SERVICE_MICROPHONE',
      'android.permission.DISABLE_KEYGUARD',
      'android.permission.WAKE_LOCK',
      'android.permission.USE_FULL_SCREEN_INTENT',
      'android.permission.MANAGE_OWN_CALLS'
    ];

    permissions.forEach(permission => {
      const existingPermissions = manifest['uses-permission'] || [];
      const permissionsArray = Array.isArray(existingPermissions) ? existingPermissions : [existingPermissions];
      
      if (!permissionsArray.some(p => p.$ && p.$['android:name'] === permission)) {
        if (!manifest['uses-permission']) {
          manifest['uses-permission'] = [];
        }
        manifest['uses-permission'].push({
          $: {
            'android:name': permission
          }
        });
      }
    });

    return config;
  });

  return config;
};

module.exports = withTwilioVoiceAndroid;
