/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, UIManager } from 'react-native';
import { Provider } from 'react-redux';
import { Router } from './src/routers';
import store from './src/stores';
import { setStorage } from './src/stores/storage';
import { setCookies } from './src/utils/cookieManager';
import { LOCAL_ID_KEY } from './src/constants/sign';
import { generateLocalId } from './src/utils/getSignParams';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App(): React.JSX.Element {
  useEffect(() => {
    setStorage(
      'b1',
      'I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSBMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR1QL+5Ii6sdnoeSfqYHqwl2qt5BfqJIvFbNLQ+ZPw7Ixdsxuwr4qtkIkrwIi/skZc3ICLdI3Oe0utl2ADZsL5eDSJsSPwXIEvsiVtJOPw8BuwfPpdeTDWOIx4VIiu6ZPwbJqt0IxHyoMAeVutWIvvs6PtPIiMzIih2sf6sS7h5rUOsfut4sM5eWz4VLoJeSWuGIx/eDqtcIios0qtlbLijPdpsI3deiqt3pW7e1g+2IhQaIET2NgqDI3zJqZ88IizuBVwUIvGF4e6edb5ekVtCIxAsfe3s0duZIh5e3DhSPqwDIkOs3BJs6Sesiqw/rd/eDuwjICFGzAoe0qwlzn/sSuwbI34LI3pTouwwaPwyosVNJpJs0j0siqtsIkOeDU3s6MW6IkJsSL7sx9IuIkJe1qtdIkqlOqwPtqtMIxve6utYIkes1Vw6IEosfqtANqwysqwIIvrdIxuz89q02ZJe3qtFIhu4IiAedqwoeWccpUOsDskuIhRytPwwzqwAIkesWqtuqIAsVF6s1IbLIiD=',
    );
    setStorage('b1b1', '1');

    setCookies('https://edith.xiaohongshu.com', {
      [LOCAL_ID_KEY]: generateLocalId('Anfroid'),
    });
  }, []);
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
