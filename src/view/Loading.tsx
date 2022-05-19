import React, {useMemo} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import {ExtendTheme, useTheme} from '@react-navigation/native';
interface Props {
  isLoading: boolean;
}
const Loading: React.FC<Props> = (props) => {
  const {isLoading} = props;
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isLoading}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="small"
            color={theme.colors.primary}
            animating={isLoading}
          />
        </View>
      </View>
    </Modal>
  );
};
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: _theme.colors.backgroundLoading,
    },
    activityIndicatorWrapper: {
      backgroundColor: _theme.colors.white,
      height: 80,
      width: 80,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  });

export default React.memo(Loading);
