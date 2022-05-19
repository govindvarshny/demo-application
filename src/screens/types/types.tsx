import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
export interface PropsScreen {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any, any>;
}
