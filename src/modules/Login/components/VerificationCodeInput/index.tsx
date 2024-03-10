import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import style from './style';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
  isCanSend?: boolean; // 是否已发送验证码
  sendCode?: () => void; // 设置发送状态
  setIsCanSend?: (val: boolean) => void; // 设置发送状态
}

const maxSecond = 60;

export const VerificationCodeInput = (props: Props) => {
  const { value, onChange, isCanSend, sendCode, setIsCanSend } = props;
  const [time, setTime] = useState(maxSecond);
  const startTimeRef = useRef(0);
  let timer: ReturnType<typeof setTimeout>;
  const isShowRef = useRef(false);

  useEffect(() => {
    if (!isCanSend) {
      if (!isShowRef.current) {
        isShowRef.current = true;
      }
      clearInterval(timer);
      startTimeRef.current = new Date().getTime() / 1000;
      setTime(maxSecond);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setInterval(() => {
        const targetTime = maxSecond - (new Date().getTime() / 1000 - startTimeRef.current);
        if (targetTime < 0) {
          setTime(0);
          clearInterval(timer);
          setIsCanSend?.(true);
        }
        setTime(Math.ceil(targetTime));
      }, 200);
    }
  }, [isCanSend]);
  console.log(time);

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  const timeTip = useMemo(() => {
    if (!startTimeRef.current) return '';
    return time !== 0 ? `重新发送(${time}s)` : '重新发送';
  }, [time]);

  return (
    <View style={style.root}>
      <TextInput
        placeholder="输入验证码"
        value={value}
        onChangeText={onChange}
        style={style.input}
        placeholderTextColor="#ccc"
        textContentType="password"
        keyboardType="number-pad"
        autoFocus
      />
      {isShowRef.current && (
        <TouchableOpacity style={style.resend} activeOpacity={1} onPress={sendCode} disabled={time !== 0}>
          <Text style={time === 0 && style.activeText}>{timeTip}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
