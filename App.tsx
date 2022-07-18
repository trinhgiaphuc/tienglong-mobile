import 'react-native-gesture-handler';
import 'expo-dev-client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { Text, View } from 'react-native';
import Navigation from './src/components/navigation';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <SafeAreaView className="h-full">
          <Navigation />
          <StatusBar />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}
