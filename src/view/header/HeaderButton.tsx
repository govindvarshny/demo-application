import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {Header, Touch} from '~/styles';
import MyFastImage from '../image/MyFastImage';
import {ImageStyle} from 'react-native-fast-image';
import {ExtendTheme, useTheme} from '@react-navigation/native';
import {useMemo} from 'react';
export interface Props {
  //style
  style?: ViewStyle;
  styleViewIcon?: ViewStyle;
  textStyle?: TextStyle;
  imageStyle?: ImageStyle;
  action?: () => void;
  //text
  text?: string;
  //icon
  sourceIcon?: any; //require('path asset')
  uriIcon?: string; // http or https
}
const HeaderButton: React.FC<Props> = ({
  action,
  style,
  styleViewIcon,
  sourceIcon,
  uriIcon,
  text,
  textStyle,
  imageStyle,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  function iconBtn() {
    if (sourceIcon || uriIcon) {
      return (
        <View style={[styles.viewIcon, styleViewIcon]}>
          <MyFastImage
            resizeMode="contain"
            style={imageStyle ? {...styles.image, ...imageStyle} : styles.image}
            uri={uriIcon}
            sourceIconDefault={sourceIcon}
          />
        </View>
      );
    } else {
      return (
        <Text numberOfLines={1} style={[styles.text, textStyle]}>
          {text}
        </Text>
      );
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={Touch.OPACITY}
      //style={style}
      style={style}
      onPress={() => action && action()}
    >
      {iconBtn()}
    </TouchableOpacity>
  );
};
export default React.memo(HeaderButton);
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    image: {
      width: Header.ICON_SIZE,
      height: Header.ICON_SIZE,
    },
    text: {
      color: _theme.colors.textButtonHeader,
      fontSize: 15,
    },

    viewIcon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
