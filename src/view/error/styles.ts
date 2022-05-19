import {ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {Themes} from '~/themes/Themes';

type Styles = {
  container: ViewStyle;
  title: TextStyle;
  buttonStyle: ViewStyle;
};

export const styles: Styles = {
  container: {
    backgroundColor: Themes.light.colors.line,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    color: Themes.light.colors.white,
    padding: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
};

export const styleErrorMessage = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 6,
    width: '100%',
    alignContent: 'flex-start',
  },
  viewError: {
    flex: 1,
    width: '90%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
