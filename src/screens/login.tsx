import * as React from 'react';

import { signInUser } from '../firebase/api';

import { Text, View, TextInput, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as yup from 'yup';

import { useForm, Controller } from 'react-hook-form';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../typings';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slice/authSlice';

type LoginFormType = {
  email: string;
  password: string;
}
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;


let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});


export default function LoginScreen({ navigation }: Props) {
  const { status } = useAppSelector(selectAuth);

  const [submitted, setSubmitted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [formError, setFormError] = React.useState(false);

  React.useEffect(() => {
    if (status === 'authenticated') {
      navigation.navigate('Home');
    }
  }, []);

  async function checkFormValid(data: LoginFormType) {
    const isValid = await schema.isValid({ email: data.email, password: data.password });
    return isValid;
  }

  const { handleSubmit, control } = useForm();

  async function onSubmit(data: LoginFormType) {
    const valid = await checkFormValid(data);
    if (!valid) {
      return;
    } else {
      console.warn('HOLA');
      setSubmitted(true);
      try {
        await signInUser(data)
        navigation.navigate('Home');
      } catch (error) {
        setSubmitted(false);
        console.error(error);
        onError();
      }

    }
  };

  async function onError() {
    setFormError(true);
  }

  return (
    <KeyboardAvoidingView className="min-h-screen flex justify-center items-center">
      <ScrollView className="p-12 mt-10 bg-gray-100 rounded-2xl w-full">
        <View>
          <Text className="text-2xl font-bold uppercase text-center mb-4 cursor-pointer">Đăng Nhập</Text>
          <Text className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Chào mừng bạn đến với tiếng lòng, nơi chia sẽ những tiếng lóng!</Text>
        </View>

        {formError ? <Text className="p-2 text-center text-sm text-black bg-red-400 mb-4 rounded-lg">Xin kiểm tra lại tài khoản hoặc mật khẩu</Text> : null}

        <Controller
          control={control}
          name="email"
          rules={{ require: true, minLength: 6 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput type="text"
              placeholder="email"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-2"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              onFocus={() => setFormError(false)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ require: true, minLength: 6 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="block text-sm rounded-lg w-full border outline-none mt-2 flex flex-row items-center">
              <TextInput
                placeholder="mật khẩu"
                secureTextEntry={!showPassword}
                className="flex-grow p-3"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                onFocus={() => setFormError(false)}
                value={value}
              />
              <Pressable className="border-l-2 p-3" onPress={() => setShowPassword(s => !s)}>
                <FontAwesome name={showPassword ? "eye-slash" : "eye"} size={16} />
              </Pressable>
            </View>
          )}
        />

        <View className="text-center mt-6">
          <Pressable disabled={submitted} onPress={handleSubmit(onSubmit, onError)} className="bg-pink-500 active:bg-pink-600 rounded-lg px-2 py-4">
            <Text className="text-center">
              Đăng Nhập
            </Text>
          </Pressable>
          <Text className="mt-10 text-sm">Trong trường hợp bạn muốn <Text className="underline cursor-pointer text-yellow-600">Đăng Ký</Text>.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

