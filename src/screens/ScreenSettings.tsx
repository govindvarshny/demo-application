import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ScreenBase from './base/ScreenBase';
import {PropsScreen} from './types/types';
import ItemIconTextIcon, {
  PropsItemIconTextIcon,
} from '~/view/flatlist/ItemAvatar';
import KeyScreens from './constant/KeyScreens';
import {AppNavigate} from '~/AppNavigate';
import {useIsFocused} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import {useAppContextAuth} from '~/context/context/ContextAuth';
import {getSettingsDefault} from '~/data_default/DefaultSetting';
import {ContentScreen} from '~/styles';
import {ExtendTheme, useTheme} from '@react-navigation/native';
import {DeviceInfo} from '~/utils/UtilDevice';

const ScreenSettings: React.FC<PropsScreen> = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {logout} = useAppContextAuth();
  const [data, setData] = useState<PropsItemIconTextIcon[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setData(getSettingsDefault());
    }
  }, [isFocused]);
  const actionSelect = useCallback(async (key: string) => {
    switch (key) {
      case '1':
        AppNavigate.next(navigation, KeyScreens.profile);
        break;
      case '2':
        AppNavigate.next(navigation, KeyScreens.languages);
        break;
      case '3':
        await logout();
        break;
      default:
        break;
    }
  }, []);

  return (
    <ScreenBase
      isShowLeft={false}
      title={t('settings')}
      isDisableScrollView={true}
      viewBottom={
        <View style={styles.viewBottom}>
          <Text style={styles.textVersion}>
            {t('version') + ': ' + DeviceInfo.versionApp}
          </Text>
        </View>
      }
      isUseSafeAreaBottom={false}
    >
      <FlatList
        //contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <ItemIconTextIcon
            item={item}
            index={index}
            actionSelect={actionSelect}
          />
        )}
        keyExtractor={(item) => item.key}
      />
    </ScreenBase>
  );
};
export default ScreenSettings;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      margin: ContentScreen.MARGIN,
    },
    viewBottom: {
      paddingBottom: 23,
      alignItems: 'center',
    },
    textVersion: {
      fontSize: 18,
      color: _theme.colors.textNormal,
    },
  });
