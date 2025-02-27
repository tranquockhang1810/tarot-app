import { View, Text } from 'react-native'
import React from 'react'
import {
  Button,
  Form,
  FormInstance,
  Modal,
} from '@ant-design/react-native'
import { AntDesign } from '@expo/vector-icons';
import MyInput from '@/src/components/foundation/MyInput'
import useColor from '@/src/hooks/useColor';
import { useAuth } from '@/src/context/auth/useAuth';
import OTPTextView, { } from 'react-native-otp-textinput';

const PopUpLoginModal = ({
  open,
  onCancel,
  form,
  handlePhoneInput,
  phoneLoading,
  validatedMessage,
  setValidatedMessage,
  loginStep,
  handleOtp
}: {
  open: boolean,
  onCancel: () => void,
  form: FormInstance,
  handlePhoneInput: (phone: string) => void,
  phoneLoading: boolean,
  validatedMessage: string,
  setValidatedMessage: React.Dispatch<React.SetStateAction<string>>,
  loginStep: "phone" | "otp",
  handleOtp: (otp: string) => void
}) => {
  const { redError, brandPrimaryDark, brandPrimaryTapRGB } = useColor();
  const { localStrings } = useAuth();

  return (
    <Modal
      popup
      visible={open}
      closable
      animationType="slide-up"
      onClose={onCancel}
      style={{ backgroundColor: brandPrimaryDark, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
    >
      {/* Cancel button */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ width: 50 }}>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            {loginStep === "phone" ? localStrings.Login.Phone : localStrings.Login.OTP}
          </Text>
        </View>
        <Button style={{ borderWidth: 0 }} onPress={onCancel} type='ghost'>
          <AntDesign name="close" size={20} color="white" />
        </Button>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 30, paddingHorizontal: 20 }}>
        {loginStep === "phone" ? (
          <MyInput
            variant='filled'
            type='number'
            placeholder='Nhập số điện thoại'
            autoFocus
            maxLength={10}
            onChange={(e: any) => {
              setValidatedMessage('')
              form.setFieldValue('phone', e?.target?.value)
            }}
          />
        ) : (
          <>
            <Text style={{ color: 'white', marginBottom: 10 }}>
              {"Đã gửi tới: "} 
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {form.getFieldValue('phone')}
              </Text>
            </Text>
            <OTPTextView
              inputCount={6}
              autoFocus
              tintColor={brandPrimaryDark}
              textInputStyle={{
                borderBottomWidth: 0,
                borderWidth: 0,
                borderRadius: 10,
                backgroundColor: 'white',
                borderColor: 'white'
              }}
              handleTextChange={(otp: string) => {
                setValidatedMessage('')
                form.setFieldValue('otp', otp)
              }}
            />
          </>
        )}
        <Form form={form} style={{ display: 'none' }} />
        {validatedMessage && <Text style={{ color: redError, fontSize: 12, marginTop: 5 }}>{validatedMessage}</Text>}
        <Button
          type='primary'
          style={{
            width: '100%',
            borderWidth: 0,
            marginTop: 20,
            backgroundColor: brandPrimaryTapRGB(0.5)
          }}
          onPress={() => {
            if (loginStep === "phone") {
              const { phone } = form.getFieldsValue(true)
              handlePhoneInput(phone)
            } else {
              const { otp } = form.getFieldsValue(true)
              handleOtp(otp)
            }
          }}
          loading={phoneLoading}
          disabled={phoneLoading}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {phoneLoading ? localStrings.GLobals.Processing : localStrings.GLobals.Next}
          </Text>
        </Button>
      </View>
    </Modal>
  )
}

export default PopUpLoginModal