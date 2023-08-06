import React from 'react';
import { View, Image, Modal, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PhotoViewerModal = ({ visible, photos, currentIndex, onClose, onNext, onPrev, onDelete, setPhotos }) => {
  const currentPhoto = photos[currentIndex];

  const handleDelete = () => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(currentIndex, 1);
    setPhotos(updatedPhotos);
    onClose(); // Close the modal after deleting
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <TouchableOpacity style={{ position: 'absolute', top: 40, right: 20, marginTop:20 }} onPress={onClose}>
          <Ionicons name="close-circle-outline" size={35} color="white" />
        </TouchableOpacity>
        <View style={{ width: '90%', height: '70%', justifyContent: 'center' }}>
          <Image source={{ uri: currentPhoto }} style={{ width: '100%', height: '100%' }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, marginTop: 10 }}>
      {currentIndex > 0 ? (
        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-start' }} onPress={onPrev}>
          <Ionicons name="arrow-back-circle-outline" size={35} color="white" />
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {photos.length >= 1 && (
        <TouchableOpacity style={{ marginHorizontal: 20, alignSelf: 'center' }} onPress={handleDelete}>
          <Ionicons name="trash-bin-outline" size={25} color="white" />
        </TouchableOpacity>
      )}

      {currentIndex < photos.length - 1 ? (
        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={onNext}>
          <Ionicons name="arrow-forward-circle-outline" size={35} color="white" />
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1 }} />
      )}
    </View>
      </View>
    </Modal>
  );
};

export default PhotoViewerModal;
