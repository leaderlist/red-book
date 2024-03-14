import { View, Text } from 'react-native';
import { NavigationProps, RouteProps } from 'src/types';

export const CardPage = ({ navigation, route }: {
  navigation: NavigationProps,
  route: RouteProps,
}) => {
  console.log(route.name)
  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <Text>{`CardPage-${route.name}`}</Text>
    </View>
  );
};
