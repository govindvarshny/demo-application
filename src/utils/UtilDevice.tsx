import {Dimensions, Platform, PixelRatio} from 'react-native';
import * as Device from 'react-native-device-info';
import lodash from 'lodash';
export const PIXEL_RATIO = PixelRatio.get();
let width = Dimensions.get('screen').width;
let height = Dimensions.get('window').height;
let heightFull = Dimensions.get('screen').height;
let widthPixel = PixelRatio.getPixelSizeForLayoutSize(width);
let heightPixel = PixelRatio.getPixelSizeForLayoutSize(heightFull);
let pixelPerInch = 0;
let inch = 0;
if (Platform.OS === 'ios') {
  // IOS is PPI = Pixel Per Inch
  pixelPerInch =
    Math.sqrt(width * width + heightFull * heightFull) / PixelRatio.get();
  let pixelPerDevice = Math.sqrt(
    widthPixel * widthPixel + heightPixel * heightPixel,
  );
  inch = pixelPerDevice / pixelPerInch;
} else {
  // Android is DPI = Dot Per Inch (Screen Density)
  inch = Math.sqrt(width * width + heightFull * heightFull) / 160;
  pixelPerInch =
    Math.sqrt(widthPixel * widthPixel + heightPixel * heightPixel) / inch;
}
export function getSystemVersionFirstNumber(version: string): number {
  try {
    if (!lodash.isNil(version)) {
      let temp = parseInt(version, 10);
      if (!lodash.isNil(temp) && !isNaN(temp)) {
        return temp;
      }
    }
  } catch (e) {}
  return 0;
}
export function widthPercent(percent: number) {
  return (width * percent) / 100;
}
export function heightPercent(percent: number): number {
  return (height * percent) / 100;
}
export const DeviceInfo = {
  deviceToken: null, // token push notification
  deviceId: Device.getUniqueId(),
  versionApp: Device.getVersion(),
  buildName: Device.getBuildNumber(),
  versionOs: Device.getSystemVersion(),
  nameOs: Device.getSystemName(),
  versionOsFirstNumber: getSystemVersionFirstNumber(Device.getSystemVersion()),
  deviceModel: Device.getModel(),
  deviceName: Device.getDeviceNameSync(),
  isTablet: Device.isTablet(),
  //screen
  width: width,
  height: height,
  heightFull: heightFull,
  widthPixel: widthPixel,
  heightPixel: heightPixel,
  pixelRatio: PixelRatio.get(),
  pixelPerInch: pixelPerInch,
  inch: parseFloat(inch.toFixed(1)),
};
export const ScreenInfo = {
  //screen
  width: width,
  height: height,
  heightFull: heightFull, //heightFull is height of status bar = 0
  widthPixel: widthPixel,
  heightPixel: heightPixel,
  pixelRatio: PixelRatio.get(),
  pixelPerInch: pixelPerInch,
  inch: parseFloat(inch.toFixed(1)),
};
