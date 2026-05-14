import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { api } from '../../services/api';
import EventCard from '../../components/EventCard';
import { Evento } from '../../types';

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState<Evento[]>([]);

  useEffect(() => {
    api.getEvents(search).then(setEvents);
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jiromso 🚀</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar evento (ex: Rock)..."
        value={search} onChangeText={setSearch}
      />
      <FlatList data={events} keyExtractor={i => i.id} renderItem={({ item }) => <EventCard event={item} />} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, paddingTop: 50 }, title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15 }, input: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginBottom: 15 } });