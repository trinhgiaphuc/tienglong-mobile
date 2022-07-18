import * as React from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function SearchBar() {
  const [suggestions, setSuggestions] = React.useState([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const param = new URLSearchParams({ q: query });
    let timer;
    if (query.length > 2) {
      timer = setTimeout(async () => {
        try {
          const res = await fetch(`https://tienglong.vercel.app/api/redis/search-word?${param}`);
          const words = await res.json();
          console.warn(words);
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
      <TextInput className="p-2 flex-grow text-lg" placeholder="Tìm từ" onChangeText={(text) => setQuery(text)} />
      <Pressable
        className="border border-teal-500 bg-teal-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none active:bg-teal-600 active:scale-90 outline-none"
      >
        <Text className="bg-transparent">Tìm</Text>
      </Pressable>
      {suggestions.length > 0 ?
        <FlatList className="absolute flex gap-2 top-full left-0 bg-white w-full z-50 pb-2 rounded-lg border border-black" data={suggestions} keyExtractor={item => Math.random()} renderItem={item => <SearchBarResult word={item} />} />
        : null
      }
    </View >
  );
}


function SearchBarResult({ item }) {
  console.warn(item);
  return <View className="flex flex-col justify-between border-2 border-black p-2 bg-white items-center gap-1 rounded-lg z-50">
    <View className="w-full flex flex-row items-center justify-between">
      <Text className="text-xs">Word Name</Text>
      <Text className="text-xs">dabouse</Text>
    </View>
    <Text className="text-base font-medium" className="h-10 font-mono whitespace-nowrap text-ellipsis">Tom liked one of your comments Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</Text>
  </View>
}
