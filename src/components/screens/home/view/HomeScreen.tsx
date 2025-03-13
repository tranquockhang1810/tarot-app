import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/context/auth/useAuth';
import { Button } from '@ant-design/react-native';
import Screen from '@/src/components/layout/Screen';

const HomeScreen = () => {
  const { onLogout } = useAuth();
  return (
    <Screen>
      <Text style={{ color: 'white' }}>HomeScreen</Text>
      <Button onPress={onLogout}>Logout</Button>
    </Screen>
  )
}

export default HomeScreen