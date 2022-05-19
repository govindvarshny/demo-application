import React, {FunctionComponent, useMemo} from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';
import {ExtendTheme, useTheme} from '@react-navigation/native';
type PosTextProps = {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  textType: 'regular' | 'bold' | 'medium' | 'underline';
  fontSize: number;
} & TextProps;
const PosText: FunctionComponent<PosTextProps> = ({
  children,
  textType,
  fontSize,
  style,
  ...textProps
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  let textStyle: {};
  switch (textType) {
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'medium':
      textStyle = styles.medium;
      break;
    case 'bold':
      textStyle = styles.bold;
      break;
    case 'underline':
      textStyle = styles.underline;
      break;
    default:
      textStyle = styles.regular;
      break;
  }
  return (
    <Text
      {...textProps}
      style={[
        textStyle,
        {fontSize: fontSize},
        {color: theme.colors.border},
        {...passedStyles},
      ]}
    >
      {children}
    </Text>
  );
};

const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    regular: {
      // fontFamily:  AppFont.RobotoRegular,
    },
    medium: {
      // fontFamily: AppFont.RobotoMedium,
    },
    bold: {
      // fontFamily: AppFont.RobotoBold,
    },
    underline: {
      // fontFamily: AppFont.RobotoRegular,
      textDecorationLine: 'underline',
    },
  });
export default React.memo(PosText);
