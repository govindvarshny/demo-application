import React, {useCallback, useEffect, useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import ScreenBase from './base/ScreenBase';
import {ContentScreen, Views} from '~/styles';
import {AppNavigate} from '~/AppNavigate';
import {showMessage} from '~/view/MyAlert';
import KeyScreens from './constant/KeyScreens';
import {useMemo} from 'react';
import {ExtendTheme} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {PropsScreen} from './types/types';
import ButtonTextGradient from '~/view/button/ButtonTextGradient';
import {useTranslation} from 'react-i18next';
import {useAppContextAuth} from '~/context/context/ContextAuth';
import ItemAvatar from '~/view/flatlist/ItemAvatar';
import { PropsAvatar } from '~/api/types/Props';

const ScreenList: React.FC<PropsScreen> = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {user,setUser} = useAppContextAuth();
  const [isLoading, setLoading] = useState(false);

  const actionAdd = useCallback(async () => {
    try {
      AppNavigate.next(navigation, KeyScreens.update);
    } catch (error: any) {
      setLoading(false);
      showMessage(error.msg);
    }
  }, []);
  const actionEdit = useCallback(async (index: number) => {
    try {
      if (user && user.avatars.length > 0) {
      AppNavigate.next(navigation, KeyScreens.update, 
         {key: index, item: user.avatars.find((e,i) => i === index) });
      }
    } catch (error: any) {
      setLoading(false);
      showMessage(error.msg);
    }
  }, []);
  
  const actionRemove = useCallback(async (index: number) => {
    try {
      setLoading(true)
      if (user && user.avatars.length > 0) {
        let new_user = user;
        new_user.avatars = user.avatars.filter((e,i) => i !== index);
        await setUser(new_user);
      } 
      setLoading(false);
      AppNavigate.next(navigation, KeyScreens.list);
    } catch (error: any) {
      setLoading(false);
      showMessage(error);
    }
  }, []);
  return (
    <ScreenBase isShowHeader={false} isLoading={isLoading} viewBottom={
      <ButtonTextGradient
          style={styles.space}
          title={t('Add')}
          action={actionAdd}
        />
    } isDisableScrollView>
      <View style={styles.content}>
        <Text style={styles.title}>{t('List')}</Text>

        <FlatList
        style={{height: "60%"}}
        // showsVerticalScrollIndicator={false}
        // showsHorizontalScrollIndicator={false}
        data={user?.avatars}
        renderItem={({item, index}: {item: any, index: number}) => (
          <ItemAvatar
            key={index}
            item={{...item, key: index}}
            index={index}
            actionRemove={actionRemove}
            actionEdit={actionEdit}
          />
        )}
        keyExtractor={(item: any) => item.key}
      />
      
      </View>
      
    </ScreenBase>
  );
};
export default ScreenList;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      margin: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: _theme.colors.textTitle,
      alignSelf: 'center',
      // marginTop: 100,
      marginBottom: 10,
    },
    space: {
      marginTop: Views.SPACE * 2,
      marginHorizontal: 20
    },
  });
