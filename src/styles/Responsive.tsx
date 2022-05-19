import {Dimensions, Platform} from 'react-native';
import {isIPhoneX} from 'react-native-status-bar-height';
import {DeviceInfo} from '~/utils/UtilDevice';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_TABLET = DeviceInfo.isTablet;
//@ts-ignore
export const IS_PAD = Platform.isPad;

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH_RATIO = WIDTH > 375 ? 1 : WIDTH / 375;
export const HEIGHT_GRID_IMAGE = 190 * WIDTH_RATIO;
export const HEIGHT_DEFAULT_NAVBAR = IS_PAD
  ? 100
  : isIPhoneX()
  ? 50
  : IS_ANDROID
  ? 50
  : 60;
