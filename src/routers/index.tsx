import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from 'src/modules/Welcome';

interface BaseRoute {
  name: string;
  component: () => React.JSX.Element;
  options?:
    | NativeStackNavigationOptions
    | ((props: { route: RouteProp<ParamListBase, string>; navigation: any }) => NativeStackNavigationOptions);
}

// 暂定，等待开发过程中确定路由结构
interface RouteItem {
  name: string;
  component: () => React.JSX.Element;
  options?:
    | NativeStackNavigationOptions
    | ((props: { route: RouteProp<ParamListBase, string>; navigation: any }) => NativeStackNavigationOptions);
  child?: BaseRoute[];
}

const Stack = createNativeStackNavigator();

const routerMapList: RouteItem[] = [
  {
    name: 'Welcome',
    component: Welcome,
  },
];

export const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {routerMapList.map((item, index) => (
          <Stack.Screen
            {...item}
            component={Welcome}
            key={`${item.name}-${index}`}
            options={{ ...item.options }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
