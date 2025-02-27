import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/context/auth/useAuth';
import { Button } from '@ant-design/react-native';

const HomeScreen = () => {
  const { onLogout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>
      <Button onPress={onLogout}>Logout</Button>
    </View>
  )
}

export default HomeScreen