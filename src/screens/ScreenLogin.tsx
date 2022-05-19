import React, {useCallback, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import ScreenBase from './base/ScreenBase';
import {ContentScreen, Views} from '~/styles';
import InputText from '~/view/input/InputText';
import {AppNavigate} from '~/AppNavigate';
import {login} from '~/api/ApiUser';
import {showMessage} from '~/view/MyAlert';
import KeyScreens from './constant/KeyScreens';
import {useMemo} from 'react';
import {ExtendTheme} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {PropsScreen} from './types/types';
import {RequestLogin} from '~/api/types/request';
import ButtonTextGradient from '~/view/button/ButtonTextGradient';
import {useTranslation} from 'react-i18next';
import {useAppContextAuth} from '~/context/context/ContextAuth';

const ScreenLogin: React.FC<PropsScreen> = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {setUser} = useAppContextAuth();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<RequestLogin>({
    username: 'user1',
    password: '111111',
  });
  const actionChangeUserName = useCallback(
    (username: string) => {
      setData({...data, username: username});
    },
    [data],
  );
  const actionChangePassword = useCallback(
    (password: string) => {
      setData({...data, password: password});
    },
    [data],
  );
  const actionLogin = useCallback(async () => {
    data.username = data.username.trim();
    if (data.username.length === 0) {
      setData({...data});
      showMessage(t('username_empty'));
      return;
    }
    if (data.password.length === 0) {
      showMessage(t('password_empty'));
      return;
    }
    try {
      setLoading(true);
      const response = await login(data);
      await setUser(response.dataList);
      setLoading(false);
      AppNavigate.next(navigation, KeyScreens.tabs);
    } catch (error: any) {
      setLoading(false);
      showMessage(error.msg);
    }
  }, [data]);

  return (
    <ScreenBase isShowHeader={false} isLoading={isLoading}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('login')}</Text>
        <InputText
          value={data.username}
          style={styles.space}
          valuePlaceholder={t('user_name')}
          actionChangeText={actionChangeUserName}
        />
        <InputText
          value={data.password}
          style={styles.space}
          valuePlaceholder={t('password')}
          secureTextEntry={true}
          actionChangeText={actionChangePassword}
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="off"
        />
        <ButtonTextGradient
          style={styles.space}
          title={t('login')}
          action={actionLogin}
        />
      </View>
    </ScreenBase>
  );
};
export default ScreenLogin;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      margin: ContentScreen.MARGIN,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: _theme.colors.textTitle,
      alignSelf: 'center',
      marginTop: 100,
      marginBottom: 10,
    },
    space: {
      marginTop: Views.SPACE * 2,
    },
  });
/*
  useEffect(() => {
    let isLogin = false;
    setInterval(() => {
      if (isLogin) {
        contextSetUser(null);
      } else {
        contextSetUser({
          user_token: '1',
          user_name: '2',
          user_role: '3',
        });
      }
      isLogin = !isLogin;
    }, 5000);
  }, []);
  */
