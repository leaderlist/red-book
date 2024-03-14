import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useHomeScreenActions } from 'src/stores/homeScreenSlice';
import { useAppSelector } from 'src/stores/hooks';
import { NavigationProps, RouteProps } from 'src/types';

export const CategoryPage = ({ route, navigation } : { route: RouteProps, navigation: NavigationProps }) => {
  const activeRoute = useAppSelector(state => state.homeScreen.activeRoute);
  const { changeActiveRoute } = useHomeScreenActions();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      if (route.name !== activeRoute) {
        changeActiveRoute(route.name);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>{`Category Page - ${route.name}`}</Text>
    </View>
  );
};
