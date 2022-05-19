import {ExtendTheme, useTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Border, ContentScreen, Icon as IconStyles, Touch} from '~/styles';
import Icon from 'react-native-easy-icon';
export interface PropsItemCheck {
  key: string;
  title: string;
  isSelected: boolean;
  iconSource: any;
}
interface PropsRenderItemCheck {
  index: number;
  item: PropsItemCheck;
  actionSelect: (key: string) => void;
}
const ItemCheck: React.FC<PropsRenderItemCheck> = ({item, actionSelect}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => actionSelect(item.key)}
      activeOpacity={Touch.OPACITY}
    >
      <Image
        style={styles.icon}
        source={item.iconSource}
        resizeMode="contain"
      />
      <View style={styles.rightItem}>
        <Text numberOfLines={3} style={styles.text}>
          {item.title}
        </Text>
        {item.isSelected ? (
          <Icon
            type="ionicon"
            name="checkmark"
            size={IconStyles.WIDTH_ICON}
            color={theme.colors.primary}
          />
        ) : undefined}
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ItemCheck);
const HEIGHT = 55;
const MARGIN_ICON_TEXT = 10;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    item: {
      paddingLeft: ContentScreen.MARGIN,
      paddingRight: ContentScreen.MARGIN,
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: HEIGHT,
    },
    icon: {
      width: 50,
      height: 50,
    },
    rightItem: {
      flexDirection: 'row',
      flex: 1,
      marginLeft: MARGIN_ICON_TEXT,
      borderBottomColor: _theme.colors.line,
      borderBottomWidth: Border.WIDTH,
      minHeight: HEIGHT,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 16,
      color: _theme.colors.textNormal,
    },
  });
