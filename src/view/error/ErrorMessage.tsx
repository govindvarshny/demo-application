import React from 'react';
import {styleErrorMessage} from './styles';
import {TextStyle, Text, View, ViewStyle} from 'react-native';

interface Props {
  errorValue: any;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ErrorMessage = (props: Props) => {
  const {errorValue, containerStyle, textStyle} = props;

  return errorValue ? (
    <View style={[styleErrorMessage.container, containerStyle] as any}>
      <Text style={[styleErrorMessage.errorText, textStyle] as TextStyle}>
        {errorValue}
      </Text>
    </View>
  ) : null;
};

export default React.memo(ErrorMessage);
