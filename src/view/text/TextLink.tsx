import React from 'react';
import {
  StyleSheet,
  Linking,
  Text,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import lodash from 'lodash';
import {ExtendTheme, useTheme} from '@react-navigation/native';
import {useMemo} from 'react';
import {Touch} from '~/styles';
interface Props {
  style?: TextStyle;
  text: string;
  uri?: string;
  action?: () => void;
}
const TextLink: React.FC<Props> = ({style, uri, text, action}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const openLink = () => {
    if (action) {
      action();
      return;
    }
    try {
      if (lodash.isString(uri)) {
        Linking.openURL(uri);
      }
    } catch (error) {
      console.log('### TextLink.openLink Exception', error);
    }
  };
  return (
    <TouchableOpacity activeOpacity={Touch.OPACITY}>
      <Text style={[styles.text, style]} onPress={openLink}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default React.memo(TextLink);
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    text: {
      color: _theme.colors.link,
      fontWeight: 'bold',
      fontSize: 12,
    },
  });
