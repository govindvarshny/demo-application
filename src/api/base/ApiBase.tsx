import {Platform} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import RNFetchBlob from 'rn-fetch-blob';
import AppConfig from '~/AppConfig';
import AppEnvironment from '../../AppEnvironment';
import {getUserStore} from '~/local_store/StoreUser';
import {ResponseBase} from '../types/Response';
import {StatusHttp} from '../constant/StatusResponse';
import {getResponseDataMappings} from '../mappings/MappingsResponseData';
const configApi = {
  trusty: false,
  timeout: AppConfig.TIME_OUT_RESPONSE_API,
};
export default class ApiBase {
  static token: string | null;
  static setToken(userToken: string | null): void {
    this.token = userToken;
  }
  static getUrlBase() {
    return AppEnvironment.URL_API;
  }
  static async getToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    } else {
      const user = await getUserStore();
      this.token = user ? user.user_token : null;
      return this.token;
    }
  }
  static getGet() {
    return 'GET';
  }
  static getPost() {
    return 'POST';
  }
  static getPut() {
    return 'PUT';
  }
  static getDelete() {
    return 'DELETE';
  }
  static getHeader(): object {
    return {
      //'Accept-Encoding': 'gzip, deflate',// bug android: response.json() exception
      'Content-Type': 'application/json; charset=utf-8',
      os: Platform.OS,
    };
  }
  static async getHeaderToken(): Promise<object> {
    const token = await this.getToken();
    return {
      ...this.getHeader(),
      Authorization: token ? token : undefined,
    };
  }
  static async request(
    fullPath: string,
    method: any, //string
  ): Promise<ResponseBase> {
    console.log('>>> ApiBase.request', fullPath, method);
    return await this.requestFull(fullPath, method, undefined, undefined);
  }
  static async requestHeader(
    fullPath: string,
    method: any, //string
    header: any, //object
  ): Promise<ResponseBase> {
    console.log('>>> ApiBase.request', fullPath, method, header);
    return await this.requestFull(fullPath, method, header, undefined);
  }
  static async requestBody(
    fullPath: string,
    method: any, //string
    body: any, //object
  ): Promise<ResponseBase> {
    console.log('>>> ApiBase.request', fullPath, method, body);
    return await this.requestFull(fullPath, method, undefined, body);
  }
  static async requestFull(
    fullPath: string,
    method: any, //string
    header: any, //object
    body: any, //object
  ): Promise<ResponseBase> {
    let isOk = true;
    const state = await NetInfo.fetch();
    if (!state?.isConnected) {
      isOk = false;
      throw getResponseDataMappings(StatusHttp.NETWORK_LOST);
    }
    try {
      let response = null;
      fullPath = encodeURI(fullPath);
      response = await RNFetchBlob.config(configApi).fetch(
        method,
        fullPath,
        header ? header : await this.getHeaderToken(),
        body ? JSON.stringify(body) : undefined,
      );
      const status: string = response.info().status.toString();
      let json;
      try {
        json = await response.json();
        console.log(
          '<<< ApiBase.response',
          fullPath,
          'status ' + status,
          'json',
          json,
        );
      } catch (errorJson) {
        console.log(
          '<<< ApiBase.response response.json() exception',
          fullPath,
          'status ' + status,
          errorJson,
        );
      }

      if (status === StatusHttp.OK) {
        return getResponseDataMappings(status, json);
      } else {
        isOk = false;
        throw getResponseDataMappings(status, json);
      }
    } catch (error) {
      console.log('~~~ ApiBase exception', fullPath, error);
      if (!isOk) {
        throw error;
      } else {
        throw getResponseDataMappings(StatusHttp.NETWORK_ERROR);
      }
    }
  }
}
