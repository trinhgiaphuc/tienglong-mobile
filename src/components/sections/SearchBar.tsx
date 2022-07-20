import * as React from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SearchBarWord } from '../../typings';

export default function SearchBar() {
  const [suggestions, setSuggestions] = React.useState<Array<SearchBarWord>>([]);
  const [query, setQuery] = React.useState('');
  const [out, setOut] = React.useState(true);

  React.useEffect(() => {
    const param = new URLSearchParams({ q: query });
    let timer: NodeJS.Timeout;
    if (query.length > 2) {
      timer = setTimeout(async () => {
        try {
          const res = await fetch(`https://tienglong.vercel.app/api/redis/search-word?${param}`);
          const words = await res.json();
          setSuggestions(words);
        } catch (error) {
          console.error(error);
        }
      }, 300);
    }

    return () => clearTimeout(timer || 0);
  }, [query]);

  return (
    <View className="flex flex-row items-center justify-center border-b-2 border-black px-2 bg-transparent relative">
      <Text className="text-lg">🔍</Text>
      <TextInput
        onBlur={() => {
          setOut(true)
          setSuggestions([]);
        }}
        onFocus={() => setOut(false)}
        className="p-2 flex-grow text-lg"
        placeholder="Tìm từ"
        onChangeText={(text) => setQuery(text)}
      />
      <Pressable
        className="border border-teal-500 bg-teal-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none active:bg-teal-600 active:scale-90 outline-none"
      >
        <Text className="bg-transparent">Tìm</Text>
      </Pressable>
      {out ? null :
        <FlatList className="absolute flex gap-2 top-full left-0 bg-white w-full z-50 bg-green-300 rounded-lg" data={suggestions} keyExtractor={item => item.wordId} renderItem={({ item }) => <SearchBarResult word={item} />} />}
    </View >
  );
}

function SearchBarResult({ word }: { word: SearchBarWord }) {
  return <View className="flex flex-col justify-between p-2 bg-transparent items-center gap-1 rounded-lg z-50">
    <View className="w-full flex flex-row items-center justify-between">
      <Text className="text-xs font-bold">{word.word}</Text>
      <Text className="text-xs font-bold">{word.author}</Text>
    </View>
    <Text className="text-xs whitespace-nowrap w-full h-4 text-ellipsis">{word.content} Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</Text>
  </View>
}
