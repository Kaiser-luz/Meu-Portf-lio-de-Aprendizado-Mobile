import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaItens from './screens/ListaItens';
import DetalhesItem from './screens/DetalhesItem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaItens">
        <Stack.Screen name="ListaItens" component={ListaItens} options={{ title: 'Eventos' }} />
        <Stack.Screen name="DetalhesItem" component={DetalhesItem} options={{ title: 'Detalhes do Evento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
