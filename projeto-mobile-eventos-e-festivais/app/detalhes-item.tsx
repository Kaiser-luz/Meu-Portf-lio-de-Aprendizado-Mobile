import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function DetalhesItem() {
  const { id, titulo, data, local, descricao } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Detalhes do Festival</Text>

        <Text style={styles.nome}>{titulo}</Text>

        <Text style={styles.info}>ID recebido: {id}</Text>
        <Text style={styles.info}>Data: {data}</Text>
        <Text style={styles.info}>Local: {local}</Text>

        <Text style={styles.descricao}>{descricao}</Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#0b3d2e',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 8,
    borderLeftColor: '#c62828',
    borderTopWidth: 3,
    borderTopColor: '#fdd835',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c62828',
    textAlign: 'center',
    marginBottom: 20,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0288d1',
    marginBottom: 12,
  },
  info: {
    fontSize: 15,
    fontWeight: '600',
    color: '#c62828',
    marginBottom: 6,
  },
  descricao: {
    marginTop: 12,
    fontSize: 15,
    color: '#1b5e20',
    lineHeight: 22,
  },
  botao: {
    marginTop: 24,
    backgroundColor: '#c62828',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});