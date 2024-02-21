import { forwardRef, useState } from 'react';
import { TextInput, View, Image, Text, Platform, TouchableOpacity } from 'react-native';
import style from './style';
import icon_triangle from 'src/assets/icon_triangle.png';
import { getSvg } from 'src/svg/getSvg';
import { clearSvg } from 'src/svg';

interface Props {
  onChange: (val: string) => void;
}

export const PhoneNumberInput = forwardRef<TextInput, Props>((props, ref) => {
  const [dialNumber, setDialNumber] = useState(86);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { onChange } = props;

  const isAndroid = Platform.OS === 'android';
  return (
    <View style={style.root}>
      <View style={style.dialArea}>
        <Text style={style.dialNumber}>{`+${dialNumber}`}</Text>
        <Image style={style.iconTriangle} source={icon_triangle} />
      </View>
      <TextInput
        style={style.input}
        value={phoneNumber}
        ref={ref}
        onChange={(e) => {
          const { text } = e.nativeEvent;
          const newText = text.replace(/[^\d]+/, '');
          setPhoneNumber(newText);
          onChange(`${dialNumber}-${newText}`);
          e.preventDefault();
        }}
        placeholder="请输入手机号码"
        autoFocus
        clearButtonMode="never"
        numberOfLines={1}
        placeholderTextColor="#ccc"
        dataDetectorTypes="phoneNumber"
        keyboardType="number-pad"
        textContentType="telephoneNumber"
      />
      {isAndroid && phoneNumber && (
        <TouchableOpacity style={style.clearIcon} onPress={() => setPhoneNumber('')} activeOpacity={1}>
          {getSvg(clearSvg(), '14', '14')}
        </TouchableOpacity>
      )}
    </View>
  );
});
