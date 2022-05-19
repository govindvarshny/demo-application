import {
  View,
  Keyboard,
  StyleSheet,
  Platform,
  BackHandler,
  RefreshControl,
  ScrollView,
  LayoutRectangle,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input} from '~/styles';
import Header from '~/view/header/Header';
import HeaderButton from '~/view/header/HeaderButton';
import {ExtendTheme, useNavigation, useTheme} from '@react-navigation/native';
import {AppNavigate} from '~/AppNavigate';
import Loading from '~/view/Loading';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMemo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';

interface Props {
  children: React.ReactNode;
  //SafeArea
  isUseSafeAreaBottom?: boolean;
  //Title
  title?: string;
  //Left
  isShowLeft?: boolean;
  textLeft?: string;
  sourceIconLeft?: any; //icon: require('path asset')
  uriIconLeft?: string; //or icon: http, https
  actionLeft?: () => void;
  //Right2
  textRight2?: string;
  sourceIconRight2?: any; //icon: require('path asset')
  uriIconRight2?: string; //or icon: http, https
  actionRight2?: () => void;
  styleViewIconRight2?: ViewStyle;
  //Right
  textRight?: string;
  sourceIconRight?: any; //icon: require('path asset')
  uriIconRight?: string; //or icon: http, https
  actionRight?: () => void;
  styleViewIconRight?: ViewStyle;
  //Loading
  isLoading?: boolean;
  isLoadingRefreshControl?: boolean;
  actionRefreshControl?: () => void;
  //option
  isShowHeader?: boolean;
  isDisableScrollView?: boolean;
  viewBottom?: any;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | undefined;
  callbackSizeHeader?: (ret: LayoutRectangle) => void;
  contentContainerStyle?: ViewStyle;
  extraScrollHeight?: number;
}
const ScreenBase: React.FC<Props> = ({
  children, //children is prop default of React, no need set
  //SafeArea
  isUseSafeAreaBottom = true,
  //Title
  title,
  //Left
  isShowLeft = true,
  textLeft,
  sourceIconLeft = require('~/images/back.png'), //icon: require('path asset')
  uriIconLeft, //or icon: http, https
  actionLeft,
  //Right2
  textRight2,
  sourceIconRight2, //icon: require('path asset')
  uriIconRight2, //or icon: http, https
  actionRight2,
  styleViewIconRight2,
  //Right
  textRight,
  sourceIconRight, //icon: require('path asset')
  uriIconRight, //or icon: http, https
  actionRight,
  styleViewIconRight,
  //Loading
  isLoading = false,
  isLoadingRefreshControl = false,
  actionRefreshControl,
  //option
  isShowHeader = true,
  isDisableScrollView = false,
  viewBottom,
  keyboardShouldPersistTaps = 'always',
  callbackSizeHeader = undefined,
  contentContainerStyle,
  extraScrollHeight = Input.HEIGHT * 2,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const acLeft = () => {
    if (actionLeft) {
      actionLeft();
    } else {
      AppNavigate.back(navigation);
    }
  };
  const [isShowKeyboard, setShowKeyboard] = useState(false);
  const backButtonHandler = () => {
    return isLoading;
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
      BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    }
    // cleanup function
    return () => {
      if (Platform.OS === 'android') {
        Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
      }
    };
  }, []);
  const _keyboardDidShow = () => {
    setShowKeyboard(true);
  };
  const _keyboardDidHide = () => {
    setShowKeyboard(false);
  };
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      forceInset={{
        top: 'never',
        bottom: isUseSafeAreaBottom ? 'always' : 'never',
      }}
    >
      <View style={styles.main}>
        {isShowHeader ? (
          <Header
            title={title}
            viewLeftButton={
              isShowLeft ? (
                <HeaderButton
                  style={styles.button}
                  sourceIcon={sourceIconLeft}
                  uriIcon={uriIconLeft}
                  action={acLeft}
                  text={textLeft}
                />
              ) : undefined
            }
            viewRightButton2={
              sourceIconRight2 || textRight2 ? (
                <HeaderButton
                  style={styles.button}
                  styleViewIcon={styleViewIconRight2}
                  sourceIcon={sourceIconRight2}
                  uriIcon={uriIconRight2}
                  action={actionRight2}
                  text={textRight2}
                />
              ) : undefined
            }
            viewRightButton={
              sourceIconRight || textRight ? (
                <HeaderButton
                  style={styles.button}
                  styleViewIcon={styleViewIconRight}
                  sourceIcon={sourceIconRight}
                  uriIcon={uriIconRight}
                  action={actionRight}
                  text={textRight}
                />
              ) : undefined
            }
            callbackSizeHeader={callbackSizeHeader}
          />
        ) : null}
        {isDisableScrollView ? (
          <View style={styles.content}>
            {children}
            {!isShowKeyboard ? viewBottom : null}
          </View>
        ) : (
          <>
            <KeyboardAwareScrollView
              refreshControl={
                actionRefreshControl ? (
                  <RefreshControl
                    refreshing={isLoadingRefreshControl}
                    onRefresh={() => {
                      //Fix: FlatList item onPress not work the first time after refreshed
                      //https://github.com/facebook/react-native/issues/20011
                      setTimeout(actionRefreshControl, 300);
                    }}
                  />
                ) : undefined
              }
              keyboardShouldPersistTaps={keyboardShouldPersistTaps}
              showsVerticalScrollIndicator={false}
              style={styles.content}
              contentContainerStyle={styles.mainContent}
              scrollEnabled={false}
              extraScrollHeight={extraScrollHeight}
            >
              <ScrollView
                style={styles.mainContent}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={contentContainerStyle}
              >
                {children}
              </ScrollView>
            </KeyboardAwareScrollView>
            {isShowKeyboard && Platform.OS === 'android' ? null : viewBottom}
          </>
        )}
        <Loading isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
};
export default React.memo(ScreenBase);
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    main: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    mainContent: {flex: 1},
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor: 'red',
    },
  });
