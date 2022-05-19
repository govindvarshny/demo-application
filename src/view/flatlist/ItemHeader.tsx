import {ExtendTheme, useTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Border, Icon as IconStyles, Touch} from '~/styles';
import Icon from 'react-native-easy-icon';
import {PropsOpsCheckHeader} from '~/api/types/Props';
import {useTranslation} from 'react-i18next';

interface PropsRenderItemHeader {
  index: number;
  item: PropsOpsCheckHeader;
  actionSelect?: (item: any) => Promise<void>;
}
const ItemHeader: React.FC<PropsRenderItemHeader> = ({item, actionSelect}) => {
  const {t} = useTranslation();
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
          {`${item.gnsNo} ${t('scanned')} ${item.opsPieces}, ${t(
            'completed',
          )} ${item.complete}`}
        </Text>
        <Icon
          type="ionicon"
          name="chevron-forward-outline"
          size={IconStyles.WIDTH_ICON}
          color={theme.colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(ItemHeader);
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
  });
