import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {ExtendTheme, useTheme} from '@react-navigation/native';
import InputText from '~/view/input/InputText';
import InputWithTitleWrapper, {
  InputWithTitleWrapperProps,
} from './InputWithTitleWrapper';

interface InputTextWithTitle extends InputWithTitleWrapperProps {
  value: string;
  actionChangeText: (value: string) => void;
  valuePlaceholder?: string;
  editable?: boolean;
  error?: string;
}

const InputTextWithTitle: React.FC<InputTextWithTitle> = ({
  title,
  require,
  ...props
}) => {
  const theme = useTheme();
  const styles = makeStyle(theme);
  return (
    <InputWithTitleWrapper title={title} require={require}>
      <InputText style={styles.input} {...props} />
    </InputWithTitleWrapper>
  );
};

export default memo(InputTextWithTitle);

const makeStyle = (theme: ExtendTheme) =>
  StyleSheet.create({
    input: {backgroundColor: theme.colors.white},
  });
