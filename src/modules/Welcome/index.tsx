import { Text, View, Button } from 'react-native';
import { RootState } from 'src/stores';
import { useTestActions } from 'src/stores/testSlice';
import { useAppSelector } from 'src/stores/hooks';
import { getShallowEqual } from 'src/stores/utils';

const welcomeShallow = getShallowEqual(['value']);

export const Welcome = () => {
  const { value } = useAppSelector((state: RootState) => state.test, welcomeShallow);
  const { increment, changeName } = useTestActions();
  console.log('rerender');
  return (
    <View>
      <Text>Welcome page{value}</Text>
      <Button
        title="深蓝加点"
        onPress={() => {
          console.log(34444);
          increment();
        }}
      />
      <Button title="修改名字" onPress={() => changeName(Math.floor(Math.random() * 100) + '')} />
    </View>
  );
};
