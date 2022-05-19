import {isString} from 'lodash';
import moment from 'moment-timezone';
//Backend
export const SERVER_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'; // HH = 24h
export const SERVER_DATE_FORMAT = 'YYYY-MM-DD'; // HH = 24h
const SERVER_TIME_ZONE = 'GMT'; //mean is +0 document: https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a

//Display at mobile: depend design
const LOCAL_DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';
export const LOCAL_DATE_TIME_FORMAT_ORDER_RECEIPT = 'DD-MM-YYYY HH:mm';
export const LOCAL_DATE_FORMAT_ORDER_RECEIPT = 'DD-MM-YYYY';
export const LOCAL_DATE_TIME_FORMAT_ORDER = 'DD MMM yyyy';
export const LOCAL_DATE_TIME_FORMAT_PROMOTION = 'DD/MM/yyyy';
export const LOCAL_DATE_TIME_FORMAT_ORDER_FILTER = 'DD MMM YYYY';
export const LOCAL_DATE_FORMAT = 'YYYY-MM-DD';
export const LOCAL_DATE_INPUT_FORMAT = 'MM/DD/YY';
export const LOCAL_TIME_INPUT_FORMAT = 'HH:mm';
export const LOCAL_DATE_TIME_EXPIRED_FORMAT = 'MM/DD/yyyy hh:mm A';
export const LOCAL_FORMAT_NAME_DATE = 'ddd, MMM DD';
export const LOCAL_FORMAT_EXPIRED_DATE = 'MM/DD/YYYY';

//etc...

/**
 * @param dateTime DateTime | string | number | string
 */
export function isValid(dateTime: any): boolean {
  if (!dateTime) {
    return false;
  }
  try {
    return moment(dateTime).isValid();
  } catch (error) {
    console.log('### UtilDate.isValid error', error);
    return false;
  }
}

/**
 * @description convert from "time zone" of SERVER to "time zone" of CURRENT DEVICE
 * @param dateTimeSever DateTime | string | number | string
 * @example datTimeServer = '2018-07-17T10:00:00'
 * @param outputFormat default is LOCAL_DATE_TIME_FORMAT
 * @returns string
 */
export function convertToLocalDateTime(
  dateTimeSever: any,
  outputFormat?: string,
): string {
  try {
    if (!isValid(dateTimeSever)) {
      return '';
    }
    if (!isString(outputFormat)) {
      outputFormat = LOCAL_DATE_TIME_FORMAT;
    }
    /*
      Note: moment() = new Date();//current datetime of device

      moment.tz('2018-07-17T10:00:00', 'YYYY-MM-DDTHH:mm:ss', 'GMT')
      .local()
      .format('YYYY-MM-DDTHH')
      => "2018-07-17 17:00:00
    */
    return moment
      .tz(dateTimeSever, SERVER_DATE_TIME_FORMAT, SERVER_TIME_ZONE)
      .local()
      .format(outputFormat);
  } catch (error) {
    console.log('### UtilDate.convertToLocalDateTime', error);
    return '';
  }
}

/**
 * @description convert from "time zone" of CURRENT DEVICE to "time zone" of SERVER
 * @param dateTimeLocal DateTime | string | number | string
 * @example dateTimeLocal = new Date() or '2018-07-17 10:00:00'
 * @returns string
 */
export function convertToServerDateTime(dateTimeLocal: any): string {
  try {
    if (!isValid(dateTimeLocal)) {
      return '';
    }
    /*
      moment('2018-07-17T10:00:00', 'YYYY-MM-DDTHH:mm:ss').tz('GMT').format('YYYY-MM-DDTHH:mm:ss')
      => "2018-07-17T03:00:00"
    */
    return moment(dateTimeLocal, SERVER_DATE_TIME_FORMAT)
      .tz(SERVER_TIME_ZONE)
      .format(SERVER_DATE_TIME_FORMAT);
  } catch (error) {
    console.log('### UtilDate.convertToServerDateTime', error);
    return '';
  }
}

/**
 * @description format to date for send to server (not convert)
 * @param date DateTime | string | number | string
 * @returns SERVER_DATE_FORMAT
 */
export function formatToDateServer(date: any): string {
  try {
    return moment(date).format(SERVER_DATE_FORMAT);
  } catch (error) {
    console.log('### UtilDate.formatToDateServer', error);
    return '';
  }
}

/**
 * @description format from date time to BirthDay
 * @Note Important: birthday not time zone
 * @param dateTimeSever DateTime | string | number | string
 * @example datTimeServer = new Date() or '2018-07-17 10:00:00'
 * @returns string
 */
export function formatFromDateTimeToBirthDay(dateTimeLocal: any) {
  try {
    if (!isValid(dateTimeLocal)) {
      return 0;
    }
    let temp = moment(dateTimeLocal, SERVER_DATE_TIME_FORMAT);
    //temp.startOf('day'); // = set Hours(0,0,0,0)
    return temp.format(SERVER_DATE_FORMAT);
  } catch (e) {
    console.log('UtilDate.convertFromDateTimeToBirthDay', e, dateTimeLocal);
    return 0;
  }
}

/**
 * @description get DATE format locale (of current device)
 * @returns string
 * @example Device A: 'YYYY/MM/DD'
 * @example Device B: YYYY-MM-DD'
 */
export function getDateFormatLocale() {
  try {
    return moment.localeData().longDateFormat('L');
  } catch (error) {
    console.log('UtilDate.getDateFormatLocale Exception', error);
  }
  return 'YYYY-MM-DD'; //default
}

/**
 *
 * @returns string
 * @example return '2018-07-17T10:00:00'
 */
export function getCurrentServerDatetime(): string {
  try {
    return moment().tz(SERVER_TIME_ZONE).format(SERVER_DATE_TIME_FORMAT);
  } catch (error) {
    console.log('### UtilDate.getCurrentServerDatetime', error);
    return '';
  }
}

/**
 * @description SEND TO SERVER
 * @param  dateFormat DateTime | string | number | string
 * @param  type number (1: day, 2: week , 3 : month, 4: quarter, 5: custom date )
 * @returns date Date
 */

export const convertToServerDateTimeCustom = (
  type: number,
  dateFormat?: any,
) => {
  switch (type) {
    case 1:
      return moment().tz(SERVER_TIME_ZONE).format(SERVER_DATE_TIME_FORMAT);
    case 2:
      return moment()
        .add(-1, 'week')
        .tz(SERVER_TIME_ZONE)
        .format(SERVER_DATE_TIME_FORMAT);
    case 3:
      return moment()
        .add(-1, 'month')
        .tz(SERVER_TIME_ZONE)
        .format(SERVER_DATE_TIME_FORMAT);
    case 4:
      return moment()
        .add(-1, 'Q')
        .tz(SERVER_TIME_ZONE)
        .format(SERVER_DATE_TIME_FORMAT);
  }
  return moment(dateFormat)
    .tz(SERVER_TIME_ZONE)
    .format(SERVER_DATE_TIME_FORMAT);
};

/**
 * @description format from date time for display (not convert)
 * @param date DateTime | string | number | string
 * @returns string
 */
export function formatShowUI(
  date: any,
  formatOutput = LOCAL_FORMAT_NAME_DATE,
): string {
  try {
    return moment(date).format(formatOutput);
  } catch (error) {
    console.log('### UtilDate.formatShowUI', error);
    return '';
  }
}

/**
 * @description format from date time for display (not convert)
 * @param  from DateTime | string | number | string
 * @param  to DateTime | string | number | string
 * @returns boolean
 */
export function compareTwoTime(
  from: any,
  to: any,
  format = LOCAL_DATE_TIME_FORMAT_PROMOTION,
) {
  try {
    const fromDate = moment(from, format);
    const toDate = moment(to, format);
    return fromDate.isSameOrBefore(toDate, 'day');
  } catch (e) {
    return false;
  }
}

/**
 * @description check expired with current date
 * @param dateTime DateTime | string | number | string
 * @returns boolean
 */
export function isExpired(dateTime: any): boolean {
  if (!isValid(dateTime)) {
    return false;
  }
  try {
    //moment() = new Date()
    return moment().isAfter(dateTime);
  } catch (error) {
    console.log('### UtilDate.isExpired error', error);
    return false;
  }
}
