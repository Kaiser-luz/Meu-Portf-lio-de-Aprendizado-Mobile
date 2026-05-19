import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import EventoCard from '../constants/EventoCard';
import { Evento } from '../dados';

export const FAVORITOS_KEY = '@favoritos_eventos';

export default function Interesses() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<Evento[]>([]);

  // Recarrega toda vez que a aba recebe foco
  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  const carregarFavoritos = async () => {
    try {
      const dados = await AsyncStorage.getItem(FAVORITOS_KEY);
      setFavoritos(dados ? JSON.parse(dados) : []);
    } catch {
      setFavoritos([]);
    }
  };

  const removerFavorito = async (id: string) => {
    const novos = favoritos.filter((e) => e.id !== id);
    await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(novos));
    setFavoritos(novos);
  };

  if (favoritos.length === 0) {
    return (
      <View style={styles.vazio}>
        <Ionicons name="heart-outline" size={64} color="#2E2E3E" />
        <Text style={styles.vazioTitulo}>Nenhum interesse ainda</Text>
        <Text style={styles.vazioSub}>
          Explore eventos e toque no coração para salvar seus favoritos.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.count}>{favoritos.length} evento(s) favoritado(s)</Text>
        }
        renderItem={({ item }) => (
          <View>
            <EventoCard
              evento={item}
              onPress={() => router.push(`/detalhes/${item.id}` as any)}
            />
            <TouchableOpacity
              style={styles.removerBtn}
              onPress={() => removerFavorito(item.id)}
            >
              <Ionicons name="heart-dislike-outline" size={14} color="#E24B4A" />
              <Text style={styles.removerText}>Remover dos interesses</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#13131F' },
  listContent: { paddingBottom: 40, paddingTop: 8 },
  count: { color: '#444', fontSize: 12, paddingHorizontal: 24, paddingVertical: 8 },

  removerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginHorizontal: 20,
    marginTop: -4,
    marginBottom: 8,
  },
  removerText: { color: '#E24B4A', fontSize: 12 },

  vazio: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#13131F', padding: 32 },
  vazioTitulo: { color: '#F0EAD6', fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  vazioSub: { color: '#666', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});