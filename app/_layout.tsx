import { Stack } from 'expo-router';

// _layout.tsx define como as telas se empilham.
// No Expo Router, este arquivo substitui o NavigationContainer + createNativeStackNavigator.
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1A1A2E' },
        headerTintColor: '#FF6B35',
        headerTitleStyle: { fontWeight: 'bold', color: '#F0EAD6' },
        contentStyle: { backgroundColor: '#13131F' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Eventos & Festivais' }}
      />
      <Stack.Screen
        name="detalhes/[id]"
        options={{ title: 'Detalhes do Evento' }}
      />
    </Stack>
  );
}