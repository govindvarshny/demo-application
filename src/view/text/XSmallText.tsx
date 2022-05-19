import React, {FunctionComponent} from 'react';
import {TextProps, TextStyle} from 'react-native';
import PosText from './PosText';
type XSmallBoldTextProps = {
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[];
} & TextProps;
export const XSmallBoldText: FunctionComponent<XSmallBoldTextProps> =
  React.memo(({children, style, ...textProps}) => {
    const passedStyles = Array.isArray(style)
      ? Object.assign({}, ...style)
      : style;
    return (
      <PosText
        {...textProps}
        fontSize={11}
        textType={'bold'}
        style={[{...passedStyles}]}
      >
        {children}
      </PosText>
    );
  });

type XSmallRegularTextProps = {
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[];
} & TextProps;
export const XSmallRegularText: FunctionComponent<XSmallRegularTextProps> =
  React.memo(({children, style, ...textProps}) => {
    const passedStyles = Array.isArray(style)
      ? Object.assign({}, ...style)
      : style;
    return (
      <PosText
        {...textProps}
        fontSize={11}
        textType={'regular'}
        style={[{...passedStyles}]}
      >
        {children}
      </PosText>
    );
  });

type XSmallUnderlieTextProps = {
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[];
} & TextProps;
export const XSmallUnderlieText: FunctionComponent<XSmallUnderlieTextProps> =
  React.memo(({children, style, ...textProps}) => {
    const passedStyles = Array.isArray(style)
      ? Object.assign({}, ...style)
      : style;
    return (
      <PosText
        {...textProps}
        fontSize={11}
        textType={'underline'}
        style={[{...passedStyles}]}
      >
        {children}
      </PosText>
    );
  });
