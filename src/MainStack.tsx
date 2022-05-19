import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import lodash from 'lodash';
import i18n, {setLanguage} from './Translate';
import AppEnvironment from './AppEnvironment';
import SplashScreen from 'react-native-splash-screen';
import AllScreensAfterLogin from './screens/constant/AllScreensAfterLogin';
import AllScreensBeforeLogin from './screens/constant/AllScreensBeforeLogin';
import {getLanguageStore, getUserStore} from './local_store/StoreUser';
import {ColorSchemeName} from 'react-native';
import {Themes} from './themes/Themes';
import {I18nextProvider} from 'react-i18next';
import {reducerUser} from './context/reducers/ReducerUser';
import {initialUser} from './context/Initial';
import {AppContextAuth, funContextAuth} from './context/context/ContextAuth';
import {KeyAction} from './context/Key';
const Stack = createStackNavigator();
const headerMode = 'none';
const mode = 'card';
interface Props {
  currentTheme: ColorSchemeName;
}
//Test
const MainStack: React.FC<Props> = ({currentTheme}) => {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string>();
  /**
   * if isLoading is false then load data local done
   */
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    global.logout = contextAuth.logout;
    openApp();
  }, []);
  //reducerUser
  const [stateAuth, dispatchAuth] = useReducer(reducerUser, initialUser);
  //contextAuth
  const contextAuth = useMemo(
    () => funContextAuth(stateAuth, dispatchAuth),
    [stateAuth],
  );
  const callApiForInitData = async () => {};

  useEffect(() => {
    if (stateAuth.user) {
      callApiForInitData();
    }
  }, [stateAuth.user]);

  const openApp = async () => {
    /**
     *  Get setting from local storage and set language for translate
     */
    setLanguage(await getLanguageStore());

    /**
     * Check force logout and set user to state management
     */
    try {
      let user = await getUserStore();
      if (lodash.isObject(user)) {
        if (
          user.forceLogoutDataAtBuildNumber !== 1 ||
          user.environmentName !== AppEnvironment.NAME
        ) {
          await contextAuth.logout();
        } else {
          dispatchAuth({type: KeyAction.openApp, user: user});
        }
      }
    } catch (error) {
      console.log('### MainStack.openApp exception', error);
    }

    /**
     * Load data local done
     */
    setLoading(false);
  };

  const onReadyNavigationContainer = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
    console.log(
      'MainStack.onReadyNavigationContainer navigationRef.current',
      routeNameRef.current,
    );
  }, []);
  const onStateChangeNavigationContainer = useCallback(() => {
    const previous = routeNameRef.current;
    const current = navigationRef.current?.getCurrentRoute()?.name;
    if (previous !== current) {
      console.log(
        'MainStack.onStateChangeNavigationContainer Current Screen',
        current,
      );
    }
    routeNameRef.current = current;
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 330);
    }
  }, [isLoading]);
  //Auth flow: https://reactnavigation.org/docs/auth-flow
  if (isLoading) {
    //We haven't finished checking for the token yet
    return null;
  }
  return (
    <I18nextProvider i18n={i18n}>
      <AppContextAuth.Provider value={contextAuth}>
        <NavigationContainer
          theme={currentTheme === 'dark' ? Themes.dark : Themes.light}
          ref={navigationRef}
          onReady={onReadyNavigationContainer}
          onStateChange={onStateChangeNavigationContainer}
        >
          <Stack.Navigator headerMode={headerMode} mode={mode}>
            {/* {stateAuth.user ? (
              <>
                {AllScreensAfterLogin.map(({name, component}, index) => (
                  <Stack.Screen key={index} name={name} component={component} />
                ))}
              </>
            ) : (
              <> */}
                {AllScreensBeforeLogin.map(({name, component}, index) => (
                  <Stack.Screen key={index} name={name} component={component} />
                ))}
              {/* </>
            )} */}
          </Stack.Navigator>
        </NavigationContainer>
      </AppContextAuth.Provider>
    </I18nextProvider>
  );
};
export default MainStack;
