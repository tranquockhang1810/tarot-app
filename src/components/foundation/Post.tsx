import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { PostResponseModel } from '@/src/api/features/post/models/PostResponseModel';
import useColor from '@/src/hooks/useColor';
import { Image } from 'expo-image';
import dayjs from 'dayjs';
import Carousel from 'react-native-reanimated-carousel';

const Post = ({ item }: { item: PostResponseModel }) => {
  const { brandPrimary } = useColor();
  const width = Dimensions.get('window').width;
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={{ marginBottom: 20, borderRadius: 10, overflow: 'hidden' }}>
      {/* Header bài viết */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          backgroundColor: brandPrimary,
        }}
      >
        <Image
          source={require('@/assets/images/icon.png')}
          style={{
            width: 40,
            height: 40,
            borderRadius: 60,
            marginRight: 10,
          }}
          contentFit="fill"
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
            Tarot App Admin
          </Text>
          <Text style={{ fontSize: 12, color: 'white', opacity: 0.6 }}>
            {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
      </View>

      {/* Content bài viết */}
      <View style={{ backgroundColor: brandPrimary, padding: 12 }}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 22,
            color: 'white',
          }}
          numberOfLines={expanded ? undefined : 5}
        >
          {item.content}
        </Text>

        {item?.content && item?.content.length > 200 && (
          <TouchableOpacity onPress={toggleExpanded}>
            <Text style={{ color: 'white', marginTop: 8, fontWeight: 'bold' }}>
              {expanded ? 'Thu gọn' : 'Xem thêm'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Ảnh bài viết */}
      {item.images && item.images.length > 0 && (
        <View>
          {item.images.length === 1 ? (
            <View
              style={{
                width: width * 0.9,
                height: width * 0.9,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: item.images[0] }}
                style={{
                  width: "100%",
                  aspectRatio: 1,
                }}
                contentFit="cover"
              />
            </View>
          ) : (
            // Nhiều hình -> dùng carousel
            <>
              <Carousel
                loop
                width={width * 0.9}
                height={width * 0.9}
                autoPlay={false}
                data={item.images}
                scrollAnimationDuration={500}
                onSnapToItem={(index) => setActiveIndex(index)}
                renderItem={({ item: imageUrl }) => (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={{ uri: imageUrl }}
                      style={{
                        width: "100%",
                        aspectRatio: 1,
                      }}
                      contentFit="cover"
                    />
                  </View>
                )}
              />

              {/* Dots indicator */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
                {item.images.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: index === activeIndex ? 'white' : 'rgba(255,255,255,0.4)',
                      marginHorizontal: 4,
                    }}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default Post;
