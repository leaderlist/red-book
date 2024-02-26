import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#010101a0',
  },
  moveContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#a1a1a170',
  },
  modalView: {
    width: '100%',
    height: 205,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    opacity: 1,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6e6e6',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  linkText: {
    fontSize: 10,
    color: '#19355d',
  },
  agree: {
    backgroundColor: 'red',
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  agreeText: {
    color: 'white',
  }
});
