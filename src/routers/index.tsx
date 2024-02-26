import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
// import { TransitionPresets } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Welcome } from 'src/modules/Welcome';
import { Home } from 'src/modules/Home';
import { Login } from 'src/modules/Login';

interface BaseRoute {
  name: string;
  component: (props: React.ComponentProps<any> & { navigation: any }) => React.JSX.Element;
  options?:
    | NativeStackNavigationOptions
    | ((props: { route: RouteProp<ParamListBase, string>; navigation: any }) => NativeStackNavigationOptions);
}

// 暂定，等待开发过程中确定路由结构
export interface RouteItem {
  name: string;
  component: (props: React.ComponentProps<any> & { navigation: any }) => React.JSX.Element;
  options?:
    | NativeStackNavigationOptions
    | ((props: { route: RouteProp<ParamListBase, string>; navigation: any }) => NativeStackNavigationOptions);
  child?: BaseRoute[];
}

const Stack = createNativeStackNavigator();

const routerMapList: RouteItem[] = [
  {
    name: 'Welcome',
    component: Welcome
  },
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'Login',
    component: Login,
    options: {
      animationTypeForReplace: 'push', // 该属性控制replace 到该页面时，是从左边(pop)还是右边(push)出现
    },
  },
];

export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {routerMapList.map((item, index) => (
          <Stack.Screen {...item} key={`${item.name}-${index}`} options={{ ...item.options }} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
