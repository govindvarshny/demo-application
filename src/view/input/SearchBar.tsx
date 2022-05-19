import React from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import lodash from 'lodash';
import {Touch} from '~/styles';
interface Props {
  style?: ViewStyle;
  value?: string;
  actionClear?: () => void;
}
const SearchBar: React.FC<Props> = ({style, value, actionClear}) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        resizeMode="contain"
        style={styles.lookupIcon}
        source={require('~/images/search.png')}
      />
      <TextInput
        style={styles.input}
        //borderColor="transparent" // props for border
        underlineColorAndroid="transparent"
        placeholderTextColor="#303233"
        returnKeyType="search"
        value={value}
      />
      {!lodash.isEmpty(value) && (
        <TouchableOpacity
          activeOpacity={Touch.OPACITY}
          onPress={() => actionClear && actionClear()}
        >
          <Image
            resizeMode="contain"
            style={styles.delIcon}
            source={require('~/images/circle_x.png')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 22,
    backgroundColor: '#EDF1F5',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lookupIcon: {width: 24, height: 24},
  input: {flex: 1, marginHorizontal: 5},
  delIcon: {width: 24, height: 24},
});
