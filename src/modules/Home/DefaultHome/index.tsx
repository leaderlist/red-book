import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import style from './style';
import { HomeHeader } from 'src/components/HomeHeader';

const Tab = createMaterialTopTabNavigator();

export const DefaultHome = () => {
  return (
    <View style={style.root}>
      <HomeHeader />
      <Tab.Navigator>
        <Tab.Screen name="Tab 1" component={() => <Text>Tab 1</Text>} />
        <Tab.Screen name="Tab 2" component={() => <Text>Tab 2</Text>} />
        <Tab.Screen name="Tab 3" component={() => <Text>Tab 3</Text>} />
      </Tab.Navigator>
    </View>
  );
};
