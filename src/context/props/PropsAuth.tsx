import {PropsUser} from '~/api/types/Props';
//User
export interface PropsStateUser {
  user?: PropsUser | null;
}
export interface PropsActionUser extends PropsStateUser {
  type: string;
}

export interface PropsContextAuth extends PropsStateUser {
  setUser: (user: PropsUser) => Promise<void>;
  logout: () => Promise<void>;
}
