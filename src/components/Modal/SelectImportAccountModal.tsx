import React from 'react';
import { SubWalletModal } from 'components/Modal/Base/SubWalletModal';
import { StyleProp, View } from 'react-native';
import Text from '../Text';
import { FontBold, sharedStyles, STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';
import { SecretTypeItem } from 'components/SecretTypeItem';
import { AccountActionType } from 'types/ui-types';
import { deviceHeight } from 'constants/index';
import Toast from 'react-native-toast-notifications';
import ToastContainer from 'react-native-toast-notifications';

interface Props {
  modalTitle: string;
  modalVisible: boolean;
  onChangeModalVisible: () => void;
  secretTypeList: AccountActionType[];
  onModalHide?: () => void;
  toastRef?: React.RefObject<ToastContainer>;
}

const modalTitleStyle: StyleProp<any> = {
  ...sharedStyles.mediumText,
  ...FontBold,
  color: ColorMap.light,
  paddingBottom: 16,
  textAlign: 'center',
};

export const SelectImportAccountModal = ({
  secretTypeList,
  modalVisible,
  onChangeModalVisible,
  onModalHide,
  modalTitle,
  toastRef,
}: Props) => {
  return (
    <SubWalletModal modalVisible={modalVisible} onModalHide={onModalHide} onChangeModalVisible={onChangeModalVisible}>
      <View style={{ width: '100%' }}>
        <Text style={modalTitleStyle}>{modalTitle}</Text>
        {secretTypeList.map(item => (
          <SecretTypeItem key={item.title} title={item.title} icon={item.icon} onClickButton={item.onCLickButton} />
        ))}
      </View>

      {
        <Toast
          duration={1500}
          normalColor={ColorMap.notification}
          ref={toastRef}
          placement={'bottom'}
          offsetBottom={deviceHeight - STATUS_BAR_HEIGHT - 80}
        />
      }
    </SubWalletModal>
  );
};