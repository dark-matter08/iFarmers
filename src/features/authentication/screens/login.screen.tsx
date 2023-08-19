import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPhoneCodeSelect from 'react-native-phone-code-select';
import theme from '../../../infrastructure/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from '../../../components/botton.component';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import { showToast } from '../../../utils/showToast';
import { OTPInput } from '../components/Input/OTPInput.component';

export const LoginScreen = () => {
  const { colors } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    code: 'CM',
    dial_code: '+237',
    flag: '🇨🇲',
    name: 'Cameroon',
  });
  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState('');
  const [codeFieldVisible, setCodeFieldVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeConfirming, setIsCodeConfirming] = useState(false);
  const [pinReady, setPinReady] = useState(false);
  const MAX_CODE_LENGTH = 5;

  const onAuthStateChanged = (user: any) => {
    console.log(user);

    if (user) {
      setCodeFieldVisible(false);
      setIsLoading(true);
    }
  };

  const signInWithPhoneNumber = async (phoneNumber: any) => {
    console.log(phoneNumber);

    setIsLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setIsCodeConfirming(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      showToast({
        title: 'Error Initializing',
        message: 'There was an erro trying to sign in',
        type: 'error',
      });
      setIsLoading(false);
    }
  };

  // const confirmCode = async () => {
  //   try {
  //     await confirm.confirm(code);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    setDialCode(selectedValue?.dial_code);
  }, [selectedValue]);

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 30,
      }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: theme.GOLD,
          paddingHorizontal: 20,
          paddingBottom: 40,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}>
        {/* lottie */}
        <View
          style={{
            marginTop: 30,
            height: 210,
          }}>
          <LottieView
            source={require('../../../../assets/lottie/welcome.json')}
            autoPlay
            loop
          />
        </View>

        {/* welcome message */}
        <View
          style={{
            marginBottom: 30,
          }}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: '800',
              color: colors.text,
              textAlign: 'center',
              opacity: 0.8,
            }}>
            Welcome to iFarmers
          </Text>
        </View>

        {/* Phone Number Input && code confirm*/}
        {!isCodeConfirming ? (
          <View
            style={{
              flexDirection: 'row',
              height: 55,
              width: '100%',
              backgroundColor: colors.background,
              borderRadius: 10,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                // width: 35,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 2,
                paddingRight: 10,
                flexDirection: 'row',
              }}
              onPress={() => setIsVisible((oldStatus) => !oldStatus)}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: '70%',
                  borderRightColor: theme.GREY_4,
                  borderRightWidth: 2,
                  marginRight: 5,
                  paddingRight: 5,
                }}>
                <Text
                  style={{ fontSize: 25, color: colors.text, marginRight: 5 }}>
                  {selectedValue.flag}
                </Text>
                <Ionicons size={23} name={'chevron-down'} color={colors.text} />
              </View>
              <Text style={{ fontSize: 18, color: colors.text }}>
                {dialCode}
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Enter Phone number"
              placeholderTextColor={colors.text}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              value={phoneNumber}
              style={{
                flex: 1,
                height: '100%',
                fontSize: theme.FONT_SIZE_NORMAL + 2,
                paddingVertical: 0,
                paddingHorizontal: 8,
                color: colors.text,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              height: 55,
              width: '100%',
              backgroundColor: theme.GREY_5,
              borderRadius: 10,
              paddingHorizontal: 20,
            }}>
            <TextInput
              placeholder="Enter verification code"
              onChangeText={setCode}
              keyboardType="phone-pad"
              value={code}
              style={{
                flex: 1,
                height: '100%',
                fontSize: theme.FONT_SIZE_NORMAL + 2,
                color: theme.DARK,
                paddingVertical: 0,
                paddingHorizontal: 8,
              }}
            />
          </View>
        )}
      </View>

      <OTPInput
        setPinReady={setPinReady}
        code={code}
        setCode={setCode}
        maximumLength={MAX_CODE_LENGTH}
      />

      {isCodeConfirming && (
        <Text
          style={{
            fontWeight: '400',
            fontSize: 15,
            textAlign: 'center',
            alignSelf: 'center',
            color: colors.text,
            marginTop: 20,
            paddingHorizontal: 60,
          }}>
          We have sent you a one time pass code, input in the field above
        </Text>
      )}

      <View style={{ flex: 1 }} />

      {/* BUtton */}
      <View
        style={{
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        {!isCodeConfirming ? (
          <Button
            title="Proceed to iFarmers"
            height={65}
            isLoading={isLoading}
            onPress={() => signInWithPhoneNumber(`${dialCode}${phoneNumber}`)}
          />
        ) : (
          <Button
            title="Confirm Code"
            backgroundColor={theme.VIOLET}
            isActive={!!pinReady}
            // onPress={confirmCode}
          />
        )}
      </View>

      <RNPhoneCodeSelect
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onCountryPress={(country: any) => setSelectedValue(country)}
        primaryColor="#f04a4a"
        secondaryColor="#000000"
        buttonText="Ok"
      />
    </View>
  );
};
