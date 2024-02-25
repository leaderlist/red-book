import { StyleSheet } from 'react-native';
import { commonStyle } from '../Demo/common/style';

export default StyleSheet.create({
  root: commonStyle.container,
  logo: {
    width: 200,
    height: 100,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
