import FastImage, {
  OnLoadEvent,
  ImageStyle,
  ResizeMode,
} from 'react-native-fast-image';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {getValidLink} from '~/utils/UtilValidate';
interface Props {
  style?: ImageStyle;
  uri?: string; // http, https
  localPath?: string; // path disk local
  sourceIconDefault?: any; //require('path asset')
  resizeMode?: ResizeMode;
  tintColor?: string;
}
const MyFastImage: React.FC<Props> = ({
  uri,
  localPath,
  style,
  sourceIconDefault,
  resizeMode,
  tintColor,
}) => {
  const [isLoading, setLoading] = useState(true);
  React.useEffect(() => {
    setLoading(true); // fix change uri
  }, [uri]);
  const onError = () => {
    console.log('### MyFastImage.onError');
  };
  const onLoadStart = () => {};
  const onLoad = (e: OnLoadEvent) => {
    try {
      if (e.nativeEvent) {
        if (e.nativeEvent.width > 0 && e.nativeEvent.height > 0) {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log('### MyFastImage.onLoad exception', error);
    }
  };
  const onLoadEnd = () => {};
  return (
    <>
      {isLoading && (
        // <Image
        //   resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.cover}
        //   style={{...style, position: 'absolute'}}
        //   source={sourceIconDefault}
        // />
        <FastImage
          resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.cover}
          style={{...style, position: 'absolute'}}
          source={Image.resolveAssetSource(sourceIconDefault)}
          tintColor={tintColor}
        />
      )}
      {getValidLink(uri) || localPath ? (
        <FastImage
          style={style}
          source={{
            uri: localPath ? localPath : uri,
            priority: FastImage.priority.normal,
          }}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onError={onError}
          onLoadEnd={onLoadEnd}
          resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.cover}
          tintColor={tintColor}
        />
      ) : null}
    </>
  );
};
export default React.memo(MyFastImage);
