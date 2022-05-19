import {StyleSheet, View, ViewStyle} from 'react-native';
import {Border} from '~/styles';
import {ExtendTheme, useTheme} from '@react-navigation/native';
import React, {useMemo} from 'react';
interface Props {
  style?: ViewStyle;
}
const Line: React.FC<Props> = ({style}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return <View style={[styles.line, style]} />;
};
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    line: {
      borderBottomColor: _theme.colors.line,
      borderBottomWidth: Border.WIDTH,
      height: Border.WIDTH,
      alignSelf: 'stretch',
      width: '100%',
    },
  });
export default React.memo(Line);
