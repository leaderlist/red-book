import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollWrapper: {
    height: 30,
  },
  categoryWrapper: {
    overflow: 'scroll',
  },
  categoryItem: {
    width: 90,
    height: 30,
  },
  active: {
    color: '#000', // 设置你想要的激活文本颜色
    fontWeight: 'bold',
  },
  normal: {
    color: '#2e2e2e',
  },

  barWrapper: {
    height: 30,
  },
  tabBarContainer: {
    height: 30,
  },
  tabBarButton: {
    height: 30,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#2e2e2e',
    fontSize: 16,
  },
  activeText: {
    color: '#000', // 设置你想要的激活文本颜色
    fontWeight: 'bold',
  },
  cardList: {
    paddingHorizontal: 6,
  },
});
