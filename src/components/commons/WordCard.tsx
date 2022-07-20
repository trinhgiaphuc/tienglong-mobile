import React from 'react';
import { Text, View } from 'react-native';

export default function WordCard({ item }: { item: unknown }) {
  return <View className="flex flex-col max-h-[200px] min-h-[200px] border-2 my-auto border-black bg-zinc-200 rounded-lg p-4 my-2">
    <View className="flex flex-col items-start justify-between mt-4 flex-grow">
      <Text className="text-xl font-semibold overflow-hidden">{item.word}</Text>
      <Text className="text-base overflow-hidden">{item.definition}</Text>
      <Text className="text-base underline ml-auto overflow-hidden">{item.author}</Text>
    </View>
  </View>
}
