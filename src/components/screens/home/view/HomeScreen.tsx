import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/context/auth/useAuth';
import { Button } from '@ant-design/react-native';
import Screen from '@/src/components/layout/Screen';
import { router } from 'expo-router';
import dayjs from 'dayjs';

const HomeScreen = () => {
  const { onLogout, changeLanguage } = useAuth();
  return (
    <Screen>
      <Text style={{ color: 'white' }}>HomeScreen</Text>
      <Button onPress={() => router.push({
        pathname: `/(routes)/horoscope/details`,
        params: {
          date: dayjs().format('YYYY-MM-DD')
        }
      })}>Thông điệp hôm nay</Button>
      <Button onPress={() => router.push(`/(routes)/horoscope`)} style={{ marginVertical: 20 }}>LS thông điệp</Button>
      <Button onPress={onLogout}>Logout</Button>
      <Button onPress={() => changeLanguage()} style={{ marginVertical: 20 }}>Đổi ngôn ngữ</Button>
    </Screen>
  )
}

export default HomeScreen