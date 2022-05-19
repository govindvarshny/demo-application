import {ResponseBase} from '~/api/types/Response';
import i18n from '~/Translate';
import {StatusHttp} from '../constant/StatusResponse';
import {isArray, isObject, isString, isFunction} from 'lodash';
/**
 * @description Mappings code, msg, dataList from response api.
 * or force logout case token UNAUTHORIZED
 * @param status
 * @param json
 * @returns ResponseBase
 */
export function getResponseDataMappings(
  status: string,
  json?: ResponseBase,
): ResponseBase {
  let result: ResponseBase = {
    status: status,
    code: isString(json?.code) ? json?.code : undefined,
    msg: isString(json?.msg) ? json?.msg : undefined,
    dataList:
      isObject(json?.dataList) || isArray(json?.dataList)
        ? json?.dataList
        : undefined,
  };
  if (result.msg === undefined && result.code === undefined) {
    result.msg = i18n.t('server_no_return_msg_code');
  } else {
    if (result.msg === undefined) {
      result.msg = i18n.t('server_no_return_msg');
    } else {
      if (result.code === undefined) {
        result.msg = i18n.t('server_no_return_code');
      }
    }
  }
  switch (status) {
    case StatusHttp.NETWORK_LOST:
      result.msg = i18n.t('network_lost');
      break;
    case StatusHttp.NETWORK_ERROR:
      result.msg = i18n.t('network_error');
      break;
    default:
      break;
  }
  if (status === StatusHttp.UNAUTHORIZED) {
    try {
      if (isFunction(global.logout)) {
        global.logout();
      }
    } catch (error) {
      console.log('### ResponseData logout exception', error);
    }
  }
  return result;
}
