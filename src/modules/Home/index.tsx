import { View, Text } from 'react-native';
import { sign } from '../../xiaoHongShuHelper/sign';
import SanjiParams from 'src/xiaoHongShuHelper/signParams';
import { useEffect } from 'react';
import { getXSCommon } from 'src/xiaoHongShuHelper/X-S-Common';
import getSignParams from 'src/utils/getSignParams';

export const Home = () => {
  useEffect(() => {
    console.log(sign(window, SanjiParams), 'sign X-s & X-t');
    console.log(getXSCommon(), 'getXSCommon');
    getSignParams(sign(window, SanjiParams))
      .then(res => {
        console.log(res);
      })
  }, []);
  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
};
