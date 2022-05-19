import {Platform} from 'react-native';
import {ScreenInfo} from '../utils/UtilDevice';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {HEIGHT_TOTAL, IS_FULL_SCREEN_ANDROID} from './Header';
export const MARGIN = 20;
//Height screen has header
export const HEIGHT_HAS_HEADER =
  ScreenInfo.height -
  HEIGHT_TOTAL -
  (Platform.OS === 'ios'
    ? StaticSafeAreaInsets.safeAreaInsetsBottom
    : getStatusBarHeight(IS_FULL_SCREEN_ANDROID));
//Height screen no header
export const HEIGHT_NO_HEADER =
  ScreenInfo.height -
  (Platform.OS === 'ios'
    ? StaticSafeAreaInsets.safeAreaInsetsBottom
    : getStatusBarHeight(IS_FULL_SCREEN_ANDROID));
