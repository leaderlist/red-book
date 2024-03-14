import { View, Text, Image } from 'react-native';
import style from './style';
import { HomeFeedItem } from 'src/types/home';

export const HomeCard = (props: HomeFeedItem) => {
  const {
    note_card: { interact_info, user, cover, display_title },
  } = props;
  return (
    <View style={style.card}>
      <Image source={{ uri: cover.url_pre }} />
      <View style={style.content}>
        <Text numberOfLines={2}>{display_title}</Text>
        <View style={style.footer}>
          <View>
            <Image source={{ uri: user.avatar }} />
            <Text>{user.nickname}</Text>
          </View>
          <View>
            <Text>{interact_info.liked_count}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
