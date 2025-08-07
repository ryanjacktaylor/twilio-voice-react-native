const { withInfoPlist } = require('@expo/config-plugins');

const withTwilioVoiceIOS = (config) => {
  // Add background modes to Info.plist
  config = withInfoPlist(config, (config) => {
    if (!config.modResults.UIBackgroundModes) {
      config.modResults.UIBackgroundModes = [];
    }

    // Add required background modes
    const backgroundModes = [
      'audio',
      'voip'
    ];

    backgroundModes.forEach(mode => {
      if (!config.modResults.UIBackgroundModes.includes(mode)) {
        config.modResults.UIBackgroundModes.push(mode);
      }
    });

    return config;
  });

  return config;
};

module.exports = withTwilioVoiceIOS;
