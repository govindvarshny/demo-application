import AsyncStorage from '@react-native-community/async-storage';
import lodash from 'lodash';
import {getUserMappings} from '~/api/mappings/MappingsUser';
import {PropsUser} from '~/api/types/Props';
import AppConfig from '~/AppConfig';
import KeyStore from './constant/KeyStore';
export async function setUserStore(obj: PropsUser | null): Promise<boolean> {
  try {
    if (lodash.isObject(obj)) {
      const user = getUserMappings(obj);
      await AsyncStorage.setItem(KeyStore.user, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(KeyStore.user);
    }
    return true;
  } catch (error) {
    console.log('### StoreUser.setUserStore Exception', error);
  }
  return false;
}
export async function getUserStore(): Promise<PropsUser | null> {
  try {
    const value = await AsyncStorage.getItem(KeyStore.user);
    if (!lodash.isNil(value)) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log('### StoreUser.getUserStore Exception', error);
  }
  return null;
}

export async function setLanguageStore(lang: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(KeyStore.language, lang);
    return true;
  } catch (error) {
    console.log('### StoreUser.setLanguageStore Exception', error);
  }
  return false;
}
export async function getLanguageStore(): Promise<string> {
  try {
    const value = await AsyncStorage.getItem(KeyStore.language);
    return value ? value : AppConfig.DEFAULT_LANGUAGE;
  } catch (error) {
    console.log('### StoreUser.getLanguageStore Exception', error);
  }
  return AppConfig.DEFAULT_LANGUAGE;
}
