import { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import style from './style';
import icon_main_logo from 'src/assets/icon_main_logo.png';
import { getSvg } from 'src/svg/getSvg';
import { getPhoneSvg } from 'src/svg';
import { PhoneLogin } from './PhoneLogin';
import { NavigationProps } from 'src/types';
import { Protocol } from './components/Protocol';
import { ProtocolList } from 'src/constants/login';

const Stack = createNativeStackNavigator();

export const Login = () => {
  return (
    <Stack.Navigator initialRouteName="default" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="default" component={DefaultLogin} />
      <Stack.Screen
        name="phone"
        component={PhoneLogin}
        options={{ animation: 'slide_from_right', animationDuration: 200 }}
      />
    </Stack.Navigator>
  );
};

const DefaultLogin = ({ navigation }: { navigation: NavigationProps }) => {
  return (
    <View style={style.container}>
      <Image style={style.logo} source={icon_main_logo} />
      <View style={style.loginFooter}>
        <TouchableOpacity activeOpacity={1} style={style.phoneButton} onPress={() => navigation.push('phone')}>
          {getSvg(getPhoneSvg(), '20', '18')}
          <Text style={style.buttonText}>手机号登录</Text>
        </TouchableOpacity>
        <Protocol protocolList={ProtocolList} />
      </View>
    </View>
  );
};
