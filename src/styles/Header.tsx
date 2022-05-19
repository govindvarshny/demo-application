import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Platform} from 'react-native';
export const IS_FULL_SCREEN_ANDROID = false; // ios alway full screen
export const HEIGHT_STATUS_BAR = getStatusBarHeight(!IS_FULL_SCREEN_ANDROID); // ios alway > 0
export const HEIGHT_CONTENT = Platform.OS === 'ios' ? 33 : 44; // 44 because https://qmz.com.au/itman-iOS-god.html
export const HEIGHT_TOTAL = HEIGHT_STATUS_BAR + HEIGHT_CONTENT;
export const WIDTH_BUTTON = 50;
export const TEXT_SIZE_TITLE = 17;
export const ICON_SIZE = 25;
export const PADDING_BUTTON_HEADER = 7;
