import {KeyAction} from '../Key';
import {PropsActionUser, PropsStateUser} from '../props/PropsAuth';
export function reducerUser(
  prevState: PropsStateUser,
  action: PropsActionUser,
): PropsStateUser {
  switch (action.type) {
    case KeyAction.login:
    case KeyAction.openApp:
    case KeyAction.logout:
      return {
        ...prevState,
        user: action.user,
      };
    default:
      return prevState;
  }
}
