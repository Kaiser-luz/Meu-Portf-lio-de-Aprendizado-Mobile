import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View,
} from 'react-native';
import EventoCard from '../constants/EventoCard';
import { Evento } from '../dados';
import api from '../services/api';

const CATEGORIAS = ['Todos', 'Música', 'Arte', 'Gastronomia', 'Tecnologia', 'Esporte'];

const CORES: Record<string, string> = {
  'Música': '#7B61FF',
  'Arte': '#FF9800',
  'Gastronomia': '#FF6B35',
  'Tecnologia': '#00BCD4',
  'Esporte': '#4CAF50',
};

// Formata data ISO para formato legível
const formatarData = (dataStr: string): string => {
  try {
    const data = new Date(dataStr);
    if (isNaN(data.getTime())) return dataStr;
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dataStr;
  }
};

export default function Explorar() {
  const router = useRouter();

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [filtrados, setFiltrados] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  useEffect(() => {
    fetchEventos();
  }, []);

  useEffect(() => {
    filtrar();
  }, [busca, categoriaSelecionada, eventos]);

  const fetchEventos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/eventos');
      // Formata a data de cada evento ao carregar
      const dadosFormatados = response.data.map((e: Evento) => ({
        ...e,
        data: formatarData(e.data),
      }));
      setEventos(dadosFormatados);
    } catch (err) {
      setError('Não foi possível carregar os eventos.');
    } finally {
      setIsLoading(false);
    }
  };

  const filtrar = () => {
    let resultado = [...eventos];

    if (categoriaSelecionada !== 'Todos') {
      resultado = resultado.filter(e =>
        e.categoria?.toLowerCase().includes(categoriaSelecionada.toLowerCase())
      );
    }

    if (busca.trim()) {
      resultado = resultado.filter(e =>
        e.nome?.toLowerCase().includes(busca.toLowerCase())
      );
    }

    setFiltrados(resultado);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Carregando eventos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchEventos}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      {/* Barra de busca */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar evento..."
          placeholderTextColor="#555"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtro por categoria */}
      <View style={styles.filtroWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtroContent}
        >
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.filtroBtn,
                categoriaSelecionada === cat && styles.filtroBtnAtivo,
              ]}
              onPress={() => setCategoriaSelecionada(cat)}
            >
              <Text
                style={[
                  styles.filtroText,
                  categoriaSelecionada === cat && styles.filtroTextAtivo,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista */}
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum evento encontrado.</Text>
        }
        renderItem={({ item }) => (
          <EventoCard
            evento={{ ...item, tagColor: CORES[item.categoria] || '#FF6B35' }}
            onPress={() => router.push(`/detalhes/${item.id}` as any)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#13131F' },
  listContent: { paddingBottom: 40, paddingTop: 8 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2E',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#F0EAD6', fontSize: 14 },

  // Filtro corrigido — sem maxHeight que cortava os botões
  filtroWrapper: {
    height: 52,
    marginBottom: 8,
  },
  filtroContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  filtroBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E1E2E',
    borderWidth: 1,
    borderColor: '#2E2E3E',
  },
  filtroBtnAtivo: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  filtroText: { color: '#888', fontSize: 13 },
  filtroTextAtivo: { color: '#fff', fontWeight: 'bold' },

  emptyText: { color: '#555', textAlign: 'center', marginTop: 40, fontSize: 14 },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#13131F' },
  loadingText: { marginTop: 12, fontSize: 15, color: '#666' },

  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#13131F', padding: 24 },
  errorText: { fontSize: 15, color: '#FF6B35', textAlign: 'center', marginBottom: 16 },
  retryBtn: { backgroundColor: '#FF6B35', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  retryText: { color: '#fff', fontWeight: 'bold' },
});