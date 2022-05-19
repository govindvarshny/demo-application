import {useTheme, ExtendTheme} from '@react-navigation/native';
import React, {useMemo, useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Text,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from 'react-native';
import {Input, Border, Icon as IconStyles, Touch} from '~/styles';
import ButtonTextGradient from '../button/ButtonTextGradient';
import Icon from 'react-native-easy-icon';
//Ref text input: https://reactnative.dev/docs/textinput
export interface InputTextProps {
  //Style
  style?: ViewStyle;
  textStyle?: TextStyle;
  placeholderTextColor?: string; //INPUT_HINT,
  //Value
  value?: string;
  valuePlaceholder?: string;
  error?: string;
  //Event
  actionChangeText?: (text: string) => void;
  actionIconRight?: () => void;
  actionIconRightOutSide?: () => void;
  actionButtonRightOutSide?: () => void;
  action?: () => void;
  //Button Image
  sourceIconRight?: any; // require('path asset')
  sourceIconRightOutSide?: any; // require('path asset')
  iconVectorTypeRight?: any; //string
  iconVectorNameRight?: string;
  //Button
  textButtonRightOutSize?: string;
  //Option
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  numberOfLines?: number;
  multiline?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCompleteType?:
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'email'
    | 'name'
    | 'password'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'off'
    | undefined;
  autoFocus?: boolean;
  disabled?: boolean;
}
const InputText: React.FC<InputTextProps> = ({
  //Style
  style = undefined,
  textStyle = undefined,
  placeholderTextColor = undefined, //INPUT_HINT,
  //Value
  value = '',
  valuePlaceholder = '',
  error = '',
  //Event
  actionChangeText = undefined,
  actionIconRight = undefined,
  actionIconRightOutSide = undefined,
  actionButtonRightOutSide = undefined,
  action = undefined,
  //Button Image
  sourceIconRight = undefined,
  sourceIconRightOutSide = undefined,
  iconVectorTypeRight = undefined,
  iconVectorNameRight = undefined,
  //Button
  textButtonRightOutSize = undefined,
  //Option
  editable = true,
  keyboardType = 'default',
  secureTextEntry = false,
  isPassword = false,
  numberOfLines = 1,
  multiline = false,
  autoCorrect = true,
  autoCapitalize = 'sentences',
  autoCompleteType = undefined, // 'off'
  autoFocus = false,
  disabled = false,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [isFocus, setIsFocus] = useState(false);

  function renderIconRight(sourceIcon: any, actionIcon: any) {
    return sourceIcon ? (
      <TouchableOpacity
        style={styles.touchIcon}
        onPress={() => callActionIconRight(actionIcon)}
        activeOpacity={Touch.OPACITY}
      >
        <Image style={styles.icon} source={sourceIcon} resizeMode={'contain'} />
      </TouchableOpacity>
    ) : null;
  }
  function callActionIconRight(actionIcon?: any) {
    isAction() ? action && action() : actionIcon && actionIcon();
  }
  function renderVectorIconRight(
    iconType: any, //string
    iconName?: string, //string
    actionIcon?: any,
  ) {
    return iconType && iconName ? (
      <TouchableOpacity
        style={styles.touchIcon}
        onPress={() => callActionIconRight(actionIcon)}
        activeOpacity={Touch.OPACITY}
      >
        <Icon
          type={iconType}
          name={iconName}
          size={IconStyles.WIDTH_ICON}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    ) : null;
  }
  function renderButtonRightOutSide(
    textButton: string | undefined,
    actionButton: any,
  ) {
    return textButton ? (
      <ButtonTextGradient
        style={styles.buttonRightOutSide}
        title={textButton}
        action={actionButton}
      />
    ) : null;
  }
  const isAction = () => {
    return action && !editable;
  };
  const [isShowPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (secureTextEntry) {
      setShowPassword(secureTextEntry);
    }
  }, []);
  const actionHideShowPassword = useCallback(() => {
    setShowPassword(!isShowPassword);
  }, [isShowPassword]);

  const onInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const onBlurFocus = useCallback(() => {
    setIsFocus(false);
  }, []);

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={isAction() ? Touch.OPACITY : Touch.DISABLE}
          //style={[styles.content, style]}
          style={[
            styles.content,
            {
              borderColor: isFocus
                ? theme.colors.border
                : theme.colors.line,
            },
            style,
          ]}
          onPress={() => action && action()}
        >
          {editable ? (
            <>
              <TextInput
                underlineColorAndroid="transparent"
                editable={editable}
                keyboardType={keyboardType}
                secureTextEntry={isShowPassword}
                placeholderTextColor={
                  placeholderTextColor
                    ? placeholderTextColor
                    : theme.colors.textPlaceholder
                }
                style={[
                  styles.textInput,
                  textStyle ? textStyle : undefined,
                  sourceIconRight ||
                  (iconVectorTypeRight && iconVectorNameRight)
                    ? undefined
                    : {paddingRight: Input.PADDING_CONTENT},
                ]}
                value={value}
                placeholder={valuePlaceholder}
                onChangeText={(text) =>
                  actionChangeText && actionChangeText(text)
                }
                multiline={multiline}
                numberOfLines={numberOfLines}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                autoCompleteType={autoCompleteType}
                onFocus={onInputFocus}
                onBlur={onBlurFocus}
                autoFocus={autoFocus}
              />
              {isPassword ? (
                <TouchableOpacity
                  onPress={actionHideShowPassword}
                  style={styles.buttonPassword}
                  activeOpacity={Touch.OPACITY}
                >
                  <Image
                    resizeMode="contain"
                    source={
                      isShowPassword
                        ? require('~/images/tab/home.png')
                        : require('~/images/tab/home1.png')
                    }
                  />
                </TouchableOpacity>
              ) : undefined}
            </>
          ) : (
            <Text
              style={[
                styles.textInput,
                textStyle ? textStyle : undefined,
                sourceIconRight || (iconVectorTypeRight && iconVectorNameRight)
                  ? undefined
                  : {paddingRight: Input.PADDING_CONTENT},
                value && value.trim().length > 0
                  ? undefined
                  : {
                      color: placeholderTextColor
                        ? placeholderTextColor
                        : theme.colors.textPlaceholder,
                    },
              ]}
              numberOfLines={1}
            >
              {value && value.trim().length > 0 ? value : valuePlaceholder}
            </Text>
          )}
          {renderIconRight(sourceIconRight, actionIconRight)}
          {renderVectorIconRight(
            iconVectorTypeRight,
            iconVectorNameRight,
            actionIconRight,
          )}
        </TouchableOpacity>
        {error && error.length > 0 ? (
          <Text style={styles.textError}>{error}</Text>
        ) : undefined}
      </View>
      {renderIconRight(sourceIconRightOutSide, actionIconRightOutSide)}
      {renderButtonRightOutSide(
        textButtonRightOutSize,
        actionButtonRightOutSide,
      )}
    </View>
  );
};
export default React.memo(InputText);
const createStyles = (theme: ExtendTheme) =>
  StyleSheet.create({
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      height: Input.HEIGHT,
      flex: 1,
      borderColor: theme.colors.border,
      borderWidth: Border.WIDTH,
      borderRadius: Border.RADIUS,
      backgroundColor: theme.colors.backgroundInput,
    },
    touchIcon: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: IconStyles.TOUCH_MIN_WIDTH,
      height: Input.HEIGHT,
      backgroundColor: 'transparent',
      paddingRight: 5,
      alignSelf: 'center',
    },
    icon: {
      width: IconStyles.WIDTH_ICON,
      height: IconStyles.HEIGHT_ICON,
    },
    textInput: {
      alignItems: 'center',
      fontSize: Input.FONT_SIZE,
      marginTop: 2,
      paddingLeft: Input.PADDING_CONTENT,
      flex: 1,
      color: theme.colors.textNormal,
      textAlignVertical: 'center',
      //textAlign: 'left',miss text with long text and don't show dots with long text ios  https://github.com/facebook/react-native/issues/14845
    },
    buttonRightOutSide: {
      minWidth: 90,
      marginLeft: 10,
      alignSelf: 'center',
    },
    buttonPassword: {
      height: Input.HEIGHT,
      minWidth: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagePassword: {
      width: 18,
      height: 18,
    },
    textError: {
      color: 'red',
      fontSize: 12,
      marginTop: 6,
    },
  });
