import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabBarWrapper: {
    flexDirection: 'row',
    shadowOffset: { height: 4, width: 0 },
    shadowColor: '#fff',
    shadowOpacity: 0.5,
  },
  tabBarBtn: {
    flex: 1,
    height: 52,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  activeBtn: {
    transform: [{ scale: 1.2 }],
  },
  tabBarNormalText: {
    color: '#222',
    marginBottom: 6,
  },
  tabBarActiveText: {
    color: '#000',
    marginBottom: 6,
    fontWeight: 'bold',
  },
});
