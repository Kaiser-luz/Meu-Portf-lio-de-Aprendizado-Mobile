import { Stack } from 'expo-router';

import { AuthProvider } from '@/context/AuthContext';
import { EventosProvider } from '@/context/EventosContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <EventosProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </EventosProvider>
    </AuthProvider>
  );
}
