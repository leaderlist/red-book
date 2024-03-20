import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 2,
  },
  content: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  ml4: {
    marginLeft: 4,
  },
  preImg: {
    width: '100%',
    resizeMode: 'stretch',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  titleText: {
    color: '#222',
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 16,
    width: 16,
    marginRight: 4,
    borderRadius: 8,
  },
  nickname: {
    fontSize: 12,
    lineHeight: 16,
  },
  likeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likedButton: {
    alignItems: 'center',
    marginTop: 1,
    marginRight: 2,
  },
  likedCount: {
    fontSize: 12,
    lineHeight: 16,
  },
});
