import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#010101a0',
  },
  modalView: {
    width: '100%',
    height: 205,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    opacity: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343434',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    bottom: 18,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  content: {

  },
  protocol: {},
});
