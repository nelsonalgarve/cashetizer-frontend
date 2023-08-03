import React, {useState, useEffect, useRef} from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';


export const CameraComposant = () => {
useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    if (isFocused) {
      requestCameraPermission(); 
    }
  }, [isFocused]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 1});
     setLivePhoto(photo.uri);
      setShowCamera(false);
      const formData = new FormData();
formData.append('photoFromFront', {
  uri: photo.uri,
  name: 'photo.jpg',
  type: 'image/jpeg',
});
};
  };
}