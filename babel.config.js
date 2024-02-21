module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
          '@': ['./src'],
          '@/components': ['./src/components'],
          '@/modules': ['./src/modules'],
          '@/utils': ['./src/utils'],
          '@/stores': ['./src/stores'],
          '@/routers': ['./src/routers'],
          '@/assets': ['./src/assets'],
          '@/constants': ['./src/constants'],
          '@/types': ['./src/types'],
        },
      },
    ],
  ],
};
