import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home';
import AddWordScreen from '../screens/add-word';
import ProfileScreen from '../screens/profile';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { HomeTabParamList, RootStackParamList } from '../typings';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../redux/slice/authSlice';
import { Pressable } from 'react-native';
import { signOutUser } from '../firebase/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import { EventArg } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Tab = createBottomTabNavigator<HomeTabParamList>();

export default function HomeTabs({ navigation }: Props) {
  const { status } = useAppSelector(selectAuth);

  function protectScreen(screenName: keyof HomeTabParamList) {
    return (e: EventArg<"tabPress", true, undefined>) => {
      e.preventDefault();
      if (status === 'unauthenticated') {
        navigation.navigate('Login');
      } else {
        navigation.navigate(screenName);
      }
    }
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Dictionary"
        component={HomeScreen}
        options={
          {
            headerShown: false,
            tabBarIcon: (props) => <TabBarIcon {...props} name="home" />,
            title: 'Nhà'
          }
        } />

      <Tab.Screen name="Add"
        component={AddWordScreen}
        listeners={{ tabPress: protectScreen('Add') }}
        options={
          {
            headerShown: false,
            tabBarIcon: (props) => <TabBarIcon {...props} name="plus" />,
            title: 'Định Nghĩa',
          }
        }
      />

      <Tab.Screen name="Profile"
        component={ProfileScreen}
        listeners={{ tabPress: protectScreen('Profile') }}
        options={
          {
            headerShown: true,
            headerRight: () => <Pressable className="p-2" onPress={signOutUser}><FontAwesome size={24} name="sign-out" /></Pressable>,
            tabBarIcon: (props) => <TabBarIcon {...props} name="user" />,
            title: 'Cá Nhân',
          }
        }
      />
    </Tab.Navigator>
  );
}

export function TabBarIcon({ focused, color, size, name }: {
  focused: boolean;
  color: string;
  size: number;
  name: string;
}) {
  return <FontAwesome size={24} color={color} name={name} />
}
