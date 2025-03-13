import { ResultObject } from "@/src/api/baseApiResponseModel/baseApiResponseModel";
import { useAuth } from "@/src/context/auth/useAuth";
import { Form } from "@ant-design/react-native";
import React from "react";
import { defaultLoginRepository } from "@/src/api/features/login/LoginRepository";
import auth from "@react-native-firebase/auth";
import { convertToInternational } from "@/src/utils/helper/PhoneConvert";
import { router } from "expo-router";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const LoginViewModel = () => {
  const [validatedMessage, setValidatedMessage] = React.useState('');
  const [resultObject, setResultObject] = React.useState<ResultObject | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const { localStrings, onLogin } = useAuth();
  const [phoneLoading, setPhoneLoading] = React.useState(false);
  const [loginStep, setLoginStep] = React.useState<"phone" | "otp">("phone");
  const [form] = Form.useForm();
  const [verificationId, setVerificationId] = React.useState<string | null>(null);
  const [phone, setPhone] = React.useState<string | null>(null);
  const [facebookLoading, setFacebookLoading] = React.useState(false);

  const handlePhoneInput = async (phone: string) => {
    if (!phone) return setValidatedMessage(localStrings.Login.PhoneInvalid);
    if (phone.length < 10) return setValidatedMessage(localStrings.Login.PhoneLengthInvalid);
    try {
      setPhoneLoading(true);
      await auth().signInWithPhoneNumber(convertToInternational(phone))
        .then((confirm) => {
          setVerificationId(confirm?.verificationId);
          setResultObject({
            type: 'success',
            title: localStrings.Login.SentOTPSuccess
          })
          setPhone(phone);
          setLoginStep("otp");
        })
        .catch((error) => {
          console.error(error);
          setResultObject({
            type: 'error',
            title: localStrings.Login.SentOTPFailed,
          })
        });
    } catch (error: any) {
      console.error(error);
      setResultObject({
        type: 'error',
        title: localStrings.GLobals.ErrorMessage,
        content: error?.error?.message || error?.message
      })
    } finally {
      setPhoneLoading(false);
    }
  }

  const handleOtp = async (otp: string) => {
    if (!otp) return setValidatedMessage(localStrings.Login.OTPInvalid);
    if (otp.length < 6) return setValidatedMessage(localStrings.Login.OTPLengthInvalid);
    try {
      setPhoneLoading(true);
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await auth().signInWithCredential(credential);
      const idToken = await userCredential.user.getIdToken();
      const res = await defaultLoginRepository.loginByOtp({ idToken });
      if (res?.code === 200) {
        if (res?.data) {
          onLogin(res?.data);
          closeModal();
        } else {
          closeModal();
          router.push(`/(anonymous)/register?phone=${phone}&type=phone`);
        }
      } else {
        setResultObject({
          type: 'error',
          title: localStrings.Login.LoginFailed,
          content: res?.message
        })
      }
    } catch (error: any) {
      console.error(error);
      setResultObject({
        type: 'error',
        title: localStrings.GLobals.ErrorMessage,
        content: error?.error?.message || error?.message
      })
    } finally {
      setPhoneLoading(false);
    }
  }

  const closeModal = () => {
    setShowModal(false);
    setLoginStep("phone");
    setPhone(null);
    form.resetFields();
  }

  const onFacebookButtonPress = async () => {
    setFacebookLoading(true);
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      setFacebookLoading(false);
      return setResultObject({
        type: 'error',
        title: localStrings.GLobals.ErrorMessage,
      })
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      setFacebookLoading(false);
      return setResultObject({
        type: 'error',
        title: localStrings.GLobals.ErrorMessage,
      })
    }

    await handleFacebookLogin(data.accessToken);
  }

  const handleFacebookLogin = async (accessToken: string) => {
    if (!accessToken) return
    try {
      const res = await defaultLoginRepository.loginFacebook({ accessToken });
      if (res?.code === 200 && res?.data) {
        if (res?.data?.user) {
          onLogin(res?.data);
        } else if (res?.data?.registerInfo) {
          router.push(`/(anonymous)/register?facebookId=${res?.data?.registerInfo?.id}&name=${res?.data?.registerInfo?.name}&type=facebook`);
        }
      } else {
        setResultObject({
          type: 'error',
          title: localStrings.Login.LoginFailed,
          content: res?.message
        })
      }
    } catch (error: any) {
      console.error(error);
      setResultObject({
        type: 'error',
        title: localStrings.GLobals.ErrorMessage,
        content: error?.error?.message || error?.message
      })
    } finally {
      setFacebookLoading(false);
    }
  }

  return {
    handlePhoneInput,
    validatedMessage,
    setValidatedMessage,
    resultObject,
    phoneLoading,
    showModal,
    setShowModal,
    loginStep,
    setLoginStep,
    form,
    closeModal,
    handleOtp,
    onFacebookButtonPress,
    facebookLoading
  }
}

export default LoginViewModel