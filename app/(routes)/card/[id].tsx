import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import CardScreen from '@/src/components/screens/cards/view/CardScreen';

const card = () => {
  const { id } = useLocalSearchParams();
  return (
    <CardScreen id={id}/>
  )
}

export default card