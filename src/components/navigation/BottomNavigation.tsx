import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home';
import AddWordScreen from '../screens/add-word';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileScreen from '../screens/profile';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
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
          options={
            {
              headerShown: true,
              tabBarIcon: (props) => <TabBarIcon {...props} name="plus" />,
              title: 'Định Nghĩa',
            }
          }
        />

        <Tab.Screen name="Profile"
          component={ProfileScreen}
          options={
            {
              headerShown: true,
              tabBarIcon: (props) => <TabBarIcon {...props} name="user" />,
              title: 'Cá Nhân',
            }
          }
        />
      </Tab.Navigator>
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
