import { useCallback, useEffect, useRef, useState } from 'react';
import { View, RefreshControl } from 'react-native';
import { getHomeFeed } from 'src/apis/home';
import { HomeCard } from 'src/components/HomeCard';
import { useHomeScreenActions } from 'src/stores/homeScreenSlice';
import { useAppSelector } from 'src/stores/hooks';
import { NavigationProps, RouteProps } from 'src/types';
import { HomeFeedItem, RefreshType } from 'src/types/home';
import { getHomeFeedParams } from 'src/utils';
// import style from './style';
import { mockData } from './mock';
import WaterfallFlow from 'react-native-waterfall-flow';

const PADDING_WIDTH = 4;

export const CategoryPage = ({ route, navigation }: { route: RouteProps; navigation: NavigationProps }) => {
  const homeScreen = useAppSelector((state) => state.homeScreen);
  const { changeActiveRoute, changeNodeIndex, changePageWidth } = useHomeScreenActions();
  const [feedList, setFeedList] = useState<HomeFeedItem[]>([]); // Replace 'any' with the actual type of your feed list
  const [cursorScore, setCursorScore] = useState('');
  const activeRouteRef = useRef(homeScreen.activeRoute);

  const fetchHomeFeed = useCallback(
    (refresh_type = RefreshType.Change, isChange = false) => {
      getHomeFeed(
        getHomeFeedParams({
          category: route.params?.category,
          cursor_score: cursorScore,
          note_index: homeScreen.noteIndex || 21,
          refresh_type,
        }),
      )
        .then((res) => {
          setFeedList((prevList) => [...prevList, ...res.data.items]);
          const nodeIndex = feedList.length + res.data.items.length;
          changeNodeIndex(isChange ? nodeIndex : res.data.items.length);
          setCursorScore(res.data.cursor_score);
        })
        .catch(() => {
          setFeedList(mockData);
          changeNodeIndex(mockData.length);
        });
    },
    [feedList, route.params?.category, cursorScore, homeScreen],
  );

  useEffect(() => {
    activeRouteRef.current = homeScreen.activeRoute;
  }, [homeScreen.activeRoute]);

  useEffect(() => {
    if (navigation.isFocused() && feedList.length === 0) {
      fetchHomeFeed(RefreshType.Drop);
    }

    const unsubscribe = navigation.addListener('focus', () => {
      if (route.name !== activeRouteRef.current) {
        console.log(feedList.length, route.name)
        feedList.length === 0 && fetchHomeFeed(RefreshType.Change);
        changeActiveRoute(route.name);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View onLayout={({ nativeEvent }) => changePageWidth(nativeEvent.layout.width)} style={{ flex: 1 }}>
      <WaterfallFlow
        data={feedList}
        numColumns={2}
        renderItem={({ item, index, columnIndex }) => {
          return (
            <HomeCard
              isFirstColumn={columnIndex === 0}
              width={(homeScreen.pageWidth - PADDING_WIDTH) / 2}
              key={`${columnIndex}-${index}`}
              {...item}
            />
          );
        }}
        onScroll={({ nativeEvent }) => console.log(nativeEvent)}
        refreshControl={
          <RefreshControl onRefresh={() => fetchHomeFeed(RefreshType.Drop)} refreshing={false} colors={['red']} />
        }
      />
    </View>
  );
};

// const listRender = () => {
//   return ;
// };
