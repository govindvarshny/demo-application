import {useTheme} from '@react-navigation/native';
import {ExtendTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {TextStyle, View} from 'react-native';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
  ViewStyle,
} from 'react-native';
import {Button, Icon, Border, Touch} from '../../styles';
interface Props {
  //style
  style?: ViewStyle;
  styleContent?: ViewStyle;
  textStyle?: TextStyle;
  //option
  title: string;
  isDisableAction?: boolean;
  sourceIcon: any;
  //event
  action?: () => void;
}
const ButtonIconText: React.FC<Props> = ({
  //style
  style,
  styleContent,
  textStyle,
  //option
  title,
  isDisableAction = false,
  sourceIcon,
  //event
  action,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
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
        {sourceIcon ? (
          <Image style={styles.viewLeft} source={sourceIcon} />
        ) : undefined}
        <Text
          numberOfLines={1}
          style={[styles.title, textStyle ? textStyle : undefined]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ButtonIconText);

const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      flexDirection: 'row',
      minWidth: Button.MIN_WIDTH,
      height: Button.HEIGHT,
      borderColor: _theme.colors.borderButton,
      borderWidth: Border.WIDTH,
      borderRadius: Button.BORDER_RADIUS,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 10,
      paddingRight: 10,
    },
    viewLeft: {
      width: Icon.WIDTH_ICON,
      height: Icon.HEIGHT_ICON,
      marginRight: 5,
    },

    title: {
      flexGrow: 1,
      textAlignVertical: 'center',
      textAlign: 'center',
      color: _theme.colors.textNormal,
      fontSize: 14,
    },
  });
