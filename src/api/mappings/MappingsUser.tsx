import lodash from 'lodash';
import AppEnvironment from '~/AppEnvironment';
import {AccountTypeID} from '../constant/Account';
import {PropsUser} from '../types/Props';

/**
 * @description Get user valid
 * @param user
 * @returns PropsUser
 */
export function getUserMappings(user: PropsUser): PropsUser {
  let temp = getUserDefault();
  try {
    if (!lodash.isObject(user)) {
      return temp;
    }
    if (lodash.isString(user.user_id)) {
      temp.user_id = user.user_id;
    }
    if (lodash.isString(user.user_name)) {
      temp.user_name = user.user_name;
    }
    if (lodash.isString(user.user_role)) {
      temp.user_role = user.user_role;
    }
    if (lodash.isString(user.user_token)) {
      temp.user_token = user.user_token;
    }
  } catch (error) {
    console.log('### MappingsUser.getUserValid Exception', error);
  }
  return temp;
}
//Get user Default
export function getUserDefault(): PropsUser {
  return {
    user_id: '',
    user_name: '',
    user_role: '',
    user_token: '',
    avatars: [],
    /*
      For In the Future:
      - accountTypeId: server not at save, only save local.
      - In the future has login facebook, google...
    */
    accountTypeId: AccountTypeID.INTERNAL,
    /*
      For user update app:
      - forceLogoutDataAtBuildNumber: server not at save, only save at local.
      - when use update app to new version,
      if data local conflict with new version then force logout.
    */
    forceLogoutDataAtBuildNumber: 1,
    /*
      For develop change environment build:
      - environmentName: server not at save, only save at local.
      - if when develop change environment then force.
    */
    environmentName: AppEnvironment.NAME,
  };
}
