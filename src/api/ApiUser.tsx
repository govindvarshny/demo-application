// import ApiBase from './base/ApiBase';
// import {getUserMappings} from './mappings/MappingsUser';
import {RequestLogin} from './types/request';
import {ResponseLogin} from './types/Response';
/**
 * @param body
 * @returns ResponseLogin
 */
export async function login(_body: RequestLogin): Promise<ResponseLogin> {
  return {
    code: '1',
    msg: '1',
    status: '1',
    dataList: {
      user_id: '1',
      user_name: '1',
      user_role: '1',
      user_token: '1',
      accountTypeId: '1',
      forceLogoutDataAtBuildNumber: 1,
      environmentName: '1',
    },
  };
  // const response: any = await ApiBase.requestBody(
  //   ApiBase.getUrlBase() + 'login',
  //   ApiBase.getPost(),
  //   body,
  // );
  // response.dataList = getUserMappings(response.dataList);
  // return response;
}
