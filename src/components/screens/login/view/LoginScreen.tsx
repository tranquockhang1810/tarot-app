import { View, Text, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect } from 'react';
import { Image } from 'expo-image';
import { Button, Form } from '@ant-design/react-native';
import { Feather } from '@expo/vector-icons';
import useColor from '@/src/hooks/useColor';
import VideoBackground from '@/src/components/layout/VideoBackground';
import { useAuth } from '@/src/context/auth/useAuth';
import PopUpLoginModal from './popUpLogin/PopUpLoginModal';
import { showToast } from '@/src/utils/helper/SendMessage';
import Toast from 'react-native-toast-message';
import LoginViewModel from '../viewModel/LoginViewModel';

const LoginScreen = () => {
  const { brandPrimaryRGB } = useColor();
  const { localStrings } = useAuth();
  const {
    showModal,
    setShowModal,
    handlePhoneInput,
    phoneLoading,
    validatedMessage,
    setValidatedMessage,
    resultObject,
    loginStep,
    setLoginStep,
    form,
    closeModal,
    handleOtp,
    onFacebookButtonPress,
    facebookLoading
  } = LoginViewModel();

  useEffect(() => {
    if (resultObject?.type) {
      showToast({ 
        type: resultObject?.type, 
        title: resultObject?.title, 
        content: resultObject?.content 
      });
    }
  }, [resultObject]);

  return (
    <VideoBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          behavior={'padding'}
        >
          <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20 }}>
            {/* Logo */}
            <View>
              <Image
                source={require("@/assets/images/icon.png")}
                style={{
                  width: 200,
                  height: 200,
                  marginTop: !showModal ? 150 : 40,
                }}
              />
            </View>

            {/* AppName */}
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>{localStrings.GLobals.AppName}</Text>

            {/* Phone */}
            <Button
              type='primary'
              style={{
                width: '100%',
                marginTop: 150,
                height: 60,
                backgroundColor: brandPrimaryRGB(0.7),
                borderWidth: 0,
              }}
              onPress={() => setShowModal(true)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Feather style={{ color: 'white', marginRight: 20 }} size={26} name="smartphone" />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'semibold',
                  }}
                >
                  {localStrings.Login.LoginByPhone}
                </Text>
              </View>
            </Button>

            {/* Facebook */}
            <Button
              type='primary'
              style={{
                width: '100%',
                marginTop: 50,
                height: 60,
                backgroundColor: brandPrimaryRGB(0.7),
                borderWidth: 0,
              }}
              loading={facebookLoading}
              disabled={facebookLoading}
              onPress={onFacebookButtonPress}
            >
              <View style={{ flexDirection: 'row' }}>
                <Feather style={{ color: 'white', marginRight: 20 }} size={26} name="facebook" />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'semibold'
                  }}
                >
                  {localStrings.Login.LoginByFacebook}
                </Text>
              </View>
            </Button>
          </SafeAreaView>
          {showModal && (
            <PopUpLoginModal 
              open={showModal}
              onCancel={closeModal}
              form={form}
              handlePhoneInput={handlePhoneInput}
              loginStep={loginStep}
              phoneLoading={phoneLoading}
              setValidatedMessage={setValidatedMessage}
              validatedMessage={validatedMessage}
              handleOtp={handleOtp}
            />
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <Toast />
    </VideoBackground>
  );
};

export default LoginScreen;
