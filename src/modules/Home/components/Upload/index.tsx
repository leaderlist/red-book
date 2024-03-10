import { Text, Animated, Easing } from 'react-native';
import style from './style';
import { useEffect, useRef } from 'react';
// import { NavigationProps } from 'src/types';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export const Upload = (/* { navigation }: { navigation: NavigationProps } */) => {
  const translateY = useRef(new Animated.Value(800)).current;
  useFocusEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true, // 启用原生动画驱动程序
    }).start();

    return () => {
      Animated.timing(translateY, {
        toValue: 800,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: true, // 启用原生动画驱动程序
      }).start();
    };
  });

  return (
    <Animated.View style={[style.root, { transform: [{ translateY }] }]}>
      <Text>Upload page</Text>
    </Animated.View>
  );
};
