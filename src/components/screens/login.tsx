import * as React from 'react';
import { Text, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View className="h-screen w-screen bg-red-500 z-50">
      <Text className="text-2xl text-center">
        Let's Login
      </Text>
    </View>
  );
}

