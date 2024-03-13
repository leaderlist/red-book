import { BackHandler, Image, View } from 'react-native';
import style from './style';
import icon_main_logo from '../../assets/icon_main_logo.png';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Status, checkUserInfo } from 'src/stores/userSlice';
import store from 'src/stores';
import { useAppSelector } from 'src/stores/hooks';
import { getUserInfo } from 'src/apis/user';

export const Welcome = () => {
  const navigate = useNavigation();
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
      navigate.replace('Home');
    } else if (status === Status.Failed) {
      navigate.replace('Login');
    }
  }, [navigate, status]);

  return (
    <View style={style.root}>
      <Image style={style.logo} source={icon_main_logo} />
    </View>
  );
};
