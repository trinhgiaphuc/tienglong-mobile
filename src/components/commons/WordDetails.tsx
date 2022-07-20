import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { addHeart, checkHearted, removeHeart } from '../../firebase/api';
import { Word } from '../../typings';
import ShareAndReport from '../sections/ShareAndReport';

export default function WordDetails({ word }: { word: Word }) {
  const [isHearted, setIsHearted] = React.useState(false);
  const [hearts, setHearts] = React.useState(word.heartCount);
  const [ready, setReady] = React.useState(true);

  React.useEffect(() => {
    checkHearted(word.id).then(setIsHearted);
  }, []);

  function handleHeart() {
    if (ready) {
      setReady(false);
      if (isHearted) {
        addHeart(word.id, word.authorId).then(setReady);
      } else {
        removeHeart(word.id, word.authorId).then(setReady);
      }
    }
    setIsHearted(p => !p);
    setHearts(p => isHearted ? p - 1 : p + 1);
  }

  return (
    <View className="w-full py-8 px-1">
      <View
        className="relative flex flex-col items-center w-5/6 mx-auto p-2 pb-6 bg-slate-50 border-slate-900 border-2 rounded-3xl">

        <Pressable className={`border-2 border-slate-900 absolute -top-5 -left-5 py-2 px-4 ${isHearted ? 'bg-red-400' : 'bg-slate-50'} rounded-3xl active:scale-105`} onPress={handleHeart}>
          <Text className="text-base text-center">
            {hearts} ❤
          </Text>
        </Pressable>

        <Text className="w-full mx-auto p-2 text-2xl font-bold mt-4">
          {word.word}
        </Text>

        <Text className="block w-full mx-auto p-2 tracking-tighter text-lg">
          {word.definition}
        </Text>

        <Text className="block w-full mx-auto p-2 text-lg">
          {word.example}
        </Text>

        <Text className="absolute -bottom-6 right-0 py-2 px-4 text-lg bg-slate-300 border-2 border-slate-900  rounded-full">
          {word.author}
        </Text>

        <ShareAndReport wordId={word.id} />
      </View>
    </View>);
}

