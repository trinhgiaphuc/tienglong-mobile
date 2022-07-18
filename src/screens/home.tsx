import * as React from 'react';
import { Text, TextInput, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import CardListSection from '../components/commons/CardListSection';
import SearchBar from '../components/sections/SearchBar';

const SEED = [
  {
    word: 'Word 1',
    definition: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    author: 'James Gunn',
  },
  {
    word: 'Word 2',
    definition: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    author: 'James Gatling',
  },
  {
    word: 'Word 3',
    definition: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    author: 'James Lem',
  },
];

export default function HomeScreen() {
  // const [trendingWords, setTrendingWords] = React.useState([]);

  // React.useEffect(() => {
  //   fetch('https://tienglong.vercel.app/api/word/trending-words')
  //     .then(async (res) => await res.json())
  //     .then(({ trendingWords }) => setTrendingWords(trendingWords))
  //     .catch(() => []);
  // }, []);


  return (
    <SafeAreaView>
      <SearchBar />
      <ScrollView className="mb-16 pb-10 -z-10">
        <CardListSection color="bg-yellow-300" title="Từ Của Hôm Nay" words={SEED} />
        <View className="w-3/4 mx-auto h-[2px] bg-black mt-8 mb-6" />
        <CardListSection color="bg-blue-300" title="Từ Đang Thịnh Hành" words={SEED} />
      </ScrollView>
    </SafeAreaView>
  );
}


