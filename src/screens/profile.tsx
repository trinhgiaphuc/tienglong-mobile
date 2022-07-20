import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { getWordsAndHearts } from '../firebase/api';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectAuth, update } from '../redux/slice/authSlice';
import { HomeTabParamList, ProfileStackParamList, RootStackParamList } from '../typings';

type Props = NativeStackScreenProps<HomeTabParamList & RootStackParamList, 'Profile'>

export default function ProfileScreen({ navigation }: Props) {
  const { status, userDetails } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (
      typeof userDetails?.words === 'undefined' ||
      typeof userDetails?.hearts === 'undefined'
    ) {
      getWordsAndHearts(userDetails?.id).then(({ words, hearts }) => {
        dispatch(update({ words, hearts }));
      });
    }
  }, []);


  if (status !== 'authenticated') {
    navigation.navigate('Dictionary');
    return null;
  }

  function goToWordList() {
    navigation.navigate('WordList', {
      title: `Từ của ${userDetails?.username}`,
      uid: userDetails?.id
    });
  }

  return (
    <View className="bg-gray-200 h-screen w-full flex flex-row justify-center items-center">
      <View className="rounded h-3/4 mt-20 w-full mx-auto bg-white ">
        <Image className="w-36 h-36 mx-auto rounded-full -mt-20 border-8" source={{ uri: userDetails.image }} alt="" />
        <Text className="text-center mt-2 text-3xl font-medium">{userDetails.username}</Text>
        <View className="flex flex-row p-4">
          <View className="w-1/2 mr-1 p-2 text-center border-2 rounded">
            <Text className="font-bold shadow-xl">{userDetails?.hearts} hearts</Text>
          </View>
          <Pressable onPress={goToWordList} className="w-1/2 ml-1 p-2 text-center border-2 rounded">
            <Text className="font-bold">{userDetails?.words} words</Text>
          </Pressable>
        </View>
        {/* <View className="p-4 font-light text-sm"> */}
        {/*   <Text className="text-center"> */}
        {/*     Front end Developer, avid reader. Love to take a long walk, swim */}
        {/*   </Text> */}
        {/* </View> */}
      </View>
    </View>
  );
}

