import { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getHomeFeed } from 'src/apis/home';
import { HomeCard } from 'src/components/HomeCard';
import { useHomeScreenActions } from 'src/stores/homeScreenSlice';
import { useAppSelector } from 'src/stores/hooks';
import { NavigationProps, RouteProps } from 'src/types';
import { HomeFeedItem, RefreshType } from 'src/types/home';
import { getHomeFeedParams } from 'src/utils';
import style from './style';

export const CategoryPage = ({ route, navigation }: { route: RouteProps; navigation: NavigationProps }) => {
  const homeScreen = useAppSelector((state) => state.homeScreen);
  const { changeActiveRoute, changeNodeIndex } = useHomeScreenActions();
  const [feedList, setFeedList] = useState<HomeFeedItem[]>([]); // Replace 'any' with the actual type of your feed list
  const [cursorScore, setCursorScore] = useState('');

  const fetchHomeFeed = useCallback(
    (refresh_type = RefreshType.Drop, isChange = false) => {
      getHomeFeed(
        getHomeFeedParams({
          category: route.params?.category,
          cursor_score: cursorScore,
          note_index: homeScreen.noteIndex || 21,
          refresh_type,
        }),
      ).then((res) => {
        setFeedList((prevList) => [...prevList, ...res.data.items]);
        const nodeIndex = feedList.length + res.data.items.length;
        changeNodeIndex(isChange ? nodeIndex : res.data.items.length);
        setCursorScore(res.data.cursor_score);
        console.log(JSON.stringify(res.data.items));
      });
    },
    [feedList, route.params?.category, cursorScore, homeScreen],
  );

  useEffect(() => {
    console.log('did mount', route.name);
    if (navigation.isFocused()) {
      fetchHomeFeed(RefreshType.Change);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      if (route.name !== homeScreen.activeRoute) {
        changeActiveRoute(route.name);
        fetchHomeFeed(RefreshType.Change);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={style.cardList}
        numColumns={2}
        data={feedList}
        renderItem={({ item }) => <HomeCard {...item} />}
      />
    </View>
  );
};

// const listRender = () => {
//   return ;
// };
