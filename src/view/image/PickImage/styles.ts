import {ExtendTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {SPACE} from '~/styles/Button';
import {SPACE_16} from '~/styles/Views';

export const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    viewContain: {
      marginVertical: SPACE,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageClose: {
      position: 'absolute',
      height: 10,
      width: 10,
      top: 0,
      right: 10,
      zIndex: 10,
    },
    label: {
      color: 'black',
      fontSize: 30,
      fontWeight: '600',
      paddingRight: SPACE,
    },
    iconLabel: {
      color: '#D1D1D1',
      fontSize: 35,
    },
    header: {
      alignSelf: 'flex-start',
      paddingHorizontal: SPACE,
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: SPACE,
    },
    touch: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchUpload: {
      width: '100%',
      height: 85,
      alignItems: 'center',
      borderRadius: 8,
      justifyContent: 'center',
      backgroundColor: _theme.colors.line,
    },
    viewImageItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
    },
    imageNew: {
      width: 27,
      height: 27,
      tintColor: 'black',
      marginTop: 10,
    },
    labelCover: {
      color: '#BCBCBC',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
    contentContainerStyle: {
      paddingLeft: SPACE_16,
    },
    imageItemDetail: {
      width: '100%',
      height: '100%',
      backgroundColor: '#F5F7F9',
    },
  });
