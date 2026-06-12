import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import ErrorMessage from '@/components/ErrorMessage';
import EventoCard from '@/components/EventoCard';
import Loading from '@/components/Loading';
import { CATEGORIAS } from '@/data/categorias';
import { useEventos } from '@/context/EventosContext';
import type { EventoCategoria } from '@/types/evento';

export default function ExplorarScreen() {
  const {
    eventos,
    isLoadingEventos,
    erroEventos,
    erroLocalizacao,
    localizacaoReal,
    refreshEventos,
    alternarInteresse,
    isInteresse,
  } = useEventos();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<EventoCategoria>('todos');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 450);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  const eventosFiltrados = useMemo(() => {
    const termo = debouncedSearchTerm.trim().toLowerCase();

    return eventos.filter((evento) => {
      const passaCategoria =
        categoriaSelecionada === 'todos' || evento.categoria === categoriaSelecionada;
      const passaBusca = !termo || evento.titulo.toLowerCase().includes(termo);

      return passaCategoria && passaBusca;
    });
  }, [eventos, categoriaSelecionada, debouncedSearchTerm]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshEventos();
    setIsRefreshing(false);
  };

  if (isLoadingEventos && eventos.length === 0) {
    return <Loading />;
  }

  if (!isLoadingEventos && eventos.length === 0) {
    return <ErrorMessage mensagem="Nenhum evento foi encontrado." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.tituloPrincipal}>Eventos e Festivais</Text>
        <Text style={styles.subtitulo}>
          Descubra eventos por tipo, busque pelo nome e veja os mais proximos primeiro.
        </Text>
      </View>

      <View style={styles.buscaContainer}>
        <TextInput
          style={styles.buscaInput}
          placeholder="Pesquisar pelo nome do evento"
          placeholderTextColor="#94A3B8"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriasContainer}>
        {CATEGORIAS.map((categoria) => {
          const selected = categoriaSelecionada === categoria.key;

          return (
            <TouchableOpacity
              key={categoria.key}
              style={[styles.categoriaBotao, selected && styles.categoriaBotaoAtivo]}
              onPress={() => setCategoriaSelecionada(categoria.key)}>
              <Text style={[styles.categoriaTexto, selected && styles.categoriaTextoAtivo]}>
                {categoria.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {erroEventos ? <Text style={styles.aviso}>{erroEventos}</Text> : null}
      {erroLocalizacao ? <Text style={styles.aviso}>{erroLocalizacao}</Text> : null}
      <Text style={styles.ordenacao}>
        Lista ordenada por proximidade {localizacaoReal ? 'da sua localizacao atual.' : 'do ponto de referencia.'}
      </Text>

      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventoCard
            evento={item}
            isInteresse={isInteresse(item.id)}
            onToggleInteresse={() => alternarInteresse(item.id)}
            onPress={() =>
              router.push({
                pathname: '/detalhes-item',
                params: { eventoId: item.id },
              })
            }
          />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.semResultados}>
            Nenhum evento encontrado para os filtros selecionados.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 50,
  },
  lista: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 90,
  },
  topo: {
    backgroundColor: '#2563EB',
    borderRadius: 22,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: '#FACC15',
  },
  tituloPrincipal: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#DBEAFE',
    textAlign: 'center',
    lineHeight: 22,
  },
  buscaContainer: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  buscaInput: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriasContainer: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 10,
  },
  categoriaBotao: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    backgroundColor: '#1E293B',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
  },
  categoriaBotaoAtivo: {
    backgroundColor: '#FACC15',
    borderColor: '#FACC15',
  },
  categoriaTexto: {
    color: '#E2E8F0',
    fontWeight: 'bold',
  },
  categoriaTextoAtivo: {
    color: '#0F172A',
  },
  aviso: {
    color: '#FDE68A',
    backgroundColor: '#422006',
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    padding: 10,
    fontSize: 12,
    lineHeight: 17,
  },
  ordenacao: {
    color: '#CBD5E1',
    marginHorizontal: 20,
    marginBottom: 2,
    fontSize: 12,
  },
  semResultados: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});
