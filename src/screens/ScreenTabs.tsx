import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
  BottomTabBarProps,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs';
import KeyScreens from './constant/KeyScreens';
import ScreenSettings from './ScreenSettings';
import KeyTabs from './constant/KeyTabs';
import {useTheme} from '@react-navigation/native';
import {ParamListBase} from '@react-navigation/routers';
import {LabelPosition} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {useTranslation} from 'react-i18next';
import ScreenHome from './ScreenHome';
import {ScreenInfo} from '~/utils/UtilDevice';

const headerMode = 'none';
const mode = 'card'; //https://reactnavigation.org/docs/stack-navigator/
//const transparentCard = false;
//import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
//const tabBarHeight = useBottomTabBarHeight();
//Tab one: create stack navigator
const StackNavigatorOne = createStackNavigator();
const StackTabOne: React.FC<
  StackScreenProps<ParamListBase> & {
    screenOptions?: StackNavigationOptions;
  }
> = (props) => {
  return (
    <StackNavigatorOne.Navigator
      headerMode={headerMode}
      mode={mode}
      //transparentCard={transparentCard}
      initialRouteName={KeyScreens.home}
      {...props}
    >
      <StackNavigatorOne.Screen
        options={{cardStyle: {backgroundColor: 'transparent'}}}
        name={KeyScreens.home}
        component={ScreenHome}
      />
    </StackNavigatorOne.Navigator>
  );
};
//Tab Two: create stack navigator
const StackNavigatorTwo = createStackNavigator();
const StackTabTwo: React.FC<
  StackScreenProps<ParamListBase> & {
    screenOptions?: StackNavigationOptions;
  }
> = (props) => {
  return (
    <StackNavigatorTwo.Navigator
      headerMode={headerMode}
      mode={mode}
      //transparentCard={transparentCard}
      initialRouteName={KeyScreens.settings}
      {...props}
    >
      <StackNavigatorTwo.Screen
        options={{cardStyle: {backgroundColor: 'transparent'}}}
        name={KeyScreens.settings}
        component={ScreenSettings}
      />
    </StackNavigatorTwo.Navigator>
  );
};
// Create bottom tab navigator
const BottomTabNavigator = createBottomTabNavigator();

interface PropsTabBarLabel {
  color: string;
  focused?: boolean;
  position?: LabelPosition;
  title?: string;
}
const TabBarLabel: React.FC<PropsTabBarLabel> = ({color, title}) => {
  return title ? (
    <Text numberOfLines={1} style={{...styles.tabLabel, color: color}}>
      {title}
    </Text>
  ) : null;
};
//Customize Tabbar
const CustomizeTabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = (
  props,
) => {
  /*
  const focusedOptions =
    props.descriptors[props.state.routes[props.state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  */

  /*
    Note that you cannot use the useNavigation hook inside the tabBar
    since useNavigation is only available inside screens.
    You get a navigation prop for your tabBar which you can use instead:
  */
  return <BottomTabBar {...props} />; //To check some special logic
};
//Example React.FC<StackScreenProps<ParamListBase...: https://github.com/react-navigation/react-navigation/blob/main/example/src/Screens/BottomTabs.tsx
const ScreenTabs: React.FC<StackScreenProps<ParamListBase, string>> = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <BottomTabNavigator.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.tabActiveTint,
        inactiveTintColor: theme.colors.tabInactiveTint,
        keyboardHidesTabBar: true, //Whether the tab bar is hidden when the keyboard opens. Defaults to false.
        allowFontScaling: false, //https://reactnavigation.org/docs/bottom-tab-navigator/#safeareainsets
        //safeAreaInsets: {bottom: 0},
        labelPosition: 'below-icon',
      }}
      initialRouteName={KeyTabs.one}
      tabBar={(props: BottomTabBarProps<BottomTabBarOptions>) => (
        <CustomizeTabBar {...props} />
      )}
    >
      {/* Tab 1*/}
      <BottomTabNavigator.Screen
        name={KeyTabs.one}
        component={StackTabOne}
        options={() => ({
          tabBarLabel: ({color}) => (
            <TabBarLabel color={color} title={t('home')} />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <View style={[styles.individualTabWrapper]}>
              <Image
                style={{width: size, height: size, tintColor: color}}
                resizeMode="contain"
                source={
                  focused
                    ? require('~/images/tab/home1.png')
                    : require('~/images/tab/home.png')
                }
              />
            </View>
          ),
          tabBarVisible: true,
        })}
      />
      {/* Tab 2*/}
      <BottomTabNavigator.Screen
        name={KeyTabs.two}
        component={StackTabTwo}
        options={() => ({
          tabBarLabel: ({color}) => (
            <TabBarLabel color={color} title={t('settings')} />
          ),
          tabBarIcon: ({focused, color, size}) => (
            <View style={[styles.individualTabWrapper]}>
              <Image
                style={{width: size, height: size, tintColor: color}}
                resizeMode="contain"
                source={
                  focused
                    ? require('~/images/tab/home1.png')
                    : require('~/images/tab/home.png')
                }
              />
            </View>
          ),
          tabBarVisible: true,
        })}
      />
    </BottomTabNavigator.Navigator>
  );
};
export default ScreenTabs;
const NUMBER = 2;
const WIDTH = ScreenInfo.width / NUMBER;
const styles = StyleSheet.create({
  tabLabel: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  individualTabWrapper: {
    //borderTopColor: 'red',
    //borderTopWidth: 0,
    width: WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'black',
  },
});
