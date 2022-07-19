import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slice/authSlice';
import { HomeTabParamList } from '../typings';

type Props = NativeStackScreenProps<HomeTabParamList, 'Profile'>

export default function ProfileScreen({ navigation }: Props) {
  const { status, userDetails } = useAppSelector(selectAuth);

  if (status !== 'authenticated') {
    navigation.navigate('Dictionary');
    return null;
  }

  return (
    <View className="bg-gray-200 h-screen w-full flex flex-row justify-center items-center">
      <View className="rounded h-3/4 mt-20 w-full mx-auto bg-white ">
        <Image className="w-36 h-36 mx-auto rounded-full -mt-20 border-8" source={{ uri: userDetails.image }} alt="" />
        <Text className="text-center mt-2 text-3xl font-medium">{userDetails.username}</Text>
        <View className="flex flex-row p-4">
          <View className="w-1/2 mr-1 p-2 text-center border-2 rounded">
            <Text className="font-bold shadow-xl">1.8k hearts</Text>
          </View>
          <View className="w-1/2 ml-1 p-2 text-center border-2 rounded">
            <Text className="font-bold">2.0k words</Text>
          </View>
        </View>
        <View className="p-4 font-light text-sm">
          <Text className="text-center">
            Front end Developer, avid reader. Love to take a long walk, swim
          </Text>
        </View>
      </View>
    </View>
  );
}

