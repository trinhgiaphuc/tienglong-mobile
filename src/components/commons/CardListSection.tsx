import React from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import WordCard from './WordCard';

type PropsType = {
  title: string;
  words: [];
  color: string;
}

export default function CardListSection({ title, words, color }: PropsType) {
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
      <Text className="underline uppercase text-base ml-auto">
        Xem thêm
      </Text>
    </View>
  );
}

