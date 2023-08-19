import styled from 'styled-components/native';
import theme from '../../../../infrastructure/theme';

export const OTPInputSection = styled.View`
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const HiddenTextInput = styled.TextInput`
  width: 1px;
  height: 1px;
  opacity: 0;
`;

export const OTPInputContainer = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

export const OTPInputBox = styled.View`
  border-color: ${theme.VIOLET};
  background-color: ${theme.GREY_5 + '68'};
  min-width: 16%;
  max-width: 25%;
  border-width: 1px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const OTPInputBoxFocused = styled.View`
  border-color: ${theme.GREEN_MED};
  background-color: ${theme.GREY_5 + '68'};
  width: 16%;
  border-width: 2px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const OTPInputText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
`;
