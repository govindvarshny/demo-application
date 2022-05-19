import {ExtendTheme, useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Border, ContentScreen} from '~/styles';
import ScreenBase from './base/ScreenBase';
import {PropsScreen} from './types/types';
import {useTranslation} from 'react-i18next';
import {useAppContextAuth} from '~/context/context/ContextAuth';

const ScreenProfile: React.FC<PropsScreen> = () => {
  const {t} = useTranslation();
  const {user} = useAppContextAuth();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const renderLine = (title: string, value: string | undefined) => {
    return (
      <View style={styles.item}>
        <View style={styles.rightItem}>
          <Text style={styles.textTitle}>{title + ': '}</Text>
          <Text style={styles.textTitleValue}>{value}</Text>
        </View>
      </View>
    );
  };
  return (
    <ScreenBase
      // title={t('profile') + 'x x x x x x x x x x x x x x x x x bbbbb 1234567'}
      title={t('profile')}
    >
      {renderLine(t('user_name'), user?.user_name)}
    </ScreenBase>
  );
};
export default ScreenProfile;
const HEIGHT = 50;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    item: {
      paddingLeft: ContentScreen.MARGIN,
      paddingRight: ContentScreen.MARGIN,
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: HEIGHT,
    },

    rightItem: {
      flexDirection: 'row',
      flex: 1,
      borderBottomColor: _theme.colors.line,
      borderBottomWidth: Border.WIDTH,
      minHeight: HEIGHT,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textTitle: {
      fontSize: 16,
      color: _theme.colors.textTitle,
      fontWeight: 'bold',
    },
    textTitleValue: {
      fontSize: 16,
      color: _theme.colors.textNormal,
    },
  });
