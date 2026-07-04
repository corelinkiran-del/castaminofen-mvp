// Root navigator for React Native

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder screens
const HomeScreen = () => null;
const ExploreScreen = () => null;
const LibraryScreen = () => null;
const ProfileScreen = () => null;

export default function RootNavigator() {
  // TODO: Implement conditional navigation based on auth state
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
