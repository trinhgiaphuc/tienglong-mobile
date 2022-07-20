import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import WordDetails from '../components/commons/WordDetails';
import { getUserWord } from '../firebase/api';
import { RootStackParamList, Word } from '../typings';

type Props = NativeStackScreenProps<RootStackParamList, 'WordList'>;

export default function WordListScreen({ navigation, route }: Props) {
  const { params: { uid, wordName } } = route;
  const [words, setWords] = React.useState<Word[]>([]);


  React.useEffect(() => {
    if (typeof uid !== 'undefined') {
      getUserWord(uid).then(setWords).catch(console.error);
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
  return <View className="w-full h-screen bg-green-400 flex items-center justify-center">
    <Text className="text-center uppercase text-2xl">Người Dùng Chưa Định Nghĩa Từ Nào</Text>
  </View>
}
