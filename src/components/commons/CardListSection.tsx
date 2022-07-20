import * as React from 'react';

import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import type { RootStackParamList } from '../../typings';

import Carousel from 'react-native-reanimated-carousel';
import WordCard from './WordCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type PropsType = {
  id: RootStackParamList['WordList']['type'];
  words: [];
  color: string;
}

export default function CardListSection({ id, words, color }: PropsType) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "Home", undefined>>();

  const title = id === 'today-words' ? 'Từ Của Hôm Nay' : 'Từ Đang Thịnh Hành';

  return (
    <View className={`border-2 border-black mt-2 rounded-lg p-4 mx-2 ${color}`}>
      <Text className="text-xl uppercase">
        {title}
      </Text>
      <Carousel
        className="mx-auto"
        width={300}
        height={220}
        data={words}
        renderItem={({ item }) => <WordCard item={item} />}
      />
      <Pressable onPress={() => {
        navigation.navigate('WordList', { title, id });
      }}>
        <Text className="underline uppercase text-base ml-auto">
          Xem thêm
        </Text>
      </Pressable>
    </View>
  );
}

