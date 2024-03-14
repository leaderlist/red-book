import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface TestData {
  name: string;
}

export interface ProtocolItem {
  text: string;
  url: string;
}

export type NavigationProps = NativeStackNavigationProp<ParamListBase, string, undefined>;
export type RouteProps = RouteProp<ParamListBase, string>;
