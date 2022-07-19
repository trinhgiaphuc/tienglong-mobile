import 'react-native-gesture-handler';
import 'expo-dev-client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';

import { Text, View } from 'react-native';
import Navigation from './src/navigation';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <View className="h-full w-full">
            <Navigation />
            <StatusBar />
          </View>
        </NavigationContainer>
      </GestureHandlerRootView >
    </Provider >
  );
}
