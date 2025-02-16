module.exports = {
  typescript: 'react-native',
  reactNative: { name: 'hairplan', displayName: 'hairplan' },
  gitignore: 'numic',
  metro: 'react-native',
  babel: {
    // Preset still required for jest, but leads to JSX runtime errors in regular app.
    presets: process.env.NODE_ENV === 'test' ? ['module:@react-native/babel-preset'] : [],
    plugins: ['react-native-reanimated/plugin'],
  },
}
