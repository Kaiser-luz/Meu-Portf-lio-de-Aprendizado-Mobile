import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo } from 'react';
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getCategoriaLabel } from '@/data/categorias';
import { useAuth } from '@/context/AuthContext';
import { useEventos } from '@/context/EventosContext';
import type { Evento } from '@/types/evento';
import { formatarDistancia } from '@/utils/geo';

function parseEvento(evento: unknown): Evento | null {
  if (!evento || typeof evento !== 'string') {
    return null;
  }

  try {
    return JSON.parse(evento);
  } catch {
    return null;
  }
}

export default function DetalhesItem() {
  const params = useLocalSearchParams();
  const { eventos, alternarInteresse, isInteresse, removerEvento } = useEventos();
  const { isAuthenticated } = useAuth();

  const eventoId = typeof params.eventoId === 'string' ? params.eventoId : undefined;
  const eventoParam = parseEvento(params.evento);
  const dados = useMemo(
    () => eventos.find((evento) => evento.id === eventoId) ?? eventoParam,
    [eventos, eventoId, eventoParam]
  );

  const confirmarExclusao = () => {
    if (!dados) {
      return;
    }

    Alert.alert('Excluir evento', `Deseja excluir "${dados.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await removerEvento(dados.id);
          router.replace('/(tabs)/meus-eventos');
        },
      },
    ]);
  };

  if (!dados) {
    return (
      <View style={styles.containerErro}>
        <Text style={styles.erro}>Detalhes do evento nao encontrados.</Text>
        <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const interesse = isInteresse(dados.id);
  const podeEditar = isAuthenticated && dados.origem === 'usuario';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dados.imagem ? <Image source={{ uri: dados.imagem }} style={styles.imagem} /> : null}

      <View style={styles.card}>
        <View style={styles.headerLinha}>
          <Text style={styles.tag}>{getCategoriaLabel(dados.categoria)}</Text>
          <TouchableOpacity
            style={[styles.botaoIcone, interesse && styles.botaoIconeAtivo]}
            onPress={() => alternarInteresse(dados.id)}>
            <Ionicons name={interesse ? 'heart' : 'heart-outline'} size={24} color={interesse ? '#FFFFFF' : '#7C3AED'} />
          </TouchableOpacity>
        </View>

        <Text style={styles.titulo}>{dados.titulo}</Text>

        <Info label="Data" value={`${dados.data} - ${dados.hora}`} />
        <Info label="Local" value={dados.local} />
        <Info label="Cidade" value={`${dados.cidade} - ${dados.estado}`} />
        <Info label="Endereco" value={dados.endereco} />
        <Info label="Distancia" value={formatarDistancia(dados.distanciaKm)} />
        <Info label="Coordenadas" value={`${dados.latitude.toFixed(5)}, ${dados.longitude.toFixed(5)}`} />

        <Text style={styles.subtitulo}>Sobre o evento</Text>
        <Text style={styles.descricao}>{dados.descricao}</Text>

        {dados.link ? (
          <TouchableOpacity style={styles.botaoIngresso} onPress={() => Linking.openURL(dados.link ?? '')}>
            <Ionicons name="open-outline" size={18} color="#FFFFFF" />
            <Text style={styles.textoBotao}>Abrir link do evento</Text>
          </TouchableOpacity>
        ) : null}

        {podeEditar ? (
          <View style={styles.acoesProprio}>
            <TouchableOpacity
              style={[styles.botaoAcao, styles.botaoEditar]}
              onPress={() =>
                router.push({
                  pathname: '/evento-form',
                  params: { eventoId: dados.id },
                })
              }>
              <Ionicons name="create-outline" size={18} color="#FFFFFF" />
              <Text style={styles.textoBotao}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botaoAcao, styles.botaoExcluir]}
              onPress={confirmarExclusao}>
              <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.valor}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#0F172A',
  },
  containerErro: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  erro: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  imagem: {
    width: '100%',
    height: 220,
    borderRadius: 22,
    marginBottom: 18,
    backgroundColor: '#1E293B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
  },
  headerLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#7C3AED',
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: 'bold',
  },
  botaoIcone: {
    width: 44,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoIconeAtivo: {
    backgroundColor: '#7C3AED',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 14,
  },
  infoBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginTop: 3,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginTop: 22,
    marginBottom: 8,
  },
  descricao: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  botaoIngresso: {
    marginTop: 24,
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  acoesProprio: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  botaoAcao: {
    flex: 1,
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  botaoEditar: {
    backgroundColor: '#2563EB',
  },
  botaoExcluir: {
    backgroundColor: '#DC2626',
  },
  botao: {
    marginTop: 14,
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
