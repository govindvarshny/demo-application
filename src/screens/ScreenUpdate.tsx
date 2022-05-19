import React, { useCallback, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import ScreenBase from "./base/ScreenBase";
import { ContentScreen, Views } from "~/styles";
import InputText from "~/view/input/InputText";
import { AppNavigate } from "~/AppNavigate";
import { login } from "~/api/ApiUser";
import { showMessage } from "~/view/MyAlert";
import KeyScreens from "./constant/KeyScreens";
import { useMemo } from "react";
import { ExtendTheme } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { PropsScreen } from "./types/types";
import { RequestLogin } from "~/api/types/request";
import ButtonTextGradient from "~/view/button/ButtonTextGradient";
import { useTranslation } from "react-i18next";
import { useAppContextAuth } from "~/context/context/ContextAuth";
import { PropsAvatar } from "~/api/types/Props";
import { Formik } from "formik";
import * as yup from "yup";
import DateFloatInput, {
  DateFloatInputMode,
} from "~/view/input/DateFloatInput";
import InputTextWithTitle from "~/view/input/InputTextWithTitle";
import { getUserDefault } from "~/api/mappings/MappingsUser";
import PickImage from "~/view/image/PickImage/PickImage";
import { PropsItem } from "~/view/flatlist/ItemAvatar";
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  date: yup.string().required(),
  pathImage: yup.string().required(),
  phone: yup.number().required(),
});
const ScreenUpdate: React.FC<PropsScreen> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const itemEdit: PropsAvatar = route.params?.item;
  const indexEdit: number = route.params?.key;
  const { user, setUser } = useAppContextAuth();
  const [isLoading, setLoading] = useState(false);

  const action = useCallback(async (ava: PropsAvatar) => {
    try {
      setLoading(true)
      let new_user = undefined;
      if (user) {
        new_user = user;
      } else {
        new_user = getUserDefault();
      }
      if (user &&itemEdit) {
        new_user.avatars = user.avatars.map((e, i) => i === indexEdit ? ava : e)
      } else new_user.avatars.push(ava);
      await setUser(new_user);
      setLoading(false);
      AppNavigate.replace(navigation, KeyScreens.list);
    } catch (error: any) {
      setLoading(false);
      showMessage(error);
    }
  }, []);

  return (
    <ScreenBase isShowHeader={true} isLoading={isLoading}>
      <View style={styles.content}>
        <Formik
          validationSchema={validationSchema}
          initialValues={itemEdit ? itemEdit : {
            name: "user",
            email: "111111@c.ocm",
            date: undefined,
            pathImage: undefined,
            phone: "111111",
          }}
          onSubmit={action}
        >
          {({ handleChange, handleSubmit, values, errors }) => {
            return (
              <>
                <InputTextWithTitle
                  title={t("Name")}
                  value={values.name}
                  keyboardType="ascii-capable"
                  style={styles.space}
                  actionChangeText={handleChange("name")}
                  error={errors.name}
                />
                <InputTextWithTitle
                  title={t("Phone")}
                  keyboardType="numeric"
                  value={values.phone}
                  style={styles.space}
                  actionChangeText={handleChange("phone")}
                  error={errors.phone}
                />
                <InputTextWithTitle
                  title={t("Email")}
                  keyboardType="email-address"
                  value={values.email}
                  style={styles.space}
                  actionChangeText={handleChange("email")}
                  error={errors.email}
                />
                <DateFloatInput
                  style={styles.space}
                  initDate={values.date}
                  mode={DateFloatInputMode.date}
                  title={t("Date")}
                  callbackDateFloatInput={handleChange("date")}
                  value={values.date}
                />
                <PickImage
                  initImage={values.pathImage}
                  error={errors.pathImage}
                  onChangeImage={handleChange("pathImage")}
                />
                
                <ButtonTextGradient
                  style={styles.space}
                  title={t("Submit")}
                  action={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </View>
    </ScreenBase>
  );
};
export default ScreenUpdate;
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      margin: ContentScreen.MARGIN,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: _theme.colors.textTitle,
      alignSelf: "center",
      marginTop: 100,
      marginBottom: 10,
    },
    space: {
      marginTop: Views.SPACE * 2,
      marginBottom: 2,
    },
  });
