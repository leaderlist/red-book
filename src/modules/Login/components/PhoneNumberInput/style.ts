import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e9e9',
  },
  dialArea: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dialNumber: {
    color: '#999',
    fontSize: 18,
  },
  iconTriangle: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginLeft: 4,
    marginRight: 10,
    marginTop: 2,
  },
  input: {
    flex: 1,
    height: 32,
    paddingVertical: 4,
    fontSize: 18,
    paddingRight: 30,
  },
  clearIcon: {
    position: 'absolute',
    right: 3,
    bottom: 10,
  },
});
