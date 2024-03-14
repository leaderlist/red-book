import { BackHandler, Image, View } from 'react-native';
import { useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
import { Status, checkUserInfo } from 'src/stores/userSlice';
import store from 'src/stores';
import { useAppSelector } from 'src/stores/hooks';
import { getUserInfo } from 'src/apis/user';
import { NavigationProps } from 'src/types';
import icon_main_logo from '../../assets/icon_main_logo.png';

import style from './style';

export const Welcome = ({ navigation }: { navigation: NavigationProps }) => {
  // const navigate = useNavigation();
  const status = useAppSelector((state) => state.user.status);
  useEffect(() => {
    // fetch useInfo and check login status
    // store.dispatch(checkUserInfo());
    console.log('welcome did mount');

    getUserInfo()
      .then((res) => store.dispatch(checkUserInfo(res.data)))
      .catch(() => store.dispatch(checkUserInfo({})));

    const backHandle = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => {
      backHandle.remove();
    };
  }, []);

  useEffect(() => {
    console.log(status, 11111);
    if (status === Status.Success) {
      navigation.replace('Home');
    } else if (status === Status.Failed) {
      navigation.replace('Login');
    }
  }, [status]);

  return (
    <View style={style.root}>
      <Image style={style.logo} source={icon_main_logo} />
    </View>
  );
};
