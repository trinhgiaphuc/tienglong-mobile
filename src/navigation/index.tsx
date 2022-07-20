import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import LoginScreen from '../screens/login';
import HomeTabs, { TabBarIcon } from './BottomNavigation';
import { useAuth } from '../firebase/hooks';
import { RootStackParamList } from '../typings';

import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slice/authSlice';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import WordListScreen from '../screens/word-list';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation(props) {
  useAuth();
  const navigation = useNavigation()

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={() => ({
          title: "",
          headerLeft: () => (
            <Pressable className="py-2 px-3" onPress={navigation.goBack}>
              <FontAwesome size={20} name="arrow-left" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false, }} />
      <Stack.Screen name="WordList" component={WordListScreen} options={({ route, navigation }) => (
        {
          title: route.params ? route.params.title : 'Từ Điển',
          headerLeft: () => (
            <Pressable className="py-2 px-3" onPress={navigation.goBack}>
              <FontAwesome size={20} name="arrow-left" />
            </Pressable>
          ),
        })
      } />
    </Stack.Navigator>
  );
}

