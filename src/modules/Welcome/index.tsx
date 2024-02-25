import { Image, View } from 'react-native';
import style from './style';
import icon_main_logo from '../../assets/icon_main_logo.png';
import { useEffect } from 'react';
import { WELCOME_DELAY_TIME } from 'src/constants';
import { useNavigation } from '@react-navigation/native';

export const Welcome = () => {
  console.log('rerender');
  const navigate = useNavigation();
  useEffect(() => {
    // fetch useInfo and check login status
    let timer = setTimeout(() => {
      navigate.replace('Login');
    }, WELCOME_DELAY_TIME);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [navigate]);

  return (
    <View style={style.root}>
      <Image style={style.logo} source={icon_main_logo} />
    </View>
  );
};
