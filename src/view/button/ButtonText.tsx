import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {Button, Touch} from '~/styles';
import {ExtendTheme} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {useMemo} from 'react';
interface Props {
  //style
  style?: ViewStyle;
  styleContent?: ViewStyle;
  textStyle?: TextStyle;
  //option
  title: string;
  isDisableAction?: boolean;
  //event
  action?: () => void;
}

const ButtonText: React.FC<Props> = ({
  //style
  style,
  styleContent,
  textStyle,
  //option
  title,
  isDisableAction = false,
  //event
  action,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
      disabled={isDisableAction}
      //activeOpacity={isDisableAction ? 1 : 0.7}
      onPress={() => {
        Keyboard.dismiss();
        action && action();
      }}
      style={style}
      activeOpacity={Touch.OPACITY}
    >
      <View
        style={[
          styles.content,
          styleContent,
          {
            backgroundColor: isDisableAction
              ? theme.colors.disable
              : theme.colors.backgroundButton,
          },
        ]}
      >
        <Text numberOfLines={1} style={[styles.title, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ButtonText);

const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      flexDirection: 'row',
      minWidth: Button.MIN_WIDTH,
      height: Button.HEIGHT,
      borderColor: _theme.colors.borderButton,
      borderRadius: Button.BORDER_RADIUS,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      flexGrow: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
      color: _theme.colors.textWhite,
      fontSize: 16,
      fontWeight: 'bold',
      paddingLeft: 5,
      paddingRight: 5,
    },
  });
