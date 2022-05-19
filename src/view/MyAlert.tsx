import {Platform, Alert} from 'react-native';
import i18n from '~/Translate';
import Toast from 'react-native-root-toast';
export const showToast = (text?: string) => {
  Toast.show(text ? text : '', {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};
export function showMessage(
  message?: string,
  callbackButtonOk?: () => void,
  title?: string,
) {
  setTimeout(
    () => {
      Alert.alert(
        title ? title : i18n.t('warning'),
        message,
        [
          {
            text: i18n.t('ok'),
            onPress: () => callbackButtonOk && callbackButtonOk(),
          },
        ],
        {cancelable: false},
      );
    },
    Platform.OS === 'ios' ? 330 : 0,
  );
}

export function showMessageCancelOk(
  message: string,
  callbackButtonOk?: () => void,
  title?: string,
) {
  setTimeout(
    () => {
      Alert.alert(
        title ? title : i18n.t('warning'),
        message,
        [
          {
            text: i18n.t('cancel'),
            //onPress: () => callbackButtonCancel && callbackButtonCancel(),
          },
          {
            text: i18n.t('ok'),
            onPress: () => callbackButtonOk && callbackButtonOk(),
          },
        ],
        {cancelable: false},
      );
    },
    Platform.OS === 'ios' ? 330 : 0,
  );
}
