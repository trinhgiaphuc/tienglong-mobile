import * as React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import HomeTabs from './BottomNavigation';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator defaultScreenOptions="Login">
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false, }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

