import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const setStorage = <T>(key: string, value: T) => {
  try {
    AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    ToastAndroid.show('数据保存失败，请重试', ToastAndroid.SHORT);
  }
};

export const getStorage = <T>(key: string) => {
  try {
    return AsyncStorage.getItem(key) as unknown as Promise<T>;
  } catch (e) {
    ToastAndroid.show('获取数据失败，请重试', ToastAndroid.SHORT);
    console.log(e);
    return Promise.reject({});
  }
};

export const clearStorage = () => {
  try {
    AsyncStorage.clear();
  } catch (e) {
    ToastAndroid.show('数据清除失败，请重试', ToastAndroid.SHORT);
  }
};

export const removeStorageByKey = (key: string) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (e) {
    ToastAndroid.show('数据删除失败，请重试', ToastAndroid.SHORT);
  }
};
