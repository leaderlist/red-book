import { View, TouchableOpacity } from 'react-native';
import style from './style';
import { getSvg } from 'src/svg/getSvg';
import { menuSvg, searchSvg } from 'src/svg';

export const HomeHeader = () => {
  return (
    <View style={style.root}>
      <TouchableOpacity>{getSvg(menuSvg())}</TouchableOpacity>
      <TouchableOpacity>{getSvg(searchSvg())}</TouchableOpacity>
    </View>
  );
};
