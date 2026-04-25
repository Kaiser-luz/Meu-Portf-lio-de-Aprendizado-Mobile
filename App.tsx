import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetalhesEvento from './screens/DetalhesEvento';
import ListaEventos from './screens/ListaEventos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaItens">
        <Stack.Screen 
          name="ListaItens" 
          component={ListaEventos} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="DetalhesItem" 
          component={DetalhesEvento} 
          options={{ title: 'Detalhes do Festival' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}