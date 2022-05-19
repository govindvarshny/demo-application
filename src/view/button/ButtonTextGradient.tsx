import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Button, Touch} from '~/styles';
import LinearGradient from 'react-native-linear-gradient';
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
  colorBackgroundStartGradient?: string;
  colorBackgroundEndGradient?: string;
  isDisableAction?: boolean;
  //event
  action?: () => void;
}

const ButtonTextGradient: React.FC<Props> = ({
  //style
  style,
  styleContent,
  textStyle,
  //option
  title,
  colorBackgroundStartGradient,
  colorBackgroundEndGradient,
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
      <LinearGradient
        colors={
          isDisableAction
            ? [theme.colors.disable, theme.colors.disable]
            : [
                colorBackgroundStartGradient
                  ? colorBackgroundStartGradient
                  : theme.colors.backgroundStartGradient,
                colorBackgroundEndGradient
                  ? colorBackgroundEndGradient
                  : theme.colors.backgroundEndGradient,
              ]
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.content, styleContent]}
      >
        <Text numberOfLines={1} style={[styles.title, textStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default React.memo(ButtonTextGradient);

const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      flexDirection: 'row',
      height: Button.HEIGHT,
      borderColor: _theme.colors.borderButton,
      borderRadius: Button.BORDER_RADIUS,
      alignItems: 'center',
      justifyContent: 'center',
      //minWidth: Button.MIN_WIDTH,
      //alignSelf: 'center', // will follow minWidth
      paddingLeft: 10,
      paddingRight: 10,
    },
    title: {
      flexGrow: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
      color: _theme.colors.textWhite,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
