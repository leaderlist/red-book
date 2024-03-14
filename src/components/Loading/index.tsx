import { View, Text, Animated, Easing } from 'react-native';
import style from './style';
import { getSvg } from 'src/svg/getSvg';
import { loadingSvg } from 'src/svg';
import { useEffect, useRef } from 'react';

enum Size {
  Large = 'large',
  Middle = 'middle',
  Small = 'small',
}

interface Props {
  showText?: boolean;
  text?: string;
  size?: Size;
  loading?: boolean;
  children?: React.ReactNode;
}

const sizeMap = {
  [Size.Large]: '48',
  [Size.Middle]: '32',
  [Size.Small]: '24',
};

const textSizeMap = {
  [Size.Large]: 24,
  [Size.Middle]: 20,
  [Size.Small]: 16,
};

export const Loading = (props: Props) => {
  const { showText = false, text = '加载中...', size = Size.Middle, chidldren, loading = false } = props;
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 360,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    return () => {
      animationValue.stopAnimation();
    };
  }, []);

  return (
    <View style={style.container}>
      <Animated.View
        style={{
          transform: [
            {
              rotate:
                animationValue.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }) || '0deg',
            },
          ],
        }}>
        {getSvg(loadingSvg(), sizeMap[size], sizeMap[size])}
      </Animated.View>
      {showText && <Text style={[style.text, { fontSize: textSizeMap[size] }]}>{text}</Text>}
    </View>
  );
};
