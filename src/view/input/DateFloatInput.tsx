import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ExtendTheme, useTheme} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  convertToLocalDateTime,
  convertToServerDateTime,
  isValid,
  LOCAL_DATE_INPUT_FORMAT,
  LOCAL_TIME_INPUT_FORMAT,
  SERVER_DATE_TIME_FORMAT,
} from '~/utils/UtilDate';
import {isString} from 'lodash';
import InputTextWithTitle from './InputTextWithTitle';
import { InputWithTitleWrapperProps } from './InputWithTitleWrapper';

export enum DateFloatInputMode {
  date = 'date',
  time = 'time',
}
interface DateFloatInputProps extends InputWithTitleWrapperProps {
  initDate?: string;
  callbackDateFloatInput?: (date: string) => void;
  error?: string | undefined;
  title?: string;
  valuePlaceholder?: string;
  mode: DateFloatInputMode;
  disabled?: boolean;
}
const DateFloatInput: React.FC<DateFloatInputProps> = ({
  initDate,
  callbackDateFloatInput,
  error,
  title,
  mode,
  valuePlaceholder,
  disabled,
  ...props
}) => {
  const theme = useTheme();
  const styles = makeStyle(theme);

  const [datePickerData, setDatePickerData] = useState<{
    isShow: boolean;
    data: Date | undefined;
  }>({isShow: false, data: undefined});

  useEffect(() => {
    console.log(
      `reset initial date ${initDate} - is valid date: ${isValid(
        initDate ?? '',
      )}`,
    );
    if (isString(initDate) && isValid(initDate)) {
      // initDate timezone GMT
      setDatePickerData((prevState) => {
        return {
          ...prevState,
          data: new Date(
            convertToLocalDateTime(initDate, SERVER_DATE_TIME_FORMAT),
          ),
        };
      });
    }
  }, [initDate]);

  const toggleDatePicker = useCallback(
    (status: boolean) => () => {
      if (disabled === undefined || disabled === false) {
        setDatePickerData((prevState) => {
          return {
            ...prevState,
            isShow: status,
          };
        });
      }
    },
    [],
  );

  const handleConfirm = useCallback(
    (date) => {
      setDatePickerData({
        isShow: false,
        data: date,
      });
      callbackDateFloatInput?.(convertToServerDateTime(date));
    },
    [datePickerData],
  );

  return (
    <View style={styles.container}>
      <InputTextWithTitle
        {...props}
        title={title}
        valuePlaceholder={valuePlaceholder}
        editable={false}
        action={toggleDatePicker(true)}
        sourceIconRight={
          mode === 'date'
            ? require('~/images/icons/calendar.png')
            : require('~/images/icons/clock.png')
        }
        // style={styles.input}
        value={
          datePickerData?.data
            ? convertToLocalDateTime(
                datePickerData?.data,
                mode === 'date'
                  ? LOCAL_DATE_INPUT_FORMAT
                  : LOCAL_TIME_INPUT_FORMAT,
              )
            : ''
        }
        error={error}
        actionChangeText={() => {}} //Prevent wrong type warning
      />
      <DateTimePickerModal
        isVisible={datePickerData?.isShow}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={toggleDatePicker(false)}
        date={datePickerData?.data}
      />
    </View>
  );
};

export default memo(DateFloatInput);

const makeStyle = (_: ExtendTheme) =>
  StyleSheet.create({
    container: {flex: 1},
  });
