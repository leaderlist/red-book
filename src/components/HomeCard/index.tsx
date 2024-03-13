import { View, Text, Image } from 'react-native';
import style from './style';

interface Props {
  imgUrl: string;
  title: string;
  avatar: string;
  likeCount: string;
}

export const HomeCard = (props: Props) => {
  const { imgUrl } = props;
  return (
    <View style={style.card}>
      <Image source={{ uri: imgUrl }} />
      <View style={style.content}>
        <Text numberOfLines={2}>{props.title}</Text>
        <View style={style.footer}>
          <Image source={{ uri: props.avatar }} />
          <Text>{props.likeCount}</Text>
        </View>
      </View>
    </View>
  );
};
