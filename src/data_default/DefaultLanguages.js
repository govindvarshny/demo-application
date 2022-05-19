const {default: AppConfig} = require('~/AppConfig');
const {LanguagesSupport} = require('~/Translate');

export const getLanguagesDefault = () => {
  return [
    {
      key: LanguagesSupport.english.key,
      title: LanguagesSupport.english.name,
      isSelected: AppConfig.DEFAULT_LANGUAGE === LanguagesSupport.english.key,
      iconSource: require('~/images/flags/english.png'),
    },
    {
      key: LanguagesSupport.vietnamese.key,
      title: LanguagesSupport.vietnamese.name,
      isSelected:
        AppConfig.DEFAULT_LANGUAGE === LanguagesSupport.vietnamese.key,
      iconSource: require('../images/flags/vietnamese.png'),
    },
  ];
};
