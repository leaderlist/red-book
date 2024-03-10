import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { PhoneLoginStyle as style } from './style';
import { NavigationProps } from 'src/types';
import icon_close from 'src/assets/icon_close_modal.png';
import icon_exchange from 'src/assets/icon_exchange.png';
import { PhoneNumberInput, PhoneNumberInputRef } from './components/PhoneNumberInput';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Protocol } from './components/Protocol';
import { ProtocolList } from 'src/constants/login';
import { PasswordInput } from './components/PasswordInput';
import { isNumber, isRealPhoneNumber } from 'src/utils';
import { VerificationCodeInput } from './components/VerificationCodeInput';
import { useAppSelector } from 'src/stores/hooks';
import { ModelRef, ProtocolModal } from './components/ProtocalModal';
// import { login } from 'src/apis/user';
import { useUserInfoAction } from 'src/stores/userSlice';
import { checkCode, getUserInfo, loginCode, sendCode } from 'src/apis/user';
import { SendType } from 'src/types/user';

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
  const [loginData, setLoginData] = useState<LoginData>({ phoneNumber: '' });
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [isCanSend, setIsCanSend] = useState(false);
  const phoneNumberInputRef = useRef<PhoneNumberInputRef>(null);
  const protocolModalRef = useRef<ModelRef>(null);

  const isLoginByPhone = useMemo(() => loginWay === LoginWay.PhoneNumber, [loginWay]);
  const buttonDisable = useMemo(() => {
    const { phoneNumber, verificationCode, password } = loginData || {};
    if (isLoginByPhone) {
      const isZh = phoneNumberInputRef.current?.zoneNumber === 86;
      const numberValid = !!phoneNumber && !!isRealPhoneNumber(phoneNumber);
      const zhValid = phoneNumber?.length === 11 && numberValid;
      console.log(phoneNumber, phoneNumber?.length === 11, numberValid);
      console.log(isZh, zhValid, numberValid);
      if (showVerificationCode) {
        const verificationValid =
          verificationCode && isNumber(Number(verificationCode)) && verificationCode?.length === 6;
        return !(isZh ? zhValid : numberValid) || !verificationValid;
      } else {
        return !(isZh ? zhValid : numberValid);
      }
    }
    return !password;
  }, [isLoginByPhone, loginData, showVerificationCode]);

  const isSelected = useAppSelector((state) => state.login.isSelected);
  const { changeUserInfo } = useUserInfoAction();

  useEffect(() => {
    if (loginWay === LoginWay.PhoneNumber) {
      !showVerificationCode && phoneNumberInputRef.current?.focus();
    }
  }, [loginWay, showVerificationCode]);

  const handleCheckCode = async (code: number) => {
    const phone = Number(loginData.phoneNumber);
    const zone = Number(phoneNumberInputRef.current?.zoneNumber);
    const params = { phone, zone, code };
    const checkResult = await checkCode(params);
    if (!checkResult.data?.mobile_token) {
      console.log('验证失败, 请重试');
      return;
    }
    const loginCodeData = await loginCode({ phone, zone, mobile_token: checkResult.data.mobile_token });
    if (!loginCodeData?.data?.user_id) {
      console.log('登录失败, 请重试');
      return;
    }
    // 请求用户信息
    const userInfo = await getUserInfo();
    console.log(userInfo, 'userInfo');
    if (userInfo.data.user_id) {
      changeUserInfo(userInfo.data);
      navigation.replace('Home');
    }
  };

  const handleSendCode = () => {
    setShowVerificationCode(true);
    const phone = Number(loginData.phoneNumber);
    const zone = Number(phoneNumberInputRef.current?.zoneNumber);
    const params = { phone, zone, type: SendType.Login };
    sendCode(params);
    setIsCanSend(false);
  };

  const handleLoginButtonPress = async () => {
    if (!isSelected) {
      protocolModalRef.current?.changeVisible(true);
      return;
    }
    if (isLoginByPhone) {
      if (showVerificationCode) {
        // 验证登录,发请求验证6位验证码
        handleCheckCode(Number(loginData.verificationCode));
      } else {
        if (!phoneNumberInputRef.current?.zoneNumber) {
          return;
        }
        // 请求6位验证码
        handleSendCode();
      }
    } else {
      // 密码登录,当前接口不支持该模式
      // const params = { name: 'dagongjue', pwd: '1234565' };
      // login(params)
      //   .then((res) => {
      //     if (res.name) {
      //       changeUserInfo(res);
      //       navigation.replace('Home');
      //     }
      //   })
      //   .catch((err) => ToastAndroid.showWithGravity(err || '登陆失败，请重试', ToastAndroid.SHORT, ToastAndroid.TOP));
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
              isCanSend={isCanSend}
              value={loginData?.verificationCode}
              setIsCanSend={setIsCanSend}
              onChange={(val) => setLoginData({ phoneNumber: loginData?.phoneNumber || '', verificationCode: val })}
              sendCode={handleSendCode}
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
          <Text style={style.loginText}>{isLoginByPhone && !isCanSend ? '验证并登录' : '登录'}</Text>
        </TouchableOpacity>
        <Protocol protocolList={ProtocolList} />
      </View>
      <ProtocolModal ref={protocolModalRef} />
    </View>
  );
};
