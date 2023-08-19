/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  OTPInputSection,
  HiddenTextInput,
  OTPInputContainer,
  OTPInputBox,
  OTPInputText,
  OTPInputBoxFocused,
} from './otp-styles';
import theme from '../../../../infrastructure/theme';
import { TextInput } from 'react-native';

interface OTPInputProps {
  code: string;
  setCode: (value: string) => void;
  maximumLength: number;
  setPinReady: (value: boolean) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  code,
  setCode,
  maximumLength = 6,
  setPinReady,
}) => {
  const boxArray = new Array(maximumLength).fill(0);
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const inputRef = useRef<any>(null);

  const opacityShared = useSharedValue(0);

  const animateOpacityAction = useAnimatedStyle(() => {
    return {
      opacity: opacityShared.value,
    };
  });

  useEffect(() => {
    const handleOpacityBlink = () => {
      'worklet';
      console.log('starting');
      opacityShared.value = withRepeat(withTiming(1), -1, true);
      setIsBlinking(true);
    };

    !isBlinking && handleOpacityBlink();
    console.log(isBlinking);
  }, [opacityShared, isInputBoxFocused, isBlinking]);

  const handleOnPress = () => {
    console.log('pressing here');
    setIsInputBoxFocused(true);
    inputRef?.current?.focus();
  };

  // eslint-disable-next-line no-unused-vars
  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  const renderDigitInput = (_value: any, index: any) => {
    // formatting
    const isCurrentDigit = index === code?.length;
    const isLastDigit = index === maximumLength - 1;
    const isCodeFull = code?.length === maximumLength;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    // ====>
    const emptyInputChar = ' ';
    const digit = code[index]
      ? `${code[index]}${emptyInputChar}`
      : emptyInputChar;

    const StyledOTPInput =
      isInputBoxFocused && isDigitFocused ? OTPInputBoxFocused : OTPInputBox;

    return (
      <StyledOTPInput key={index}>
        <OTPInputText>{digit}</OTPInputText>
        {isInputBoxFocused && isDigitFocused && (
          <Animated.View
            style={[
              {
                backgroundColor: theme.GREEN_MED,
                width: 3,
                height: '60%',
                marginVertical: 10,
                marginLeft: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              },
              animateOpacityAction,
            ]}
          />
        )}
      </StyledOTPInput>
    );
  };

  useEffect(() => {
    // update pin ready status
    setPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setPinReady(false);
    };
  }, [code, maximumLength, setPinReady]);

  return (
    <OTPInputSection>
      <OTPInputContainer onPress={handleOnPress}>
        {boxArray.map(renderDigitInput)}
      </OTPInputContainer>
      <TextInput
        style={{
          width: 1,
          height: 1,
          opacity: 0,
        }}
        ref={inputRef}
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
      />
    </OTPInputSection>
  );
};
