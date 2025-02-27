import React, {  } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/src/context/auth/useAuth';
import useColor from '@/src/hooks/useColor';

const App: React.FC = () => {
  const { isAuthenticated, checkAuthLoading } = useAuth();
  const { brandPrimary } = useColor();

  if (checkAuthLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000",
      }}>
        <ActivityIndicator size="large" color={brandPrimary} />
      </View>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Redirect href={'/(tabs)/home'} />
      ) : (
        <Redirect href={'/(anonymous)/login'} />
      )}
    </>
  );
};

export default App;
