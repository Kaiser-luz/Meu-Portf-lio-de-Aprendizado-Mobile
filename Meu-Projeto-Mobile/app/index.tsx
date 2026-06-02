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

const CORES: Record<string, string> = {
  'Música':      '#A78BFA',
  'Arte':        '#34D399',
  'Gastronomia': '#F472B6',
  'Tecnologia':  '#38BDF8',
  'Esporte':     '#FB923C',
};

const CORES_PADRAO = [
  '#A78BFA','#34D399','#F472B6','#38BDF8',
  '#FB923C','#FBBF24','#60A5FA','#F87171',
];

const formatarData = (dataStr: string): string => {
  try {
    const data = new Date(dataStr);
    if (isNaN(data.getTime())) return dataStr;
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch {
    return dataStr;
  }
};

export default function Explorar() {
  const router = useRouter();

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [filtrados, setFiltrados] = useState<Evento[]>([]);
  const [categorias, setCategorias] = useState<string[]>(['Todos']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  useEffect(() => { fetchEventos(); }, []);
  useEffect(() => { filtrar(); }, [busca, categoriaSelecionada, eventos]);

  const fetchEventos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/eventos');
      const dadosFormatados = response.data.map((e: Evento) => ({
        ...e,
        data: formatarData(e.data),
      }));
      setEventos(dadosFormatados);

      const cats: string[] = ['Todos', ...Array.from(
        new Set(response.data.map((e: Evento) => e.categoria).filter(Boolean))
      ) as string[]];
      setCategorias(cats);
    } catch {
      setError('Não foi possível carregar os eventos.');
    } finally {
      setIsLoading(false);
    }
  };

  const filtrar = () => {
    let resultado = [...eventos];
    if (categoriaSelecionada !== 'Todos') {
      resultado = resultado.filter(e => e.categoria === categoriaSelecionada);
    }
    if (busca.trim()) {
      resultado = resultado.filter(e =>
        e.nome?.toLowerCase().includes(busca.toLowerCase())
      );
    }
    setFiltrados(resultado);
  };

  const getCorCategoria = (cat: string, index: number) =>
    CORES[cat] || CORES_PADRAO[index % CORES_PADRAO.length];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A78BFA" />
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

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar evento..."
          placeholderTextColor="#4B5563"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={18} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filtroWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtroContent}
        >
          {categorias.map((cat, index) => {
            const ativo = categoriaSelecionada === cat;
            const cor = cat === 'Todos' ? '#A78BFA' : getCorCategoria(cat, index);
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.filtroBtn,
                  ativo && { backgroundColor: cor, borderColor: cor },
                ]}
                onPress={() => setCategoriaSelecionada(cat)}
              >
                <Text style={[styles.filtroText, ativo && styles.filtroTextAtivo]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum evento encontrado.</Text>
        }
        renderItem={({ item, index }) => (
          <EventoCard
            evento={{
              ...item,
              tagColor: getCorCategoria(item.categoria, index),
            }}
            onPress={() => router.push(`/detalhes/${item.id}` as any)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D14' },
  listContent: { paddingBottom: 40, paddingTop: 8 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16161F',
    margin: 16,
    marginBottom: 8,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#1F1F2E',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#E2E8F0', fontSize: 14 },

  filtroWrapper: { height: 52, marginBottom: 8 },
  filtroContent: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  filtroBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#16161F',
    borderWidth: 1,
    borderColor: '#1F1F2E',
  },
  filtroText: { color: '#6B7280', fontSize: 13 },
  filtroTextAtivo: { color: '#fff', fontWeight: 'bold' },

  emptyText: { color: '#4B5563', textAlign: 'center', marginTop: 40, fontSize: 14 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D14' },
  loadingText: { marginTop: 12, fontSize: 15, color: '#6B7280' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D14', padding: 24 },
  errorText: { fontSize: 15, color: '#F472B6', textAlign: 'center', marginBottom: 16 },
  retryBtn: { backgroundColor: '#A78BFA', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  retryText: { color: '#fff', fontWeight: 'bold' },
});
