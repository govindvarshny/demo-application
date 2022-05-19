//Light theme
export const lightTheme = {
  dark: false,
  colors: {
    primary: '#ec1e25',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#000000',
    notification: '#000000',
    //Extend field
    line: '#E4E9F2',
    backgroundLoading: '#00000040',
    white: '#FFFFFF',
    backgroundInput: '#FFFFFF',
    textNormal: '#222222',
    textTitle: '#000000',
    textPlaceholder: '#303233',
    link: '#002B80',
    textButtonHeader: '#1861F2',
    textTitleHeader: '#000000',
    backgroundHeader: '#FFFFFF',
    borderButton: '#DEDFE0',
    textWhite: '#FFFFFF',
    disable: '#ccc', // '#999'
    backgroundStartGradient: '#ec1e25',
    backgroundEndGradient: '#f16b4e',
    backgroundButton: '#ec1e25',
    textButtonLink: '#1861F2',
    tabActiveTint: '#ec1e25',
    tabInactiveTint: '#7C8085',
  },
};
//Dark theme
export const darkTheme = {
  dark: true,
  colors: lightTheme.colors,
};
export const Themes = {
  light: lightTheme,
  dark: darkTheme,
};
