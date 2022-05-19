import {PropsFrame, PropsUser} from './Props';

export interface ResponseBase {
  /* Server response */
  code: string | undefined;
  msg: string | undefined;
  dataList: any[] | object | undefined;
  /* Local */
  status: string; //is status https
}
export interface ResponseLogin extends ResponseBase {
  dataList: PropsUser;
}
export interface ResponseFrames extends ResponseBase {
  dataList: PropsFrame[];
}
