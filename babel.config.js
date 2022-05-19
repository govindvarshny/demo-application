// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };
module.exports = function (api) {
  api.cache(true); // necessary
  //'production' is build release
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.BABEL_ENV === 'production'
  ) {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        [
          'transform-remove-console',
          {exclude: ['error'], include: ['log', 'warn']},
        ],
        [
          'module-resolver',
          {
            root: ['./src'],
            extensions: [
              '.ios.js',
              '.android.js',
              '.js',
              '.ts',
              '.tsx',
              '.json',
            ],
            alias: {
              '~': './src',
            },
          },
        ],
      ],
    };
  } else {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src'],
            extensions: [
              '.ios.js',
              '.android.js',
              '.js',
              '.ts',
              '.tsx',
              '.json',
            ],
            alias: {
              '~': './src',
            },
          },
        ],
      ],
    };
  }
};
