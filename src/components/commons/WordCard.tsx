import React from 'react';
import { Text, View } from 'react-native';

export default function WordCard({ item }: { item: unknown }) {
  return <View className="flex flex-col border-2 border-black bg-zinc-200 rounded-lg p-4 my-2">
    <View className="flex flex-col items-start mt-4">
      <Text className="text-xl font-semibold">{item.word}</Text>
      <Text className="text-base">{item.definition}</Text>
      <Text className="text-base underline ml-auto">{item.author}</Text>
    </View>
  </View>
}
