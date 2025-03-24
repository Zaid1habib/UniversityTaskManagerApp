import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { SideMenu, FilterValues } from './index';

const { width } = Dimensions.get('window');

interface SideMenuModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  loading?: boolean;
  initialValues?: Partial<FilterValues>;
}

export function SideMenuModal({
  isVisible,
  onClose,
  onApply,
  loading,
  initialValues,
}: SideMenuModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionOutTiming={0}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <SideMenu
        onClose={onClose}
        onApply={onApply}
        loading={loading}
        initialValues={initialValues}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignSelf: 'flex-end',
    margin: 0,
    width: Math.min(width * 0.85, 400),
  },
});
