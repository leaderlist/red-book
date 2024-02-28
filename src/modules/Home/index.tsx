import { View, Text } from 'react-native';
import { sign } from '../../xiaoHongShuHelper/sign';
import SanjiParams from 'src/xiaoHongShuHelper/signParams';
import { useEffect } from 'react';

export const Home = () => {
  useEffect(() => {
    console.log(sign(window, SanjiParams));
  }, []);
  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
};
