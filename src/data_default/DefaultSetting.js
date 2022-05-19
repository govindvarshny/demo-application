import i18n from '~/Translate';

export const getSettingsDefault = () => {
  return [
    {
      key: '1',
      title: i18n.t('profile'),
      iconType: 'ionicon',
      iconName: 'person-outline',
      isShowIconRight: true,
    },
    {
      key: '2',
      title: i18n.t('languages'),
      iconType: 'ionicon',
      iconName: 'language-outline',
      isShowIconRight: true,
    },
    {
      key: '3',
      title: i18n.t('logout'),
      iconType: 'ionicon',
      iconName: 'log-out-outline',
      isShowIconRight: false,
    },
  ];
};
