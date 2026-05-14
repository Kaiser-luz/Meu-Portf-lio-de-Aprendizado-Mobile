import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Evento } from '../types';

export default function EventCard({ event }: { event: Evento }) {
    const imageUrl = event.images?.[0]?.url || 'https://via.placeholder.com/150';
    const venue = event._embedded?.venues?.[0]?.name || 'Local a confirmar';

    return (
        <Link href={`/event/${event.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>{event.name}</Text>
                    <Text style={styles.details}>{event.dates.start.localDate} • {venue}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 15, elevation: 2, overflow: 'hidden' },
    image: { width: '100%', height: 160 },
    info: { padding: 15 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#222' },
    details: { fontSize: 14, color: '#666', marginTop: 5 },
});