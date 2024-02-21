import { StyleProp, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

export const getSvg = (xml: string, width: string = '20', height: string = '20', style?: StyleProp<ViewStyle>) => {
  return <SvgXml xml={xml} width={width} height={height} style={style} />;
};
