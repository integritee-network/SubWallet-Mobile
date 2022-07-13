import React from 'react';
import { MainScreenContainer } from 'components/MainScreenContainer';
import { HorizontalTabView } from 'components/HorizontalTabView';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/routes';
import { ChainsTab } from 'screens/Home/CtyptoTab/ChainList/ChainsTab';
import { TokensTab } from 'screens/Home/CtyptoTab/ChainList/TokensTab';
import BigN from 'bignumber.js';
import { BalanceInfo } from '../../../../types';
import { AccountInfoByNetwork, BalanceContainerType } from 'types/ui-types';
import { BalanceBlock } from 'screens/Home/CtyptoTab/shared/BalanceBlock';
interface Props {
  accountInfoByNetworkMap: Record<string, AccountInfoByNetwork>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  showedNetworks: string[];
  networkBalanceMaps: Record<string, BalanceInfo>;
  onPressChainItem: (info: AccountInfoByNetwork, balanceInfo: BalanceInfo) => void;
  onPressTokenItem: (
    tokenName: string,
    tokenBalanceValue: BigN,
    tokenConvertedValue: BigN,
    tokenSymbol: string,
    info?: AccountInfoByNetwork,
    balanceInfo?: BalanceInfo,
  ) => void;
  balanceContainerProps: BalanceContainerType;
}

const ROUTES = [
  { key: 'chains', title: 'Chains' },
  { key: 'tokens', title: 'Tokens' },
];

export const ChainListScreen = ({
  accountInfoByNetworkMap,
  navigation,
  showedNetworks,
  networkBalanceMaps,
  onPressChainItem,
  onPressTokenItem,
  balanceContainerProps,
}: Props) => {
  // @ts-ignore
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'tokens':
        return (
          <TokensTab
            accountInfoByNetworkMap={accountInfoByNetworkMap}
            networkBalanceMaps={networkBalanceMaps}
            onPressTokenItem={onPressTokenItem}
          />
        );
      case 'chains':
      default:
        return (
          <ChainsTab
            onPressChainItem={onPressChainItem}
            networkKeys={showedNetworks}
            networkBalanceMaps={networkBalanceMaps}
            accountInfoByNetworkMap={accountInfoByNetworkMap}
          />
        );
    }
  };

  return (
    <MainScreenContainer navigation={navigation}>
      <>
        <BalanceBlock {...balanceContainerProps} />

        <HorizontalTabView routes={ROUTES} renderScene={renderScene} />
      </>
    </MainScreenContainer>
  );
};