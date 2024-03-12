import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 4,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  settingIcon: {
    marginLeft: 6,
  },
  searchIcon: {
    marginRight: 6,
  },
  barWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  tabBarButton: {
    height: 40,
    width: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonText: {
    color: '#2e2e2e',
  },
  activeText: {
    color: '#000', // 设置你想要的激活文本颜色
    fontWeight: 'bold',
  },
});
