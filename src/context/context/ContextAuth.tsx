import {createContext, Dispatch, useContext} from 'react';
import ApiBase from '~/api/base/ApiBase';
import {PropsUser} from '~/api/types/Props';
import {setUserStore} from '~/local_store/StoreUser';
import {KeyAction} from '../Key';
import {
  PropsActionUser,
  PropsContextAuth,
  PropsStateUser,
} from '../props/PropsAuth';

export const AppContextAuth = createContext<PropsContextAuth>({
  setUser: async (): Promise<void> => {},
  logout: async (): Promise<void> => {},
  user: null,
});
/**
 * @example const {user, setUser, logout} = useAppContextAuth();
 */
export function useAppContextAuth() {
  const context = useContext(AppContextAuth);
  if (!context) {
    throw new Error('### useAppContextAuth must be used with AppProvider!');
  }
  return context;
}

export function funContextAuth(
  state: PropsStateUser,
  dispatch: Dispatch<PropsActionUser>,
  //contextFrames: PropsContextFrames,
): PropsContextAuth {
  return {
    setUser: async (user: PropsUser): Promise<void> => {
      await setUserStore(user);
      dispatch({type: KeyAction.login, user: user});
    },
    logout: async (): Promise<void> => {
      //User
      await setUserStore(null);
      ApiBase.setToken(null);
      dispatch({type: KeyAction.logout, user: null});
    },
    user: state.user,
  };
}
