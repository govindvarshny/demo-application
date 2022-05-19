import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import ScreenBase from './base/ScreenBase';
import {setLanguage} from '../Translate';
import ItemLanguage, {PropsItemCheck} from '~/view/flatlist/ItemCheck';
import {PropsScreen} from './types/types';
import {getLanguageStore, setLanguageStore} from '~/local_store/StoreUser';
import {cloneDeep} from 'lodash';
import {useTranslation} from 'react-i18next';
import {getLanguagesDefault} from '~/data_default/DefaultLanguages';

const ScreenLanguages: React.FC<PropsScreen> = ({}) => {
  const {t} = useTranslation();
  const [data, setData] = useState<PropsItemCheck[]>(
    cloneDeep(getLanguagesDefault()),
  );

  const initLanguages = async () => {
    const currentLanguage = await getLanguageStore();
    data.map((value) => {
      value.isSelected = value.key === currentLanguage;
      return value;
    });
    setData([...data]);
  };
  useEffect(() => {
    initLanguages();
  }, []);
  const actionSelect = useCallback(
    async (key: string) => {
      data.map((value) => {
        value.isSelected = value.key === key;
        return value;
      });
      await setLanguageStore(key);
      setData([...data]);
      setLanguage(key);
    },
    [data],
  );

  return (
    <ScreenBase title={t('languages')} isDisableScrollView={true}>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <ItemLanguage item={item} index={index} actionSelect={actionSelect} />
        )}
        keyExtractor={(item) => item.key}
      />
    </ScreenBase>
  );
};
export default ScreenLanguages;
