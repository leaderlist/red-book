import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    marginTop: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e9e9',
  },
  input: {
    paddingVertical: 6,
    fontSize: 18,
    flex: 1,
    marginRight: 36,
    marginTop: 1,
  },
  clearIcon: {
    position: 'absolute',
    right: 6,
    bottom: 10,
    width: 16,
    height: 16,
    marginRight: 28,
    flex: 1,
  },
  eyeIcon: {
    marginTop: 14,
  },
});
