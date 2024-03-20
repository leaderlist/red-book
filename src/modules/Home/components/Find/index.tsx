import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Animated, FlatList, ListRenderItem } from 'react-native';
import { Category, CategoryItem } from 'src/types/home';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Loading } from 'src/components/Loading';
import { CategoryPage } from './CategoryPage';
import { getHomeFeedCategory } from 'src/apis/home';
import { useHomeScreenActions } from 'src/stores/homeScreenSlice';
import { useAppSelector } from 'src/stores/hooks';

import style from './style';

interface RenderItem {
  id: Category;
  title: string;
}

const DefaultCategory = { name: '推荐', id: Category.RECOMMEND };

const Tab = createMaterialTopTabNavigator();
const getMyBar = (categories: CategoryItem[], ref: React.LegacyRef<FlatList<RenderItem>>) => {
  return function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
    const renderItem: ListRenderItem<RenderItem> = ({ item, index }) => {
      const label = item.title;
      const route = state.routes.find((i) => i.name === label);
      if (!route) return null;
      const isFocused = state.index === index;
      const { options } = descriptors[route.key];

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
          <Animated.Text style={[{ opacity }, style.buttonText, isFocused && style.activeText]}>{label}</Animated.Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={style.barWrapper}>
        <FlatList
          ref={ref}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
          data={categories.map(({ id, name }) => ({ id, title: name }))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };
};
// todo, 嵌套的top bar 斜向滑动时，会触发外层top bar滑动
export const Find = (/* { navigation }: { navigation: NavigationProps } */) => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const { changeActiveRoute } = useHomeScreenActions();
  const activeRoute = useAppSelector((state) => state.homeScreen.activeRoute);
  const flatListRef = useRef<FlatList<RenderItem>>(null);

  useEffect(() => {
    getHomeFeedCategory()
      .then((res) => {
        const { categories } = res.data;
        setCategoryList([DefaultCategory, ...categories]);
        changeActiveRoute(DefaultCategory.name);
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const index = categoryList.findIndex((item) => item.name === activeRoute);
    flatListRef.current?.scrollToIndex({
      index,
      viewPosition: index === 0 ? 0 : index === categoryList.length - 1 ? 1 : 0.5,
      animated: true,
    });
  }, [activeRoute]);

  const renderNavigator = () => {
    return (
      <Tab.Navigator tabBar={getMyBar(categoryList, flatListRef)}>
        {categoryList.map(({ name, id }) => (
          <Tab.Screen initialParams={{ category: id }} name={name} key={id} component={CategoryPage} />
        ))}
      </Tab.Navigator>
    );
  };

  return <View style={style.root}>{categoryList.length ? renderNavigator() : <Loading />}</View>;
};
