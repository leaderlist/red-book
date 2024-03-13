import { View, Text } from 'react-native';
import style from './style';
import { useEffect, useState } from 'react';
import { getHomeFeedCategory } from 'src/apis/Home';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CategoryItem } from 'src/types/home';
import { Loading } from 'src/components/Loading';
import { CategoryPage } from './CategoryPage';

const Tab = createMaterialTopTabNavigator();

export const Find = () => {
  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  useEffect(() => {
    getHomeFeedCategory()
      .then((res) => {
        console.log(res.data.categories, typeof res.data.categories);
        setCategoryList(res.data.categories);
      })
      .catch((err) => console.log(err));
  }, []);
  const renderNavigator = () => {
    return (
      <Tab.Navigator>
        {categoryList.map(({ name, id }) => (
          <Tab.Screen name={name} key={id} component={CategoryPage} />
        ))}
      </Tab.Navigator>
    );
  };

  return (
    <View style={style.root}>
      <Text>Find page</Text>
      {categoryList.length ? renderNavigator() : <Loading />}
    </View>
  );
};
