import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createStyles} from './styles';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {IMAGE_UPLOAD} from '~/api/constant/Account';
import {useTheme} from '@react-navigation/native';
import ErrorMessage from '~/view/error/ErrorMessage';
import { SPACE_16 } from '~/styles/Views';

export interface ImageUrlProps {
  uri: string;
  isCapture: boolean;
  isUpdate?: boolean;
}

interface PickImageProps {
  styleContain?: ViewStyle;
  styleView?: any;
  isHideText?: boolean;
  styleLabel?: TextStyle;
  initImage?: string;
  error?: string;
  disabled?: boolean;
  onChangeImage?: (image: string) => void;
}

const PickImage: React.FC<PickImageProps> = (props) => {
  const {t} = useTranslation();
  const themes = useTheme();
  const styles = useMemo(() => createStyles(themes), [themes]);
  const {styleContain, initImage, onChangeImage, disabled} = props;
  const [dataSelect, setDataSelect] = useState<string | undefined>();
  const actionSheetRef = useRef<ActionSheet>(null);
  const options = [t('cancel'), t('camera'), t('library')];

  useEffect(() => {
    if (initImage && initImage !== '') {
      setDataSelect(initImage);
    }
  }, [initImage]);

  useEffect(() => {
    if (dataSelect) {
      onChangeImage && onChangeImage(dataSelect);
    }
  }, [dataSelect]);

  const showBottomSheet = () => {
    actionSheetRef.current?.show();
  };

  const onPressRemove = useCallback(() => {
    setDataSelect(undefined);
  }, []);

  const onPressSelect = async (index: number) => {
    if (index === 0) {
      return;
    }
    if (index === 1) {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        multiple: false,
        includeExif: true,
        compressImageMaxWidth: IMAGE_UPLOAD.MAX_WIDTH,
        compressImageMaxHeight: IMAGE_UPLOAD.MAX_HEIGHT,
      });
      const uri = image?.path;
      
      if (uri && uri !== '') {
        setDataSelect(uri);
      }
    } else {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageMaxWidth: IMAGE_UPLOAD.MAX_WIDTH,
        compressImageMaxHeight: IMAGE_UPLOAD.MAX_HEIGHT,
        includeExif: true,
        multiple: false,
      });
      const uri = image?.path;
      if (uri && uri !== '') {
        setDataSelect(uri);
      }
    }
  };

  const ImageSelect = () => {
    return (
      <TouchableOpacity style={styles.touch} disabled={true}>
        <TouchableOpacity onPress={onPressRemove} style={styles.imageClose}>
          <Image source={require('~/images/ic_remove.png')} />
        </TouchableOpacity>
        <View style={[styles.touchUpload]}>
          <Image
            style={[styles.imageItemDetail] as any}
            resizeMode={FastImage.resizeMode.cover}
            source={{uri: initImage !== '' ? initImage : undefined}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const ImageItemUpload = () => {
    return (
      <TouchableOpacity onPress={showBottomSheet} style={[styles.touchUpload]}>
        <Image
          style={{height: 25, width: 25}}
          source={require('~/images/ic_image.png')}
        />
      </TouchableOpacity>
    );
  };

  const renderPickImage = () => {
    return (
      <View style={styles.image}>
        {dataSelect ? <ImageSelect /> : <ImageItemUpload />}
      </View>
    );
  };
  return (
    <View
      style={[styles.viewContain, styleContain]}
      pointerEvents={disabled === true ? 'none' : 'auto'}
    >
      {renderPickImage()}
      <ErrorMessage
        containerStyle={{
          marginHorizontal: SPACE_16,
          alignItems: 'flex-start',
          width: '100%',
        }}
        errorValue={props.error ?? undefined}
      />
      <ActionSheet
        ref={actionSheetRef}
        title={t('select_option')}
        options={options}
        cancelButtonIndex={0}
        onPress={(index) => {
          onPressSelect(index);
        }}
      />
    </View>
  );
};

export default React.memo(PickImage);
