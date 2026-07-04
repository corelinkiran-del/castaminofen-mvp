// Main App component for React Native

import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  useEffect(() => {
    // Initialize app (restore auth state, etc)
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
