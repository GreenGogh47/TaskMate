module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: { '@': './src' },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        }
      ]
      // Note: react-native-reanimated v4 includes worklets by default
      // The warning about babel plugin may be a false positive
    ]
  };
};
