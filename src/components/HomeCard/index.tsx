import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import style from './style';
import { HomeFeedItem } from 'src/types/home';
import { useEffect, useState } from 'react';
import { getSvg } from 'src/svg/getSvg';
import { fillHeartSvg, heartSvg } from 'src/svg';

export const HomeCard = (props: HomeFeedItem & { width: number; isFirstColumn: boolean }) => {
  const {
    note_card: { interact_info, user, cover, display_title },
    width,
    isFirstColumn,
  } = props;
  const [height, setHeight] = useState(0);
  const [liked, setLiked] = useState(interact_info.liked);
  const [likedCount, setLikedCount] = useState(interact_info.liked_count);

  useEffect(() => {
    height === 0 &&
      Image.getSizeWithHeaders(
        cover.url_pre,
        { referer: 'https://www.xiaohongshu.com/' },
        (_width, _height) => {
          setHeight((width / _width) * _height);
        },
        (error) => console.log('fetch error', error),
      );
  }, [cover.url_pre, width, height]);

  return (
    <View style={StyleSheet.compose(style.card, !isFirstColumn && style.ml4)}>
      <FastImage
        style={StyleSheet.compose(style.preImg, { height })}
        resizeMode={FastImage.resizeMode.stretch}
        source={{ uri: cover.url_pre, headers: { referer: 'https://www.xiaohongshu.com/' } }}
        onLoad={() => console.log('load success')}
      />
      <View style={style.content}>
        <Text style={style.titleText} numberOfLines={2}>
          {display_title}
        </Text>
        <View style={style.footer}>
          <View style={style.userWrapper}>
            <FastImage
              style={style.avatar}
              source={{ uri: user.avatar, headers: { referer: 'https://www.xiaohongshu.com/' } }}
            />
            <Text style={style.nickname}>{user.nickname}</Text>
          </View>
          <View style={style.likeWrapper}>
            <TouchableOpacity
              style={style.likedButton}
              activeOpacity={1}
              onPress={() => {
                setLiked((prev) => !prev);
                setLikedCount((prev) => `${Number(prev) + (liked ? -1 : 1)}`);
              }}>
              {liked ? getSvg(fillHeartSvg(), '14', '14') : getSvg(heartSvg(), '14', '14')}
            </TouchableOpacity>
            <Text style={style.likedCount}>{likedCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
