import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/context/auth/useAuth';
import { Button } from '@ant-design/react-native';
import Screen from '@/src/components/layout/Screen';
import { router } from 'expo-router';
import dayjs from 'dayjs';

const HomeScreen = () => {
  const { onLogout, changeLanguage, localStrings } = useAuth();
  return (
    <Screen>
      <Button onPress={() => router.push({
        pathname: `/(routes)/horoscope/details`,
        params: {
          date: dayjs().format('YYYY-MM-DD')
        }
      })}>{localStrings.Horoscope.Today}</Button>
    </Screen>
  )
}

export default HomeScreen