import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import EventoCard from '@/components/EventoCard';
import { useAuth } from '@/context/AuthContext';
import { useEventos } from '@/context/EventosContext';
import type { Evento } from '@/types/evento';

export default function MeusEventosScreen() {
  const { usuario, isAuthenticated, logout } = useAuth();
  const {
    meusEventos,
    removerEvento,
    ultimoCrudStatus,
    limparUltimoCrudStatus,
    alternarInteresse,
    isInteresse,
  } = useEventos();

  const confirmarExclusao = (evento: Evento) => {
    Alert.alert('Excluir evento', `Deseja excluir "${evento.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await removerEvento(evento.id);
        },
      },
    ]);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.containerCentralizado}>
        <View style={styles.cardLogin}>
          <Ionicons name="lock-closed-outline" size={42} color="#7C3AED" />
          <Text style={styles.loginTitulo}>Login necessario</Text>
          <Text style={styles.loginTexto}>
            Adicionar, editar e excluir eventos e exclusivo para usuarios logados.
          </Text>
          <TouchableOpacity style={styles.botaoPrimario} onPress={() => router.push('/login')}>
            <Text style={styles.textoBotao}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.tituloPrincipal}>Meus Eventos</Text>
        <Text style={styles.subtitulo}>Logado como {usuario?.email}</Text>
        <View style={styles.topoAcoes}>
          <TouchableOpacity style={styles.botaoAdicionar} onPress={() => router.push('/evento-form')}>
            <Ionicons name="add-circle-outline" size={19} color="#0F172A" />
            <Text style={styles.textoAdicionar}>Adicionar evento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoSair} onPress={logout}>
            <Text style={styles.textoSair}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {ultimoCrudStatus ? (
        <TouchableOpacity style={styles.statusBox} onPress={limparUltimoCrudStatus}>
          <Text style={styles.statusTexto}>{ultimoCrudStatus}</Text>
          <Text style={styles.statusFechar}>Toque para fechar</Text>
        </TouchableOpacity>
      ) : null}

      <FlatList
        data={meusEventos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.eventoComAcoes}>
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
            <View style={styles.acoesCard}>
              <TouchableOpacity
                style={[styles.acaoBotao, styles.acaoEditar]}
                onPress={() =>
                  router.push({
                    pathname: '/evento-form',
                    params: { eventoId: item.id },
                  })
                }>
                <Ionicons name="create-outline" size={18} color="#FFFFFF" />
                <Text style={styles.acaoTexto}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.acaoBotao, styles.acaoExcluir]}
                onPress={() => confirmarExclusao(item)}>
                <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
                <Text style={styles.acaoTexto}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vazioCard}>
            <Text style={styles.vazioTitulo}>Nenhum evento criado</Text>
            <Text style={styles.vazioTexto}>
              Toque em Adicionar evento para cadastrar seu primeiro festival ou evento proprio.
            </Text>
          </View>
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
  containerCentralizado: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardLogin: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',
    width: '100%',
  },
  loginTitulo: {
    fontSize: 25,
    color: '#2563EB',
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 10,
  },
  loginTexto: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  botaoPrimario: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: '#DBEAFE',
    textAlign: 'center',
    marginBottom: 16,
  },
  topoAcoes: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoAdicionar: {
    flex: 1,
    backgroundColor: '#FACC15',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  textoAdicionar: {
    color: '#0F172A',
    fontWeight: 'bold',
  },
  botaoSair: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSair: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statusBox: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#DCFCE7',
    padding: 13,
    borderRadius: 14,
  },
  statusTexto: {
    color: '#166534',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusFechar: {
    color: '#166534',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 3,
  },
  lista: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 90,
  },
  eventoComAcoes: {
    marginBottom: 18,
  },
  acoesCard: {
    flexDirection: 'row',
    gap: 10,
    marginTop: -8,
    marginBottom: 10,
  },
  acaoBotao: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  acaoEditar: {
    backgroundColor: '#2563EB',
  },
  acaoExcluir: {
    backgroundColor: '#DC2626',
  },
  acaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  vazioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  vazioTitulo: {
    fontSize: 22,
    color: '#2563EB',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  vazioTexto: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
  },
});
