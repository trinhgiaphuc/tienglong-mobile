import * as React from 'react';

import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardListSection from '../components/commons/CardListSection';
import SearchBar from '../components/sections/SearchBar';


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../typings';
import { useWord } from '../hooks/useWord';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { todayWords, trendingWords } = useWord();

  return (
    <SafeAreaView>
      <SearchBar />
      <ScrollView className="mb-16 pb-10 -z-10">
        <CardListSection color="bg-yellow-300" id="today-words" words={todayWords} />
        <View className="w-3/4 mx-auto h-[2px] bg-black mt-8 mb-6" />
        <CardListSection color="bg-blue-300" id="trending-words" words={trendingWords} />
      </ScrollView>
    </SafeAreaView>
  );
}


