import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

type IconName = keyof typeof Ionicons.glyphMap;

function getIconName(routeName: string, focused: boolean): IconName {
  if (routeName === 'index') {
    return focused ? 'compass' : 'compass-outline';
  }

  if (routeName === 'mapa') {
    return focused ? 'map' : 'map-outline';
  }

  if (routeName === 'interesses') {
    return focused ? 'heart' : 'heart-outline';
  }

  if (routeName === 'meus-eventos') {
    return focused ? 'calendar' : 'calendar-outline';
  }

  return 'ellipse-outline';
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FACC15',
        tabBarInactiveTintColor: '#CBD5E1',
        tabBarStyle: {
          backgroundColor: '#0F172A',
          borderTopColor: '#1E293B',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={getIconName(route.name, focused)} size={size} color={color} />
        ),
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explorar',
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
        }}
      />
      <Tabs.Screen
        name="interesses"
        options={{
          title: 'Interesses',
        }}
      />
      <Tabs.Screen
        name="meus-eventos"
        options={{
          title: 'Meus Eventos',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
