// Main App component for React Native

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import theme from './src/design/theme';

export default function App() {
  useEffect(() => {
    // Initialize app (restore auth state, etc)
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="#0b0b0d" />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
