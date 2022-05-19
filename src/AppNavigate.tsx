import {
  TabActions,
  CommonActions,
  PartialRoute,
} from '@react-navigation/native';
import {Route} from '@react-navigation/routers';
import {StackNavigationProp} from '@react-navigation/stack';
export class AppNavigate {
  static next(
    navigation: StackNavigationProp<any>,
    keyScreen: string,
    objectParams = {},
  ) {
    navigation.navigate(keyScreen, objectParams);
  }
  static back(navigation: StackNavigationProp<any>) {
    navigation.pop();
  }
  static popToTop(navigation: StackNavigationProp<any>) {
    navigation.popToTop();
  }
  static replace(
    navigation: StackNavigationProp<any>,
    keyScreen: string,
    objectParams = {},
  ) {
    navigation.replace(keyScreen, objectParams);
  }
  static changeTab(navigation: StackNavigationProp<any>, tabName: string) {
    const jumpToAction = TabActions.jumpTo(tabName);
    navigation.dispatch(jumpToAction);
  }
  /*
    Example:
    index = 1
    routes = [
            { name: 'ScreenA' },
            {
              name: 'ScreenB',
              params: { email: 'test@gmail.com' },
            }
          ]
  */
  static replaceToIndex(
    navigation: StackNavigationProp<any>,
    index: number,
    routes: PartialRoute<Route<any>>[],
  ) {
    navigation.dispatch(
      CommonActions.reset({
        index: index,
        routes: routes,
      }),
    );
  }
}
/*
  //should not be used push
  static push(
    navigation: StackNavigationProp<any>,
    keyScreen: string,
    objectParams = {},
  ) {
    navigation.push(keyScreen, objectParams);
  }
*/
