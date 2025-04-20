import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/src/context/auth/useAuth';
import { Button } from '@ant-design/react-native';
import Screen from '@/src/components/layout/Screen';
import { router } from 'expo-router';
import dayjs from 'dayjs';
import { Image, ImageBackground } from 'expo-image';
import { BANNER_CARDS, BANNER_HOMEPAGE, BANNER_HOROSCOPE } from '@/src/consts/ImgPath';
import useColor from '@/src/hooks/useColor';
import Animated, { useSharedValue, withRepeat, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import HomeViewModel from '../viewModel/HomeViewModel';
import Post from '@/src/components/foundation/Post';

const HomeScreen = () => {
  const { localStrings } = useAuth();
  const { brandPrimary, brandPrimaryTap } = useColor();
  const bounceValue = useSharedValue(0);
  const { loadMore, posts } = HomeViewModel();

  useEffect(() => {
    bounceValue.value = withRepeat(
      withSequence(
        withTiming(-2, { duration: 300 }),
        withTiming(2, { duration: 300 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceValue.value }]
  }));

  return (
    <Screen>
      <View style={{ flex: 1, marginBottom: 60 }}>
        <FlatList
          ListHeaderComponent={
            <View style={{ marginBottom: 20 }}>
              {/* Banner Home */}
              <Image
                source={{ uri: BANNER_HOMEPAGE }}
                style={{
                  width: '100%',
                  aspectRatio: 3 / 2,
                  borderRadius: 10,
                  marginTop: 20,
                  borderWidth: 3,
                  borderColor: brandPrimary,
                }}
                contentFit="cover"
              />
              {/* 2 button Horoscope + Tarot */}
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 20,
                }}
              >
                <TouchableOpacity style={{ width: '48%' }}
                  onPress={() => router.push({
                    pathname: `/(routes)/horoscope/details`,
                    params: {
                      date: dayjs().format('YYYY-MM-DD')
                    }
                  })}
                >
                  <ImageBackground
                    source={{ uri: BANNER_HOROSCOPE }}
                    style={{
                      width: '100%',
                      aspectRatio: 1 / 1,
                      borderRadius: 10,
                      overflow: 'hidden',
                      borderWidth: 3,
                      borderColor: brandPrimary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      flex: 1,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Animated.View style={animatedStyle}>
                        <Text style={{
                          color: 'white',
                          fontSize: 22,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                          {localStrings.Horoscope.Today}
                        </Text>
                      </Animated.View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '48%' }} onPress={() => router.push('/(tabs)/create')}>
                  <ImageBackground
                    source={{ uri: BANNER_CARDS }}
                    style={{
                      width: '100%',
                      aspectRatio: 1 / 1,
                      borderRadius: 10,
                      overflow: 'hidden',
                      borderWidth: 3,
                      borderColor: brandPrimary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      flex: 1,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <Animated.View style={animatedStyle}>
                        <Text style={{
                          color: 'white',
                          fontSize: 22,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                          {"Tarot AI"}
                        </Text>
                      </Animated.View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white', marginTop: 20 }}>
                {localStrings.Home.HotNews.toUpperCase()}
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => item?._id || ''}
          renderItem={({ item }) => <Post item={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={loadMore}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        />
      </View>
    </Screen>
  )
}

export default HomeScreen
