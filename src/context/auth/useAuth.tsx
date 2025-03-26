import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType } from './authContextType';
import { VnLocalizedStrings } from "@/src/utils/localizedStrings/vietnam";
import { ENGLocalizedStrings } from "@/src/utils/localizedStrings/english";
import translateLanguage from '../../utils/i18n/translateLanguage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { UserModel } from '../../api/features/login/models/UserModel';
import { LoginResponseModel } from '@/src/api/features/login/models/LoginModel';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [localStrings, setLocalStrings] = useState(VnLocalizedStrings);
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [user, setUser] = useState<UserModel | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkAuthLoading, setCheckAuthLoading] = useState(true);

  const checkLanguage = async () => {
    const storedLanguage = await AsyncStorage.getItem('language');
    if (storedLanguage === "en") {
      setLanguage("en");
      setLocalStrings(ENGLocalizedStrings);
    } else {
      setLanguage("vi");
      setLocalStrings(VnLocalizedStrings);
    }
  }

  const changeLanguage = async () => {
    const lng = language === "vi" ? "en" : "vi";
    translateLanguage(lng).then(() => {
      AsyncStorage.setItem('language', lng);
      setLanguage(lng);
      setLocalStrings(lng === "vi" ? VnLocalizedStrings : ENGLocalizedStrings);
    });
  };

  const onLogin = async (user: LoginResponseModel) => {
    await AsyncStorage.setItem('user', JSON.stringify(user?.user));
    await AsyncStorage.setItem('accesstoken', user?.accessToken || '');
    setIsAuthenticated(true);
    setUser(user?.user || null);
    router.replace('/(tabs)/home');
  }

  const onUpdateProfile = async (user: UserModel) => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.setItem('user', JSON.stringify(user));
    // AsyncStorage.setItem('refreshtoken', user.refreshtoken);
    setIsAuthenticated(true);
    setUser(user);
  }

  const onLogout = async () => {
    //Xóa dữ liệu trong storage và trong biến
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('accesstoken');
    // await AsyncStorage.removeItem('refreshtoken');
    setIsAuthenticated(false);
    setUser(null);
    router.replace('/(anonymous)/login');
  }

  const isLoginUser = (userId: string) => {
    return user?.id === userId;
  }

  useEffect(() => {
    checkLanguage();
  }, [language]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        const storedAccessToken = await AsyncStorage.getItem('accesstoken');

        if (storedUser && storedAccessToken) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCheckAuthLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{
      onLogin,
      onLogout,
      localStrings,
      changeLanguage,
      language,
      setLanguage,
      isAuthenticated,
      user,
      onUpdateProfile,
      isLoginUser,
      checkAuthLoading
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
