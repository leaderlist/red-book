import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { PhoneLoginStyle as style } from './style';
import { NavigationProps } from 'src/types';
import icon_close from 'src/assets/icon_close_modal.png';
import icon_exchange from 'src/assets/icon_exchange.png';
import { PhoneNumberInput } from './components/PhoneNumberInput';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Protocol } from './components/Protocol';
import { ProtocolList } from 'src/constants/login';
import { PasswordInput } from './components/PasswordInput';
import { isNumber, isRealPhoneNumber } from 'src/utils';
import { VerificationCodeInput } from './components/VerificationCodeInput';
import { useAppSelector } from 'src/stores/hooks';
import { ModelRef, ProtocolModal } from './components/ProtocalModal';

enum LoginWay {
  PhoneNumber = 'phoneNumber',
  Password = 'password',
}

interface LoginData {
  phoneNumber: string;
  password?: string;
  verificationCode?: string;
}

export const PhoneLogin = ({ navigation }: { navigation: NavigationProps }) => {
  const [loginWay, setLoginWay] = useState<LoginWay>(LoginWay.PhoneNumber);
  const [loginData, setLoginData] = useState<LoginData | undefined>();
  const [showVerificationCode, setShowVerificationCode] = useState(false);

  const isLoginByPhone = useMemo(() => loginWay === LoginWay.PhoneNumber, [loginWay]);
  const buttonDisable = useMemo(() => {
    const { phoneNumber, verificationCode, password } = loginData || {};
    if (isLoginByPhone) {
      const numberValid = !!phoneNumber && !!isRealPhoneNumber(phoneNumber);
      if (showVerificationCode) {
        const verificationValid =
          verificationCode && isNumber(Number(verificationCode)) && verificationCode?.length === 6;
        return !numberValid || !verificationValid;
      } else {
        return !numberValid;
      }
    }
    return !password;
  }, [isLoginByPhone, loginData, showVerificationCode]);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const protocolModalRef = useRef<ModelRef>(null);

  const isSelected = useAppSelector((state) => state.login.isSelected);

  useEffect(() => {
    if (loginWay === LoginWay.PhoneNumber) {
      !showVerificationCode && phoneNumberInputRef.current?.focus();
    }
  }, [loginWay, showVerificationCode]);

  const handleLoginButtonPress = () => {
    if (!isSelected) {
      protocolModalRef.current?.changeVisible(true);
      return;
    }
    if (isLoginByPhone) {
      if (showVerificationCode) {
        // 验证登录
      } else {
        setShowVerificationCode(true);
      }
    } else {
      // 密码登录
    }
  };

  return (
    <View style={style.root}>
      <View style={style.headerBar}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image style={style.close} source={icon_close} />
        </TouchableOpacity>
        <Text style={style.help}>帮助</Text>
      </View>
      <View style={style.content}>
        <Text style={style.title}>手机号登录</Text>
        <Text style={style.subTitle}>未注册的手机号登录成功后将自动注册</Text>
        <PhoneNumberInput
          ref={phoneNumberInputRef}
          onChange={(val) => setLoginData({ ...loginData, phoneNumber: val })}
        />
        {isLoginByPhone ? (
          showVerificationCode && (
            <VerificationCodeInput
              value={loginData?.verificationCode}
              onChange={(val) => setLoginData({ phoneNumber: loginData?.phoneNumber || '', verificationCode: val })}
            />
          )
        ) : (
          <PasswordInput
            value={loginData?.password}
            onChange={(val) => setLoginData({ phoneNumber: loginData?.phoneNumber || '', password: val })}
          />
        )}
        <View style={style.assistContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={style.switch}
            onPress={() => setLoginWay(isLoginByPhone ? LoginWay.Password : LoginWay.PhoneNumber)}>
            <Image style={style.exchangeIcon} source={icon_exchange} />
            <Text style={style.exchangeText}>{isLoginByPhone ? '密码登录' : '验证码登录'}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={style.exchangeText}>{isLoginByPhone ? '手机号码无法使用' : '忘记密码？'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={buttonDisable}
          activeOpacity={1}
          style={StyleSheet.compose(style.loginButton, buttonDisable && style.disable)}
          onPress={() => handleLoginButtonPress()}>
          <Text style={style.loginText}>{isLoginByPhone ? '验证并登录' : '登录'}</Text>
        </TouchableOpacity>
        <Protocol protocolList={ProtocolList} />
      </View>
      <ProtocolModal ref={protocolModalRef} />
    </View>
  );
};
