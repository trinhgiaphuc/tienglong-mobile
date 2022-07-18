import 'react-native-gesture-handler';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Navigation from './src/navigation/BottomNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    <GestureHandlerRootView>
      <View className="bg-green-400 h-full">
        <Navigation />
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}
