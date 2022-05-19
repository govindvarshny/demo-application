import * as Sentry from '@sentry/react-native';
import AppEnvironment from '~/AppEnvironment';
//import {getUserStore} from './local_store';
/*
  Search email in sentry
  input: user.id:test@gmail.com
  set user: https://docs.sentry.io/data-management/sensitive-data/
*/
const IS_RELEASE = !__DEV__;
export default class AppSentry {
  static async start() {
    try {
      if (IS_RELEASE) {
        Sentry.init({
          dsn: AppEnvironment.SENTRY_DSN,
        });
        console.log('AppSentry start with build RELEASE');
        /*
        const user = await getUserStore();
        if (user) {
          AppSentry.setUser(user.profile.email);
        }
        */
      } else {
        console.log('AppSentry not start with build DEBUG');
      }
    } catch (error) {
      console.log('### AppSentry.start', 'Exception', error);
    }
  }
  static setUser(email: string) {
    try {
      if (IS_RELEASE) {
        if (email && email.length > 0) {
          const emailLowerCase = email.toLowerCase();
          Sentry.setUser({
            id: emailLowerCase,
            email: emailLowerCase,
            username: emailLowerCase,
          });
        }
      }
    } catch (error) {
      console.log('### AppSentry.setUser', 'Exception', error);
    }
  }
}
