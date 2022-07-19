import * as React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeTabParamList } from '../typings';

import { Controller, FieldValues, useForm, UseFormReset } from 'react-hook-form';

import type { WordFormData } from '../firebase/utils';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slice/authSlice';
import { submitDefinition } from '../firebase/api';

type Props = NativeStackScreenProps<HomeTabParamList, 'Add'>


type SuccessModalPropsType = {
  navigation: NativeStackNavigationProp<HomeTabParamList, "Add", undefined>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  reset: UseFormReset<FieldValues>;
}

function SuccessModal({ showModal, setShowModal, navigation, reset }: SuccessModalPropsType) {
  return (
    <Modal isVisible={showModal}>
      <View className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
        <Text className="mt-8 pt-4 text-center text-4xl font-bold text-gray-700">Thành Công</Text>
        <Text className="my-4 text-center text-base text-gray-700">Woah, bạn vừa định nghĩa một từ mới!</Text>
        <View className="space-x-4 mx-auto py-4 text-center flex flex-row">
          <Pressable onPress={() => {
            setShowModal(false);
            navigation.navigate('Dictionary')
          }} className="inline-block rounded-md bg-red-500 p-4 mr-2">
            <Text>
              Trang Chủ
            </Text>
          </Pressable>
          <Pressable onPress={() => {
            setShowModal(false);
            reset();
          }} className="inline-block rounded-md bg-green-500 p-4 ml-2 font-semibold text-green-100">
            <Text>
              Thêm Định Nghĩa
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default function AddWordScreen({ navigation }: Props) {
  const { userDetails } = useAppSelector(selectAuth);

  const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const [showModal, setShowModal] = React.useState(false);

  async function onSubmit(value: { word: string, definition: string, example: string, tags: string }) {
    //TODO: FIX LATER REPLACE ALL
    let tags: string[];
    if (value.tags && value.tags.length > 0) {
      tags = value.tags.toString().trim().replace(/ /, '').split('#').filter(Boolean);
    } else {
      tags = [];
    }
    tags.push(new Date().getFullYear().toString());

    const data: WordFormData = { ...value, tags, author: userDetails!.username };
    await submitDefinition(data);
    setShowModal(true);
  }


  return (
    <ScrollView className="bg-zinc-200 w-full h-full rounded px-4 py-10">
      {showModal ? <SuccessModal reset={reset} navigation={navigation} showModal={showModal} setShowModal={setShowModal} /> : null}
      <View className="h-1 bg-black rounded my-4" />
      <Text className="text-4xl font-bold text-center p-2">Định Nghĩa</Text>
      <View>
        <View className="items-center mt-8">
          <View className="w-full md:w-1/2 flex flex-col">
            <Text className="font-semibold leading-none">Từ ngữ</Text>
            <Controller
              control={control}
              name="word"
              rules={{ required: true, minLength: 1 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  type="text"
                  placeholder="ASAP"
                  className="leading-none p-3 focus:outline-none mt-4 border-0 bg-gray-100 rounded"
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.word?.type === 'required' ? <ErrorMessage error="xin đừng bỏ trống ô từ ngữ" /> : null}
          </View>
          <View className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
            <Text className="font-semibold leading-none">Định nghĩa</Text>
            <Controller
              control={control}
              name="definition"
              rules={{ required: true, minLength: 20, maxLength: 3000 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="mong bạn cho một định nghĩa thật chi tiết"
                  textAlignVertical="top"
                  multiline={true}
                  numberOfLines={4}
                  type="text"
                  className="text-base p-3 mt-4 bg-gray-100 rounded"
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.definition?.type === 'required' ? <ErrorMessage error="xin đừng bỏ trống ô định nghĩa" /> : null}
            {errors.definition?.type === 'minLength' ? <ErrorMessage error="xin hãy định nghĩa dài thêm một chút" /> : null}
            {errors.definition?.type === 'maxLength' ? <ErrorMessage error="xin đừng định nghĩa quá dài" /> : null}
          </View>
          <View className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
            <Text className="font-semibold leading-none">Ví Dụ</Text>
            <Controller
              control={control}
              name="example"
              rules={{ required: true, minLength: 6 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="mong bạn cho một ví dụ thật chi tiết"
                  textAlignVertical="top"
                  multiline={true}
                  numberOfLines={4}
                  type="text"
                  className="text-base p-3 mt-4 bg-gray-100 rounded"
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.example?.type === 'required' ? <ErrorMessage error="xin đừng bỏ trống ô ví dụ" /> : null}
            {errors.example?.type === 'minLength' ? <ErrorMessage error="xin hãy cho ví dụ dài thêm một chút" /> : null}
            {errors.example?.type === 'maxLength' ? <ErrorMessage error="xin đừng cho ví dụ quá dài" /> : null}
          </View>
        </View>
        <View className="w-full flex flex-col mt-8">
          <Text className="font-semibold leading-none">Thẻ</Text>

          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                type="text"
                placeholder="#ASAP#ROCKY#XEGA"
                className="leading-none p-3 mt-4 border-0 bg-gray-100 rounded"
                onChangeText={value => onChange(value.replace(' ', ''))}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

        </View>
        <View className="flex items-center justify-center w-full">
          <Pressable onPress={handleSubmit(onSubmit)} className="mt-10 mb-4 w-3/4 py-4 bg-blue-400 rounded active:bg-blue-600">
            <Text className="text-center text-base">
              Thêm Định Nghĩa
            </Text>
          </Pressable>
          <View className="h-1 w-full my-4 bg-black rounded mb-20" />
        </View>
      </View>
    </ScrollView>
  );
}


function ErrorMessage({ error }: { error: string }) {
  return <View className="bg-red-300 mt-2 border rounded p-2">
    <Text className="text-center">
      {error}
    </Text>
  </View>
}
