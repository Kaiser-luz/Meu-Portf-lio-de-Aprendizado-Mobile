import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { api } from '../../services/api';
import { Evento } from '../../types';

export default function EventDetails() {
    const { id } = useLocalSearchParams();
    const [event, setEvent] = useState<Evento | null>(null);

    useEffect(() => {
        if (typeof id === 'string') api.getEventDetails(id).then(setEvent);
    }, [id]);

    if (!event) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

    const imageUrl = event.images?.[0]?.url || 'https://via.placeholder.com/400';
    const venue = event._embedded?.venues?.[0]?.name || 'Local a confirmar';

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title}>{event.name}</Text>
                <Text style={styles.info}>📅 Data: {event.dates?.start?.localDate}</Text>
                <Text style={styles.info}>📍 Local: {venue}</Text>
                <Text style={styles.desc}>{event.description || 'Nenhuma descrição fornecida pelo organizador.'}</Text>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Marcar como Interesse (Favoritar)"
                        color="#FF5722"
                        onPress={async () => {
                            try {
                                await api.toggleFavorite(event);
                                alert('Status de interesse atualizado com sucesso!');
                            } catch (error: any) {
                                alert(error.message); // Vai mostrar "Você precisa fazer login..."
                            }
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    image: { width: '100%', height: 250 },
    content: { padding: 20 },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
    info: { fontSize: 16, color: '#444', marginBottom: 5 },
    desc: { fontSize: 16, color: '#666', marginTop: 15, lineHeight: 24 }
});