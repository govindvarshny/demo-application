import React, {useEffect} from 'react';
import AppSentry from './AppSentry';
import codePush from 'react-native-code-push';
import MainStack from './MainStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {useColorScheme} from 'react-native';
//import AppEnvironment from './AppEnvironment';
let App = () => {
  const currentTheme = useColorScheme();
  //const isHermes = () => !!global.HermesInternal;
  useEffect(() => {
    AppSentry.start();
    //alert(AppEnvironment.NAME);
    // setTimeout(() => {
    //   throw new Error('test crash android production');
    // }, 60000);
  }, []);
  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <ActionSheetProvider>
          <MainStack currentTheme={currentTheme} />
        </ActionSheetProvider>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
};
let codePushOptions = {
  updateDialog: true, // show button IGNORE when not use mode -m (-m is force update)
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  //Message: An update is available that must be installed.
  //Ref message: https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md
};
App = codePush(codePushOptions)(App);
export default App;
