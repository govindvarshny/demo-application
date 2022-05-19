import React, {useCallback, useMemo} from 'react';
import ScreenBase from './base/ScreenBase';
import {PropsScreen} from './types/types';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {ExtendTheme, useTheme} from '@react-navigation/native';
import {Button, ContentScreen, Views} from '~/styles';
import ButtonTextGradient from '~/view/button/ButtonTextGradient';
import {AppNavigate} from '~/AppNavigate';
import KeyScreens from './constant/KeyScreens';
const ScreenHome: React.FC<PropsScreen> = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const actionProfile = useCallback(() => {
    AppNavigate.next(navigation, KeyScreens.profile);
  }, []);
  const actionRight2 = useCallback(() => {
    AppNavigate.next(navigation, KeyScreens.profile);
  }, []);
  const actionRight = useCallback(() => {
    AppNavigate.next(navigation, KeyScreens.profile);
  }, []);
  return (
    <ScreenBase
      isShowLeft={false}
      title={t('home')}
      sourceIconRight={require('~/images/search.png')}
      actionRight={actionRight}
      sourceIconRight2={require('~/images/search.png')}
      actionRight2={actionRight2}
      isUseSafeAreaBottom={false}
    >
      <View style={styles.content}>
        <ButtonTextGradient
          title={t('profile')}
          style={styles.button}
          action={actionProfile}
        />
      </View>
    </ScreenBase>
  );
};
export default ScreenHome;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      margin: ContentScreen.MARGIN,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      margin: Views.SPACE,
      width: Button.WIDTH,
    },
  });
