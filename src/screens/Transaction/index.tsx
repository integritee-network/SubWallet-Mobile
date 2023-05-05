import React, { useCallback } from 'react';
import { ContainerWithSubHeader } from 'components/ContainerWithSubHeader';
import { View } from 'react-native';
import { Button, PageIcon, Typography } from 'components/design-system-ui';
import { CheckCircle } from 'phosphor-react-native';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import TransactionDoneStyle from './TransactionDone/style';
import { RootNavigationProps, TransactionDoneProps } from 'routes/index';
import { useNavigation } from '@react-navigation/native';
import { MarginBottomForSubmitButton } from 'styles/sharedStyles';

export const TransactionDone = ({
  route: {
    params: { chainType, chain, extrinsicHash },
  },
}: TransactionDoneProps) => {
  const theme = useSubWalletTheme().swThemes;
  const navigation = useNavigation<RootNavigationProps>();
  const _style = TransactionDoneStyle(theme);

  const viewInExplorer = useCallback(() => {
    if (chain && extrinsicHash) {
      navigation.navigate('History', { chain, extrinsicHash });
    } else {
      navigation.navigate('History', {});
    }
  }, [chain, extrinsicHash, navigation]);

  return (
    <ContainerWithSubHeader onPressBack={() => navigation.navigate('Home')} title={'Successful'}>
      <View style={_style.transactionDoneContainer}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <PageIcon icon={CheckCircle} color={theme.colorSuccess} />
          <Typography.Title style={_style.transactionDoneTitle}>{'You’re all done!'}</Typography.Title>

          <Typography.Text style={_style.transactionDoneMessage}>
            {'Your request has been sent. You can track its progress on the Transaction History page.'}
          </Typography.Text>
        </View>

        <View style={{ width: '100%', ...MarginBottomForSubmitButton }}>
          <Button onPress={viewInExplorer} style={{ marginBottom: 16 }} type={'secondary'}>
            {'View transaction'}
          </Button>

          <Button onPress={() => navigation.navigate('Home')}>{'Back to home'}</Button>
        </View>
      </View>
    </ContainerWithSubHeader>
  );
};