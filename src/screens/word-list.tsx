import * as React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, ScrollView, Text, View } from 'react-native';
import WordDetails from '../components/commons/WordDetails';

import { getUserWord } from '../firebase/api';
import { useWord } from '../hooks/useWord';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectWord } from '../redux/slice/wordSlice';
import { RootStackParamList, Word } from '../typings';

type Props = NativeStackScreenProps<RootStackParamList, 'WordList'>;

export default function WordListScreen({ navigation, route }: Props) {
  const { params: { uid, wordName, id } } = route;

  const { todayWords, trendingWords } = useAppSelector(selectWord);

  const [words, setWords] = React.useState<Word[]>(() => {
    if (id === 'today-words') {
      return todayWords;
    } else if (id === 'trending-words') {
      return trendingWords;
    } else {
      return [];
    }
  });

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (typeof uid !== 'undefined') {
      getUserWord(uid).then(setWords).catch(console.error);
    } else if (typeof wordName !== 'undefined') {
      // TODO:
    }
  }, []);


  return (
    <FlatList
      data={words}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <WordDetails word={item} />}
      ListEmptyComponent={EmptyList}
    />
  );
}

function EmptyList() {
  return <View className="w-full h-screen flex items-center justify-center">
    <Text className="text-center uppercase text-2xl">Đang Tải</Text>
  </View>
}
