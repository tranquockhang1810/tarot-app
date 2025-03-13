import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import ChatScreen from '@/src/components/screens/chat/view/ChatScreen';

const chat = () => {
  const { id } = useLocalSearchParams();
  return (
    <ChatScreen id={id}/>
  )
}

export default chat