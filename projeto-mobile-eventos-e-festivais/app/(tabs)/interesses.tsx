import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import EventoCard from '@/components/EventoCard';
import { useEventos } from '@/context/EventosContext';

export default function InteressesScreen() {
  const { eventosComInteresse, alternarInteresse, isInteresse } = useEventos();

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.tituloPrincipal}>Meus Interesses</Text>
        <Text style={styles.subtitulo}>
          Eventos que voce marcou como pretende ir ficam salvos no aparelho.
        </Text>
      </View>

      <FlatList
        data={eventosComInteresse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
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
        ListEmptyComponent={
          <View style={styles.vazioCard}>
            <Text style={styles.vazioTitulo}>Nada marcado ainda</Text>
            <Text style={styles.vazioTexto}>
              Volte para Explorar e toque em Marcar interesse nos eventos que voce pretende ir.
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
  topo: {
    backgroundColor: '#7C3AED',
    borderRadius: 22,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 18,
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
    fontSize: 15,
    color: '#EDE9FE',
    textAlign: 'center',
    lineHeight: 22,
  },
  lista: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 90,
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
