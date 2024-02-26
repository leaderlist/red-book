import {
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Dimensions,
  Animated,
  StyleSheet,
  BackHandler,
} from 'react-native';
import style from './style';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import icon_close_modal from 'src/assets/icon_close_modal.png';
import { ProtocolList } from 'src/constants/login';
import { useLoginActions } from 'src/stores/loginSlice';
import { useNavigation } from '@react-navigation/native';

interface Props {
  visible?: boolean;
  // onChange?: (visible: boolean) => void;
}

export interface ModelRef {
  changeVisible: (visible: boolean) => void;
}
const ContentHeight = 205;

export const ProtocolModal = forwardRef<ModelRef, Props>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { changeSelected } = useLoginActions();

  useImperativeHandle<ModelRef, ModelRef>(ref, () => ({
    changeVisible,
  }));

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : ContentHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  const changeVisible = (visible: boolean) => {
    setVisible(visible);
  };

  const translateY = useRef(new Animated.Value(ContentHeight)).current;

  const handleAgreePress = () => {
    changeVisible(false);
    changeSelected(true);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} statusBarTranslucent>
      <View
        style={style.container}
        onResponderEnd={() => changeVisible(false)}
        onStartShouldSetResponder={() => true}>
        <Animated.View style={StyleSheet.compose(style.modalView, { transform: [{ translateY }] })}>
          <View style={style.header}>
            <Text style={style.headerText}>请阅读并同意以下条款</Text>
            <TouchableOpacity style={style.closeButton} activeOpacity={1} onPress={() => changeVisible(false)}>
              <Image source={icon_close_modal} style={style.closeIcon} />
            </TouchableOpacity>
          </View>
          <View style={style.content}>
            {ProtocolList.map((item, index) => (
              <Text style={style.linkText} key={`${item.text}-${index}`} numberOfLines={2}>
                {item.text}
              </Text>
            ))}
          </View>
          <TouchableOpacity activeOpacity={1} style={style.agree} onPress={() => handleAgreePress()}>
            <Text style={style.agreeText}>同意并继续</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
});
