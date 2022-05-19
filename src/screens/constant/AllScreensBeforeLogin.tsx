import KeyScreens from './KeyScreens';
import ScreenLogin from '../ScreenLogin';
import ScreenList from '../ScreenList';
import ScreenUpdate from '../ScreenUpdate';
const AllScreensBeforeLogin = [
  {
    name: KeyScreens.list,
    component: ScreenList,
  },
  {
    name: KeyScreens.update,
    component: ScreenUpdate,
  },
  {
    name: KeyScreens.login,
    component: ScreenLogin,
  },
];
export default AllScreensBeforeLogin;
