import {ExtendTheme, useTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Border, Icon as IconStyles, Touch} from '~/styles';
import Icon from 'react-native-easy-icon';
export interface PropsItemIconText {
  id: number;
  title: string;
  iconType: any; //string
  iconName: string;
}
interface PropsRenderItemIconTextIcon {
  index: number;
  item: PropsItemIconText;
  actionSelect?: (item: any) => Promise<void>;
  actionSelectIconRight?: (item: any) => Promise<void>;
  iconType?: string;
  iconName?: string;
}
const ItemTextIcon: React.FC<PropsRenderItemIconTextIcon> = ({
  item,
  actionSelect,
  actionSelectIconRight,
  iconType,
  iconName,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => actionSelect && actionSelect(item)}
      activeOpacity={Touch.OPACITY}
    >
      <View style={styles.rightItem}>
        <Text numberOfLines={3} style={styles.text}>
          {item.title}
        </Text>
        <TouchableOpacity
          activeOpacity={Touch.OPACITY}
          style={styles.button}
          onPress={() => actionSelectIconRight && actionSelectIconRight(item)}
        >
          <Icon
            type={iconType ? iconType : item.iconType}
            name={iconName ? iconName : item.iconName}
            size={IconStyles.WIDTH_ICON}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ItemTextIcon);
const HEIGHT = 55;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    item: {
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
    button: {
      height: HEIGHT,
      width: 60,
      //backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  });
