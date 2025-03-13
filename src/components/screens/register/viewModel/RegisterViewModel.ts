import { ResultObject } from "@/src/api/baseApiResponseModel/baseApiResponseModel";
import { defaultLoginRepository } from "@/src/api/features/login/LoginRepository";
import { RegisterModel } from "@/src/api/features/login/models/RegisterModel";
import { useAuth } from "@/src/context/auth/useAuth";
import { Form } from "@ant-design/react-native";
import React from "react";
import { useState } from "react";

const RegisterViewModel = () => {
  const [step, setStep] = useState(1);
  const [form] = Form.useForm();
  const [date, setDate] = useState(new Date())
  const [gender, setGender] = useState('')
  const steps = 3
  const [resultObject, setResultObject] = React.useState<ResultObject | null>(null);
  const { localStrings, onLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const params: RegisterModel = {
        id: form.getFieldValue('id') || undefined,
        name: form.getFieldValue('name') || undefined,
        phone: form.getFieldValue('phone') || undefined,
        birthDate: form.getFieldValue('birthDate') || undefined,
        gender: form.getFieldValue('gender') || undefined,
        type: form.getFieldValue('type') || undefined,
      }
      console.log("params", params);

      const res = await defaultLoginRepository.register(params);
      if (res?.data) {
        onLogin(res?.data);
      } else {
        setResultObject({
          type: 'error',
          title: localStrings.Register.RegisterFailed,
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
      setLoading(false);
    }
  }

  const validateInfo = (name: string, birthDate: string, gender: string) => {
    switch (step) {
      case 1:
        if (!name || name.length < 3) {
          setResultObject({
            type: 'error',
            title: localStrings.Register.Messages.FullnameRequired,
          })
        } else {
          setStep(step + 1);
        }
        break;
      case 2:
        if (!birthDate) {
          setResultObject({
            type: 'error',
            title: localStrings.Register.Messages.BirthdayRequired,
          })
        } else {
          setStep(step + 1);
        }
        break;
      case 3:
        if (!gender) {
          setResultObject({
            type: 'error',
            title: localStrings.Register.Messages.GenderRequired,
          })
        } else {
          handleRegister();
        }
        break;
      default:
        break;
    }
  }

  return {
    step,
    setStep,
    form,
    steps,
    date,
    setDate,
    gender,
    setGender,
    resultObject,
    loading,
    validateInfo
  }
}

export default RegisterViewModel