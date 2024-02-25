/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { Router } from './src/routers';
import store from './src/stores';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>
        <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
        <Router />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
  },
});

export default App;
