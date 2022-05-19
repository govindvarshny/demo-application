import KeyScreens from './KeyScreens';
import ScreenTabs from '../ScreenTabs';
import ScreenHome from '../ScreenHome';
import ScreenSettings from '../ScreenSettings';
import ScreenProfile from '../ScreenProfile';
import ScreenLanguages from '../ScreenLanguages';
const AllScreensAfterLogin = [
  {
    name: KeyScreens.tabs,
    component: ScreenTabs,
  },
  {
    name: KeyScreens.home,
    component: ScreenHome,
  },
  {
    name: KeyScreens.settings,
    component: ScreenSettings,
  },
  {
    name: KeyScreens.languages,
    component: ScreenLanguages,
  },
  {
    name: KeyScreens.profile,
    component: ScreenProfile,
  },
];
export default AllScreensAfterLogin;
