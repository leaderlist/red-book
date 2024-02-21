import { Modal, Text, View, Image, TouchableOpacity, LayoutAnimation, Dimensions, Animated, StyleSheet } from 'react-native';
import style from './style';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import icon_close_modal from 'src/assets/icon_close_modal.png';

interface Props {
  visible?: boolean;
  // onChange?: (visible: boolean) => void;
}

export interface ModelRef {
  changeVisible: (visible: boolean) => void;
}

const windowHeight = Dimensions.get('window').height;

export const ProtocolModal = forwardRef<ModelRef, Props>((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle<ModelRef, ModelRef>(ref, () => ({
    changeVisible,
  }));

  const changeVisible = (visible: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(marginTop, {
      toValue: visible ? 0 : windowHeight,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setVisible(visible);
  };

  const marginTop = useRef(new Animated.Value(windowHeight)).current;

  return (
    <Modal animationType="slide" transparent={true} visible={visible} statusBarTranslucent>
      <Animated.View style={[style.container, { height: windowHeight * 2 }]}>
        <View style={StyleSheet.compose(style.modalView, { marginTop })}>
          <View style={style.header}>
            <Text style={style.headerText}>请阅读并同意以下条款</Text>
            <TouchableOpacity style={style.closeButton} activeOpacity={1} onPress={() => changeVisible(false)}>
              <Image source={icon_close_modal} style={style.closeIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
});
