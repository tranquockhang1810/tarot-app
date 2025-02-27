import { ResultObject } from "@/src/api/baseApiResponseModel/baseApiResponseModel";
import { useAuth } from "@/src/context/auth/useAuth";
import { Form } from "@ant-design/react-native";
import React from "react";
import { defaultLoginRepository } from "@/src/api/features/login/LoginRepository";
import auth from "@react-native-firebase/auth";
import { convertToInternational } from "@/src/utils/helper/PhoneConvert";
import { router } from "expo-router";

const LoginViewModel = () => {
  const [validatedMessage, setValidatedMessage] = React.useState('');
  const [resultObject, setResultObject] = React.useState<ResultObject | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const { localStrings, onLogin } = useAuth();
  const [phoneLoading, setPhoneLoading] = React.useState(false);
  const [loginStep, setLoginStep] = React.useState<"phone" | "otp">("phone");
  const [form] = Form.useForm();
  const [verificationId, setVerificationId] = React.useState<string | null>(null);

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
      if (res?.data) {
        onLogin(res?.data);
        closeModal();
      } else {
        setResultObject({
          type: 'success',
          title: localStrings.Login.OTPVerified,
          content: res?.message
        })
        closeModal();
        router.push('/(anonymous)/register')
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
    form.resetFields();
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
    handleOtp
  }
}

export default LoginViewModel