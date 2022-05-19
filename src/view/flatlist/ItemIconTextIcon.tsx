import {ExtendTheme, useTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Border, ContentScreen, Icon as IconStyles, Touch} from '~/styles';
import Icon from 'react-native-easy-icon';
export interface PropsItemIconTextIcon {
  key: string;
  title: string;
  iconType: any; //string
  iconName: string;
  isShowIconRight: boolean;
}
interface PropsRenderItemIconTextIcon {
  index: number;
  item: PropsItemIconTextIcon;
  actionSelect: (key: string) => void;
}
const ItemIconTextIcon: React.FC<PropsRenderItemIconTextIcon> = ({
  item,
  actionSelect,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => actionSelect(item.key)}
      activeOpacity={Touch.OPACITY}
    >
      <Icon
        type={item.iconType}
        name={item.iconName}
        size={IconStyles.WIDTH_ICON}
        color={theme.colors.primary}
      />
      <View style={styles.rightItem}>
        <Text numberOfLines={3} style={styles.text}>
          {item.title}
        </Text>
        {item.isShowIconRight ? (
          <Icon
            type="ionicon"
            name="chevron-forward-outline"
            size={IconStyles.WIDTH_ICON}
            color={theme.colors.primary}
          />
        ) : undefined}
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ItemIconTextIcon);
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
