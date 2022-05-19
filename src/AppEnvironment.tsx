import Config from 'react-native-config';
const AppEnvironment = {
  NAME: Config.ENVIRONMENT_NAME,
  URL_API: Config.URL_API,
  SENTRY_DSN: Config.SENTRY_DSN,
};
export default AppEnvironment;
