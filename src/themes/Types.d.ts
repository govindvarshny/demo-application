import '@react-navigation/native'; //require import
/*
  - Document theme react navigation
  - Link: https://reactnavigation.org/docs/themes/
*/
declare module '@react-navigation/native' {
  export type ExtendTheme = {
    dark: boolean;
    colors: {
      //The primary color of the app used to tint various elements.
      //Usually you'll want to use your brand color for this.
      primary: string;
      //The color of various backgrounds,
      //such as background color for the screens.
      background: string;
      //The background color of card-like elements,
      //such as headers, tab bars etc.
      card: string;
      //The text color of various elements.
      text: string;
      //The color of borders, e.g. header border, tab bar border etc.
      border: string;
      //The color of Tab Navigator badge
      notification: string;
      /*** Extend field ***/
      line: string;
      backgroundLoading: string;
      white: string;
      backgroundInput: string;
      textNormal: string;
      textTitle: string;
      textPlaceholder: string;
      link: string;
      textButtonHeader: string;
      textTitleHeader: string;
      backgroundHeader: string;
      borderButton: string;
      textWhite: string;
      disable: string;
      backgroundStartGradient: string;
      backgroundEndGradient: string;
      backgroundButton: string;
      textButtonLink: string;
      tabActiveTint: string;
      tabInactiveTint: string;
    };
  };
  export function useTheme(): ExtendTheme;
}
