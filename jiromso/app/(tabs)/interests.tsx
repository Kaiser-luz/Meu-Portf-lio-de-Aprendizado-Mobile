import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { api } from '../../services/api';
import EventCard from '../../components/EventCard';
import { Evento } from '../../types';

export default function InterestsScreen() {
    const [favs, setFavs] = useState<Evento[]>([]);
    const [logged, setLogged] = useState(false);

    useFocusEffect(useCallback(() => {
        (async () => {
            const user = await api.getUser();
            setLogged(!!user);
            if (user) setFavs(await api.getFavorites());
        })();
    }, []));

    if (!logged) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ fontSize: 18, marginBottom: 15, textAlign: 'center' }}>Você precisa fazer login para ver seus interesses.</Text>
                <Button title="Ir para o Perfil" onPress={() => router.push('/profile')} color="#FF5722" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 20, paddingTop: 50 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Meus Interesses</Text>
            {favs.length === 0 ? (
                <Text>Nenhum evento salvo ainda.</Text>
            ) : (
                <FlatList data={favs} keyExtractor={i => i.id} renderItem={({ item }) => <EventCard event={item} />} />
            )}
        </View>
    );
}