import { StyleSheet } from 'react-native';
import { commonStyle } from '../Demo/common/style';

export default StyleSheet.create({
  container: {
    ...commonStyle.container,
    paddingHorizontal: 12,
    paddingTop: 120,
    paddingBottom: 45,
    justifyContent: 'space-between',
  },
  logo: {
    width: 180,
    height: 90,
    resizeMode: 'contain',
  },
  loginFooter: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '15%',
  },
  phoneButton: {
    flexDirection: 'row',
    height: 36,
    borderRadius: 18,
    width: '100%',
    backgroundColor: '#ff0500',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 72,
  },
  buttonText: {
    color: '#fff',
    lineHeight: 36,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export const PhoneLoginStyle = StyleSheet.create({
  root: {
    ...commonStyle.container,
    paddingHorizontal: 20,
  },
  headerBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  close: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  help: {
    color: '#999',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 12,
  },
  title: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    color: '#d6d6d6',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 24,
  },
  assistContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  switch: {
    flexDirection: 'row',
  },
  exchangeIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 2,
  },
  exchangeText: {
    color: '#223550',
  },
  loginButton: {
    backgroundColor: '#ff2442',
    height: 42,
    width: '100%',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
  },
  disable: {
    backgroundColor: '#f5f5f5',
  },
});
