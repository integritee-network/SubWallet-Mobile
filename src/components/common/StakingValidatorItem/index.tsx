import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Icon, Number } from 'components/design-system-ui';
import { FontMedium } from 'styles/sharedStyles';
import { CheckCircle, DotsThree, Medal } from 'phosphor-react-native';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import StakingValidatorItemStyle from './style';
import { ValidatorDataType } from 'hooks/screen/Staking/useGetValidatorList';
import { isEthereumAddress } from '@polkadot/util-crypto';
import { toShort } from 'utils/index';
import { getValidatorKey } from 'utils/transaction/stake';

interface Props {
  validatorInfo: ValidatorDataType;
  onPress?: (changeVal: string) => void;
  onPressRightButton?: () => void;
  isSelected?: boolean;
  isNominated?: boolean;
  showUnSelectedIcon?: boolean;
}

export const StakingValidatorItem = ({
  validatorInfo,
  onPress,
  onPressRightButton,
  isNominated,
  isSelected,
  showUnSelectedIcon = true,
}: Props) => {
  const theme = useSubWalletTheme().swThemes;
  const _style = StakingValidatorItemStyle(theme);
  const { address, identity, symbol, commission, expectedReturn } = validatorInfo;
  const onPressItem = useCallback(() => {
    onPress && onPress(getValidatorKey(address, identity));
  }, [address, identity, onPress]);
  return (
    <TouchableOpacity style={_style.container} onPress={onPressItem}>
      <View style={_style.avatarWrapper}>
        <Avatar value={address} size={40} theme={isEthereumAddress(address) ? 'ethereum' : 'polkadot'} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={_style.contentWrapper}>
          <Text numberOfLines={1} style={_style.validatorNameTextStyle}>
            {identity || toShort(address)}
          </Text>
          {isNominated && <Icon iconColor={theme.colorSuccess} phosphorIcon={Medal} size={'xs'} weight={'fill'} />}
        </View>

        <View style={_style.contentWrapper}>
          <Text style={_style.subTextStyle}>{`Commission: ${commission}%`}</Text>
          <Text style={_style.subTextStyle}>{' - APY: '}</Text>
          <Number
            decimal={0}
            suffix={symbol}
            size={12}
            value={expectedReturn?.toString() || '0'}
            textStyle={{ ...FontMedium }}
            decimalOpacity={0.45}
            intOpacity={0.45}
            unitOpacity={0.45}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {(showUnSelectedIcon || isSelected) && (
          <Icon
            phosphorIcon={CheckCircle}
            size={'sm'}
            weight={'fill'}
            iconColor={isSelected ? theme.colorSuccess : theme.colorTextLight4}
          />
        )}
        <Button
          style={{ marginLeft: 10 }}
          type={'ghost'}
          size={'xs'}
          icon={<Icon phosphorIcon={DotsThree} size={'sm'} iconColor={theme.colorTextLight4} />}
          onPress={onPressRightButton}
        />
      </View>
    </TouchableOpacity>
  );
};