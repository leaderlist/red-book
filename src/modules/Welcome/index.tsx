import { BackHandler, Image, View } from 'react-native';
import style from './style';
import icon_main_logo from '../../assets/icon_main_logo.png';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Status, checkUserInfo } from 'src/stores/userSlice';
import store from 'src/stores';
import { useAppSelector } from 'src/stores/hooks';

export const Welcome = () => {
  console.log('rerender');
  const navigate = useNavigation();
  const status = useAppSelector((state) => state.user.status);
  useEffect(() => {
    // fetch useInfo and check login status
    store.dispatch(checkUserInfo());

    const backHandle = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => {
      backHandle.remove();
    };
  }, [navigate]);

  useEffect(() => {
    if (status === Status.Success) {
      navigate.replace('Home');
    } else if (status === Status.Failed) {
      navigate.replace('Home');
    }
  }, [navigate, status]);

  return (
    <View style={style.root}>
      <Image style={style.logo} source={icon_main_logo} />
    </View>
  );
};
