import { Platform, TextInput, TouchableOpacity, View } from 'react-native';
import style from './style';
import { getSvg } from 'src/svg/getSvg';
import { clearSvg, eyeCloseSvg, eyeSvg } from 'src/svg';
import { useState } from 'react';

interface Props {
  value?: string;
  onChange?: (val?: string) => void;
}

export const PasswordInput = (props: Props) => {
  const { value, onChange } = props;
  const isAndroid = Platform.OS === 'android';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={style.passwordContainer}>
      <TextInput
        value={value}
        style={style.input}
        onChangeText={onChange}
        placeholder="输入密码"
        autoFocus
        numberOfLines={1}
        placeholderTextColor="#ccc"
        textContentType="password"
        secureTextEntry={!showPassword}
      />
      {isAndroid && !!value?.length && (
        <TouchableOpacity style={style.clearIcon} onPress={() => onChange?.('')} activeOpacity={1}>
          {getSvg(clearSvg(), '16', '16')}
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => setShowPassword((state) => !state)}>
        {getSvg(showPassword ? eyeSvg() : eyeCloseSvg(), '16', '16', style.eyeIcon)}
      </TouchableOpacity>
    </View>
  );
};
