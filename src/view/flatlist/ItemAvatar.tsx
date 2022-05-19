import { ExtendTheme, useTheme } from "@react-navigation/native";
import React from "react";
import { useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Border, ContentScreen, Icon as IconStyles, Touch } from "~/styles";
import Icon from "react-native-easy-icon";
import {
  convertToLocalDateTime,
  LOCAL_DATE_TIME_EXPIRED_FORMAT,
  LOCAL_DATE_TIME_FORMAT_PROMOTION,
} from "~/utils/UtilDate";
import { PropsAvatar } from "~/api/types/Props";
import { useTranslation } from "react-i18next";
export interface PropsItem extends PropsAvatar {
  key: number;
}
interface PropsRenderItem {
  index: number;
  item: PropsItem;
  actionRemove?: (index: number) => Promise<void>;
  actionEdit?: (index: number) => Promise<void>;
}
const ItemAvatar: React.FC<PropsRenderItem> = ({
  item,
  actionRemove,
  actionEdit,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { t } = useTranslation();
  const buttonSwipes = [
    {
      title: t("remove"),
      icon: require("~/images/icons/ic_trash_blue.png"),
      onPress: async (index: number) => actionRemove && actionRemove(index),
    },
    {
      title: t("edit"),
      icon: require("~/images/icons/ic_edit.png"),
      onPress: (index: number) => actionEdit && actionEdit(index),
    },
  ];
  const renderRightActions = (index: number) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "40%",
        }}
      >
        {buttonSwipes.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DBF2FB",
            }}
            onPress={() => item.onPress && item.onPress(index)}
          >
            <Image style={{ width: 20, height: 20 }} source={item.icon} />
            <Text style={{}}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <Swipeable renderRightActions={() => renderRightActions(item.key)}>
      <View style={styles.row} key={item.key}>
      {item.pathImage && item.pathImage !== "" ? (
          <Image
            key={item.key}
            style={{ padding: 60, marginBottom: 10 }}
            source={{ uri: item.pathImage }}
          />
        ) : undefined}
        
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.valueRow}>{`${item.email}`}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.valueRow}>{`${item.phone}`}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.valueRow}>{`${item.name}`}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.valueRow}>{`${
              item.date
                ? convertToLocalDateTime(
                    item.date,
                    LOCAL_DATE_TIME_FORMAT_PROMOTION
                  )
                : "date"
            }`}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
export default React.memo(ItemAvatar);
const HEIGHT = 55;
const MARGIN_ICON_TEXT = 10;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    item: {
      paddingLeft: ContentScreen.MARGIN,
      paddingRight: ContentScreen.MARGIN,
      alignItems: "center",
      flexDirection: "row",
      minHeight: HEIGHT,
    },
    icon: {
      width: 50,
      height: 50,
    },
    rightItem: {
      flexDirection: "row",
      flex: 1,
      marginLeft: MARGIN_ICON_TEXT,
      borderBottomColor: _theme.colors.line,
      borderBottomWidth: Border.WIDTH,
      minHeight: HEIGHT,
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 16,
      color: _theme.colors.textNormal,
    },
    flatlist: { backgroundColor: _theme.colors.white, padding: 5 },
    row: {
      // flex: 1,
      // padding: 10,
      // borderWidth: 2,
      // borderColor: theme.colors.greyLight,
      backgroundColor: _theme.colors.white,
    },
    titleRow: { marginBottom: 5, color: "black" },
    valueRow: { textAlign: 'center'},
    line: {
      marginVertical: 5,
      marginHorizontal: 10,
      // borderBottomWidth: 1,
      // borderBottomColor: _theme.colors.greyDefault,
    },
    containAddNote: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: 20,
    },
  });
