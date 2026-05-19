import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#1A1A2E' },
        headerTintColor: '#FF6B35',
        headerTitleStyle: { fontWeight: 'bold', color: '#F0EAD6' },
        tabBarStyle: { backgroundColor: '#1A1A2E', borderTopColor: '#2E2E3E' },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#555',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="interesses"
        options={{
          title: 'Interesses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meus-eventos"
        options={{
          title: 'Meus Eventos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      {/* Esconde a tela de detalhes das tabs */}
      <Tabs.Screen
        name="detalhes/[id]"
        options={{ href: null }}
      />
    </Tabs>
  );
}