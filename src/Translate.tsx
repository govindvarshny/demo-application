//https://itnext.io/how-to-use-i18next-in-react-native-expo-476fa80bd92c
import lodash from 'lodash';
import moment from 'moment';
//In order to include all the locales https://momentjs.com/docs/
import {} from 'moment/min/locales.min';
import i18n from 'i18next';
import AppConfig from './AppConfig';
export const LanguagesSupport = {
  english: {
    key: 'en', //i18
    moment: 'en', //moment https://www.ge.com/digital/documentation/predix-services/c_custom_locale_support.html
    name: 'English',
  },
  vietnamese: {
    key: 'vi',
    moment: 'vi',
    name: 'Vietnamese',
  },
};
const resources = {
  en: {
    translation: require('../scripts/localization/en.json'),
  },
  vi: {
    translation: require('../scripts/localization/vi.json'),
  },
};
i18n
  .init({
    lng: AppConfig.DEFAULT_LANGUAGE,
    debug: false,
    resources: resources,
  })
  .then(function () {});
//.then(function (t) {});
let currentLanguage = AppConfig.DEFAULT_LANGUAGE;
export const getCurrentLanguage = () => {
  return currentLanguage;
};
export const setLanguage = (language: string) => {
  let key = language;
  if (!lodash.isString(language)) {
    key = AppConfig.DEFAULT_LANGUAGE;
  }
  currentLanguage = key;
  switch (key) {
    case LanguagesSupport.english.key:
      //get moment.locale(); // returns 'en'
      moment.locale(LanguagesSupport.english.moment);
      break;
    case LanguagesSupport.vietnamese.key:
      //if set moment.locale('cn') then will crash with build release
      moment.locale(LanguagesSupport.vietnamese.moment);
      break;
    default:
      break;
  }

  i18n.changeLanguage(key, () => {
    //console.log('Translate.setLanguage', tag, 'error = ' + error);
  });
};

export default i18n;
