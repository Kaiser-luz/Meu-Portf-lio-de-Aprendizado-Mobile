import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import api from '../../services/api';
import { Evento } from '../../dados';
import { FAVORITOS_KEY } from '../interesses';
import MapaEvento from '../../components/MapaEvento';

export default function DetalhesItem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [evento, setEvento] = useState<Evento | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    fetchEvento();
    verificarFavorito();
  }, [id]);

  const fetchEvento = async () => {
    try {
      const response = await api.get(`/eventos/${id}`);
      setEvento(response.data);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar o evento.');
    } finally {
      setIsLoading(false);
    }
  };

  const verificarFavorito = async () => {
    try {
      const dados = await AsyncStorage.getItem(FAVORITOS_KEY);
      const lista: Evento[] = dados ? JSON.parse(dados) : [];
      setFavoritado(lista.some((e) => e.id === id));
    } catch {}
  };

  const toggleFavorito = async () => {
    if (!evento) return;
    try {
      const dados = await AsyncStorage.getItem(FAVORITOS_KEY);
      let lista: Evento[] = dados ? JSON.parse(dados) : [];

      if (favoritado) {
        lista = lista.filter((e) => e.id !== evento.id);
      } else {
        lista.push(evento);
      }

      await AsyncStorage.setItem(FAVORITOS_KEY, JSON.stringify(lista));
      setFavoritado(!favoritado);
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar os favoritos.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (!evento) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.erro}>Evento não encontrado.</Text>
      </View>
    );
  }

  const lat = parseFloat(evento.latitude);
  const lng = parseFloat(evento.longitude);
  const temCoordenadas = !isNaN(lat) && !isNaN(lng);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <View style={styles.bannerRow}>
            <View style={styles.tagBanner}>
              <Text style={styles.tagBannerText}>{evento.categoria || 'Evento'}</Text>
            </View>
            <TouchableOpacity onPress={toggleFavorito} style={styles.favBtn}>
              <Ionicons
                name={favoritado ? 'heart' : 'heart-outline'}
                size={26}
                color={favoritado ? '#E24B4A' : '#fff'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerTitulo}>{evento.nome}</Text>
        </View>

        <View style={styles.corpo}>
          <Text style={styles.secaoTitulo}>Sobre o evento</Text>
          <Text style={styles.descricao}>{evento.descricao}</Text>

          <Text style={styles.secaoTitulo}>Informações</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoIcone}>📅</Text>
              <Text style={styles.infoLabel}>Data</Text>
              <Text style={styles.infoValor}>{evento.data}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoIcone}>🎟️</Text>
              <Text style={styles.infoLabel}>Ingresso</Text>
              <Text style={[styles.infoValor, { color: '#FF6B35' }]}>{evento.ingresso}</Text>
            </View>
          </View>

          <View style={styles.localCard}>
            <Text style={styles.infoIcone}>📍</Text>
            <View>
              <Text style={styles.infoLabel}>Local</Text>
              <Text style={styles.infoValor}>{evento.local}</Text>
            </View>
          </View>

          {temCoordenadas && (
            <>
              <Text style={styles.secaoTitulo}>Localização</Text>
              <MapaEvento
                latitude={lat}
                longitude={lng}
                titulo={evento.nome}
                local={evento.local}
              />
            </>
          )}

          <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
            <Text style={styles.botaoVoltarText}>← Voltar para a lista</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#13131F' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#13131F' },
  erro: { color: '#fff', textAlign: 'center' },
  banner: {
    paddingTop: 40, paddingBottom: 36, paddingHorizontal: 24,
    backgroundColor: '#1A1A2E', borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
  },
  bannerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  tagBanner: { backgroundColor: 'rgba(255,107,53,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  tagBannerText: { color: '#FF6B35', fontSize: 12, fontWeight: 'bold' },
  favBtn: { padding: 4 },
  bannerTitulo: { color: '#fff', fontSize: 26, fontWeight: 'bold', lineHeight: 32 },
  corpo: { padding: 24 },
  secaoTitulo: { color: '#FF6B35', fontSize: 12, fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 24, marginBottom: 12 },
  descricao: { color: '#AAA', fontSize: 15, lineHeight: 24 },
  infoGrid: { flexDirection: 'row', gap: 12 },
  infoCard: { flex: 1, backgroundColor: '#1E1E2E', borderRadius: 14, padding: 16 },
  localCard: { backgroundColor: '#1E1E2E', borderRadius: 14, padding: 16, marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoIcone: { fontSize: 20, marginBottom: 8 },
  infoLabel: { color: '#666', fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 },
  infoValor: { color: '#F0EAD6', fontSize: 15, fontWeight: 'bold' },
  botaoVoltar: { marginTop: 32, backgroundColor: '#1E1E2E', borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: '#2E2E3E' },
  botaoVoltarText: { color: '#FF6B35', fontSize: 15, fontWeight: 'bold' },
});