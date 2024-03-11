import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import style from './style';
import { Shop } from './components/Shop';
import { Message } from './components/Message';
import { User } from './components/User';
import { getSvg } from 'src/svg/getSvg';
import { addSvg } from 'src/svg';
import { DefaultHome } from './DefaultHome';

const Tab = createBottomTabNavigator();
const labelList = ['首页', '购物', '消息', '我'];
export const Home = () => {
  return <HomePageRouter />;
};

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const barList = [...state.routes].map(({ key, name }) => ({ key, name }));
  barList.splice(2, 0, { key: 'Upload', name: '上传' });
  return (
    <View style={style.tabBarWrapper}>
      {barList.map(({ key }) => {
        const route = state.routes.find((item) => item.key === key) || { key: 'Upload', name: '上传' };
        const index = state.routes.findIndex((item) => item.key === key);
        let options: BottomTabNavigationOptions | undefined;
        const isUpload = route.key === 'Upload';
        if (!isUpload) {
          options = descriptors[route.key].options;
        }
        const label = isUpload ? getSvg(addSvg(), '36', '36') : labelList[index];

        const isFocused = state.index === index;

        const onPress = (routeKey: string) => {
          if (routeKey.startsWith('Upload')) {
            navigation.navigate('Upload');
            return;
          }
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options?.tabBarAccessibilityLabel}
            testID={options?.tabBarTestID}
            onPress={() => onPress(route.key)}
            onLongPress={onLongPress}
            style={StyleSheet.compose(style.tabBarBtn, isFocused && style.activeBtn)}
            activeOpacity={1}
            key={`${options?.title}-${index}`}>
            <Text style={isFocused ? style.tabBarActiveText : style.tabBarNormalText}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const HomePageRouter = () => {
  return (
    <Tab.Navigator
      initialRouteName="Default"
      tabBar={MyTabBar}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Default" component={DefaultHome} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};
