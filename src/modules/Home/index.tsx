import { View, Text } from 'react-native';
import { sign } from '../../xiaoHongShuHelper/sign';
import SanjiParams from 'src/xiaoHongShuHelper/signParams';
import { useEffect } from 'react';
import { getXSCommon } from 'src/xiaoHongShuHelper/X-S-Common';

export const Home = () => {
  useEffect(() => {
    console.log(sign(window, SanjiParams));
    console.log(getXSCommon(), 22222);
  }, []);
  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
};
