import { shallowEqual } from 'react-redux';

type ShallowEqualParams = Parameters<typeof shallowEqual>;

/**
 * @description: 手动收集依赖，获取可选比较的（而不是全量比较）的shallowEqual函数
 * @param keys?: string[] 可选地当前组件依赖的state的key
 * @return shallowEqual函数，正常放在useSelector函数的第二个参数位置即可
 */
export const getShallowEqual = (keys?: string[]) => {
  if (keys) {
    return (objA: ShallowEqualParams[0], objB: ShallowEqualParams[1]) => keys.every((key) => is(objA[key], objB[key]));
  }
  return (objA: ShallowEqualParams[0], objB: ShallowEqualParams[1]) => shallowEqual(objA, objB);
};

function is(x: unknown, y: unknown) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
