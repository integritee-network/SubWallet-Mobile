import React, { useState } from 'react';
import { StyleProp, Text, TouchableOpacity, View } from 'react-native';
import { SubScreenContainer } from 'components/SubScreenContainer';
import { SubmitButton } from 'components/SubmitButton';
import { CopySimple, FingerprintSimple } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import { ContainerHorizontalPadding, FontBold, FontMedium, sharedStyles } from 'styles/sharedStyles';
import { LeftIconButton } from 'components/LeftIconButton';
import { BUTTON_ACTIVE_OPACITY } from '../constant';
import { PasswordInput } from 'components/PasswordInput';

const layoutContainerStyle: StyleProp<any> = {
  ...ContainerHorizontalPadding,
  flex: 1,
};

const bodyAreaStyle: StyleProp<any> = {
  flex: 1,
  paddingTop: 8,
};

const footerAreaStyle: StyleProp<any> = {
  marginLeft: -4,
  marginRight: -4,
  flexDirection: 'row',
  paddingTop: 12,
  paddingBottom: 38,
};

const warningBlockStyle: StyleProp<any> = {
  ...sharedStyles.blockContent,
  backgroundColor: ColorMap.warningOverlay,
  paddingBottom: 14,
  paddingTop: 17,
};

const warningBlockTextStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  color: ColorMap.warning,
  textAlign: 'center',
};

const warningBlockTitleStyle: StyleProp<any> = {
  ...warningBlockTextStyle,
  ...FontBold,
  marginBottom: 8,
};

const privateBlockStyle: StyleProp<any> = {
  ...sharedStyles.blockContent,
  height: 238,
  backgroundColor: ColorMap.dark2,
  marginTop: 16,
  marginBottom: 16,
};

const privateBlockOverlayStyle: StyleProp<any> = {
  flex: 1,
  justifyContent: 'center',
};

const privateBlockTextStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  ...FontMedium,
  color: ColorMap.disabled,
  textAlign: 'center',
};

const privateBlockIconStyle: StyleProp<any> = {
  alignItems: 'center',
};

const passwordInputStyle: StyleProp<any> = {
  backgroundColor: ColorMap.dark2,
  marginTop: 16,
};

const copyButtonWrapperStyle: StyleProp<any> = {
  alignItems: 'center',
};

const buttonStyle: StyleProp<any> = {
  margin: 4,
  flex: 1,
};

const ViewStep = {
  HIDE_PK: 1,
  ENTER_PW: 2,
  SHOW_PK: 3,
};
const PrivateBlockIcon = FingerprintSimple;

export const ViewPrivateKey = () => {
  const [privateKey, setPrivateKey] = useState<string>(
    'OxSWYgeW91IGV4cGVjdCB0aGUgcHJpdmF0ZSBrZXksIHRoZW4gbm90aGluZyB0byBzZWUgaGVyZQ==',
  );
  const [currentViewStep, setCurrentViewStep] = useState<number>(1);

  const _onTapPrivate = () => {
    setCurrentViewStep(ViewStep.ENTER_PW);
  };

  const _onPasswordBlur = () => {
    setCurrentViewStep(ViewStep.SHOW_PK);
  };

  return (
    <SubScreenContainer title={'Your Private Key'}>
      <View style={layoutContainerStyle}>
        <View style={bodyAreaStyle}>
          <View style={warningBlockStyle}>
            <Text style={warningBlockTitleStyle}>Do not share your private key!</Text>
            <Text style={warningBlockTextStyle}>
              If someone has your private key they will have full control of your account
            </Text>
          </View>

          {currentViewStep === ViewStep.HIDE_PK && (
            <TouchableOpacity activeOpacity={BUTTON_ACTIVE_OPACITY} style={privateBlockStyle} onPress={_onTapPrivate}>
              <View style={privateBlockOverlayStyle}>
                <Text style={{ ...privateBlockTextStyle, marginBottom: 4, color: ColorMap.light }}>
                  Tap to reveal your private key
                </Text>
                <Text style={{ ...privateBlockTextStyle, marginBottom: 8 }}>
                  Make sure no one is watching your screen
                </Text>
                <View style={privateBlockIconStyle}>
                  <PrivateBlockIcon size={32} color={ColorMap.light} />
                </View>
              </View>
            </TouchableOpacity>
          )}

          {currentViewStep === ViewStep.ENTER_PW && (
            <PasswordInput
              label={'password for this account'}
              onBlur={_onPasswordBlur}
              containerStyle={passwordInputStyle}
            />
          )}

          {currentViewStep === ViewStep.SHOW_PK && (
            <View style={privateBlockStyle}>
              <Text style={privateBlockTextStyle}>{privateKey}</Text>
            </View>
          )}

          {currentViewStep !== ViewStep.ENTER_PW && (
            <View style={copyButtonWrapperStyle}>
              <LeftIconButton
                icon={CopySimple}
                title={'Copy to Clipboard'}
                disabled={currentViewStep !== ViewStep.SHOW_PK}
              />
            </View>
          )}
        </View>

        <View style={footerAreaStyle}>
          <SubmitButton title={'Done'} style={buttonStyle} />
        </View>
      </View>
    </SubScreenContainer>
  );
};