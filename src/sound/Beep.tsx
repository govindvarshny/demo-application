import RNBeep from 'react-native-a-beep';
import SystemSetting from 'react-native-system-setting';
const VOLUME_TYPE = 'system';
export async function playBeep(): Promise<void> {
  try {
    const volume = await SystemSetting.getVolume(VOLUME_TYPE);
    if (volume < 1) {
      SystemSetting.setVolume(1, {type: VOLUME_TYPE});
    }
    RNBeep.beep();
  } catch (error) {
    console.log('### Beep.playBeep exception', error);
  }
}
