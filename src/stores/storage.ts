import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const setStorage = <T>(key: string, value: T) => {
  try {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    ToastAndroid.show('数据保存失败，请重试', ToastAndroid.SHORT);
  }
};

export const getStorage = async <T>(key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as unknown as T) : ({} as T);
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

export const multiGetStorage = (keys: string[]) => {
  try {
    return AsyncStorage.multiGet(keys);
  } catch (e) {
    console.log('multiGetStorage error', e);
    return Promise.resolve([]) as ReturnType<typeof AsyncStorage.multiGet>;
  }
};
