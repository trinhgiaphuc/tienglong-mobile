import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View } from 'react-native';
import HomeScreen from '../screens/home';
import AddWordScreen from '../screens/add-word';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileScreen from '../screens/profile';

const BottomTab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen name="Home"
          component={HomeScreen}
          options={
            {
              headerShown: false,
              tabBarIcon: (props) => <TabBarIcon {...props} name="home" />,
              title: 'Nhà'
            }
          } />

        <BottomTab.Screen name="Add"
          component={AddWordScreen}
          options={
            {
              headerShown: true,
              tabBarIcon: (props) => <TabBarIcon {...props} name="plus" />,
              title: 'Thêm',
            }
          }
        />

        <BottomTab.Screen name="Profile"
          component={ProfileScreen}
          options={
            {
              headerShown: true,
              tabBarIcon: (props) => <TabBarIcon {...props} name="user" />,
              title: 'Thêm',
            }
          }
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

function TabBarIcon({ focused, color, size, name }: {
  focused: boolean;
  color: string;
  size: number;
  name: string;
}) {
  return <FontAwesome size={24} color={color} name={name} />
}
