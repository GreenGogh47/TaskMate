const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

// https://docs.expo.dev/guides/using-firebase/#configure-metro
// Metro is React Native's JavaScript bundler (like Webpack for React Native)
// It bundles your JavaScript/TypeScript code for mobile apps