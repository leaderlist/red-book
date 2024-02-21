import { View, TextInput } from 'react-native';
import style from './style';

interface Props {
  value?: string;
  onChange?: (val: string) => void;
}

export const VerificationCodeInput = (props: Props) => {
  const { value, onChange } = props;

  return (
    <View style={style.root}>
      <TextInput
        placeholder="输入验证码"
        value={value}
        onChangeText={onChange}
        style={style.input}
        placeholderTextColor="#ccc"
        textContentType="password"
        autoFocus
      />
    </View>
  );
};
