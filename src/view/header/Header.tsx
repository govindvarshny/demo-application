import {useTheme} from '@react-navigation/native';
import {ExtendTheme} from '@react-navigation/native';
import React from 'react';
import {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  LayoutRectangle,
  LayoutChangeEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Header} from '~/styles';
import Line from '../Line';
interface Props {
  title?: string;
  viewLeftButton?: any;
  viewRightButton2?: any;
  viewRightButton?: any;
  colorBackgroundStartGradient?: string;
  colorBackgroundEndGradient?: string;
  //event
  callbackSizeHeader?: (ret: LayoutRectangle) => void;
}
//Header standard: https://learnui.design/blog/ios-font-size-guidelines.html
const HeaderComponent: React.FC<Props> = ({
  title,
  viewLeftButton,
  viewRightButton2,
  viewRightButton,
  colorBackgroundStartGradient,
  colorBackgroundEndGradient,
  //event
  callbackSizeHeader,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const currentStyle =
    viewRightButton && viewRightButton2
      ? styles.headerButtonDefault2
      : viewLeftButton || viewRightButton || viewRightButton2
      ? styles.headerButtonDefault
      : {};
  return (
    <View
      onLayout={(event: LayoutChangeEvent) => {
        //size = {x, y, width, height}
        const size = event.nativeEvent.layout;
        callbackSizeHeader && callbackSizeHeader(size);
      }}
    >
      <LinearGradient
        colors={[
          colorBackgroundStartGradient
            ? colorBackgroundStartGradient
            : theme.colors.backgroundHeader,
          colorBackgroundEndGradient
            ? colorBackgroundEndGradient
            : theme.colors.backgroundHeader,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      >
        <View style={styles.statusBar} />
        <View style={styles.content}>
          <View style={currentStyle}>{viewLeftButton}</View>
          {/* <View style={{flex: 1}} /> */}
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          {/* <View style={{flex: 1}} /> */}
          <View style={currentStyle}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}
            >
              {viewRightButton2}
              {viewRightButton}
            </View>
          </View>
        </View>
      </LinearGradient>
      <Line />
      {/* <OfflineModeMessage isConnected={isConnected} /> */}
    </View>
  );
};
export default React.memo(HeaderComponent);
const createStyles = (_theme: ExtendTheme) =>
  StyleSheet.create({
    statusBar: {
      height: Header.HEIGHT_STATUS_BAR,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: Header.HEIGHT_CONTENT,
      paddingBottom: Platform.OS === 'ios' ? 6 : 0,
    },
    title: {
      fontWeight: 'bold',
      fontSize: Header.TEXT_SIZE_TITLE,
      textAlign: 'center',
      color: _theme.colors.textTitleHeader,
      ...Platform.select({ios: {paddingBottom: 3}, android: {}}),
      flex: 1,
    },
    headerButtonDefault2: {
      width: Header.WIDTH_BUTTON * 2,
      height: Header.HEIGHT_CONTENT,
    },
    headerButtonDefault: {
      width: Header.WIDTH_BUTTON,
      height: Header.HEIGHT_CONTENT,
    },
  });
