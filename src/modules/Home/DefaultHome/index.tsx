import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import style from './style';
import { Find } from '../components/Find';
import { Follow } from '../components/Follow';
import { Nearby } from '../components/Nearby';
import { getSvg } from 'src/svg/getSvg';
import { menuSvg, searchSvg } from 'src/svg';

const Tab = createMaterialTopTabNavigator();

const tabLabelMap: Record<string, string> = { Follow: '关注', Find: '发现', Nearby: '附近' };

function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
  return (
    <View style={style.tabBarContainer}>
      <TouchableOpacity style={style.settingIcon}>{getSvg(menuSvg())}</TouchableOpacity>
      <View style={style.barWrapper}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = tabLabelMap[route.name];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0.7)),
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={style.tabBarButton}
              activeOpacity={1}
              key={`${route.name}-${index}`}>
              <Animated.Text style={[{ opacity }, style.buttonText, isFocused && style.activeText]}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={style.searchIcon}>{getSvg(searchSvg())}</TouchableOpacity>
    </View>
  );
}

export const DefaultHome = () => {
  return (
    <View style={style.root}>
      <Tab.Navigator
        tabBar={MyTabBar}
        initialLayout={{ width: Dimensions.get('window').width }}
        initialRouteName="Find"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}>
        <Tab.Screen name="Follow" component={Follow} />
        <Tab.Screen name="Find" component={Find} />
        <Tab.Screen name="Nearby" component={Nearby} />
      </Tab.Navigator>
    </View>
  );
};
