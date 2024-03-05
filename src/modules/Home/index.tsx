import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { getXSCommon } from 'src/xiaoHongShuHelper/X-S-Common';
import { params } from 'src/xiaoHongShuHelper/constant';

export const Home = () => {
  useEffect(() => {
    // console.log(getXSCommon(params), 222333);
  }, []);
  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
};
