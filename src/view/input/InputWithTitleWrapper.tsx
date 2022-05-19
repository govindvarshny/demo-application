import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ExtendTheme, useTheme} from '@react-navigation/native';
import {InputTextProps} from '~/view/input/InputText';
import {XSmallRegularText} from '~/view/text/XSmallText';

export interface InputWithTitleWrapperProps extends InputTextProps {
  title?: string;
  require?: boolean;
  children?: React.ReactNode;
}

const InputWithTitleWrapper: React.FC<InputWithTitleWrapperProps> = ({
  title,
  children,
  require,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View>
      {title ? (
        <XSmallRegularText style={styles.title}>
          {title}
          {require === true ? (
            <XSmallRegularText style={{color: 'red'}}> *</XSmallRegularText>
          ) : null}
        </XSmallRegularText>
      ) : null}
      {children}
    </View>
  );
};
export default memo(InputWithTitleWrapper);

const createStyles = (theme: ExtendTheme) =>
  StyleSheet.create({
    title: {
      position: 'absolute',
      left: 8,
      top: 12,
      zIndex: 1,
      backgroundColor: theme.colors.textWhite,
      color: theme.colors.textTitle,
      paddingHorizontal: 5,
    },
  });
