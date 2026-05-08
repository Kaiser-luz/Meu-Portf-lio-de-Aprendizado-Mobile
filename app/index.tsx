import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import EventoCard from '../constants/EventoCard';
import { Evento } from '../dados';
import api from '../services/api';

// Categorias e cores para variar visualmente os cards
const categorias = [
  { label: '🎷 Música',      color: '#7B61FF' },
  { label: '🎌 Pop Japonês', color: '#E91E8C' },
  { label: '🍔 Gastronomia', color: '#FF6B35' },
  { label: '💻 Tecnologia',  color: '#00BCD4' },
  { label: '📚 Literatura',  color: '#4CAF50' },
  { label: '🎨 Arte Urbana', color: '#FF9800' },
  { label: '🎬 Cinema',      color: '#9C27B0' },
];

// Tela 1 — ListaItens
export default function ListaItens() {
  const router = useRouter();

  // Estados para os dados, carregamento e erro
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect executa a busca ao montar o componente ([] = só uma vez)
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/posts');

        // Adapta os dados do jsonplaceholder para o formato Evento
        const dadosAdaptados: Evento[] = response.data
          .slice(0, 10)
          .map((item: any) => {
            const cat = categorias[item.id % categorias.length];
            return {
              id: String(item.id),
              nome: item.title,
              descricao: item.body,
              categoria: cat.label,
              tagColor: cat.color,
              data: `${(item.id % 28) + 1} Jul 2025`,
              local: 'Curitiba, PR',
              ingresso: item.id % 3 === 0 ? 'Grátis' : `R$ ${item.id * 10}`,
            };
          });

        setEventos(dadosAdaptados);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Não foi possível carregar os eventos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventos();
  }, []);

  // Tela de carregamento
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Carregando eventos...</Text>
      </View>
    );
  }

  // Tela de erro
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerLabel}>🗓  AGENDA</Text>
            <Text style={styles.headerTitulo}>Eventos & Festivais</Text>
            <Text style={styles.headerSub}>Curitiba · 2025</Text>
          </View>
        }
        ListFooterComponent={
          <Text style={styles.footer}>Meu Portfólio de Aprendizado Mobile 🚀</Text>
        }
        renderItem={({ item }) => (
          <EventoCard
            evento={item}
            onPress={() => router.push(`/detalhes/${item.id}` as any)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#13131F',
  },
  listContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#1A1A2E',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 8,
  },
  headerLabel: {
    color: '#FF6B35',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitulo: {
    color: '#F0EAD6',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerSub: {
    color: '#555',
    fontSize: 13,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13131F',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13131F',
    padding: 24,
  },
  errorText: {
    fontSize: 15,
    color: '#FF6B35',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    color: '#333',
    fontSize: 12,
    marginTop: 24,
  },
});