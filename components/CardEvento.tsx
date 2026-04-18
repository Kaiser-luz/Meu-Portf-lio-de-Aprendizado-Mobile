import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EventoFestival } from '../data/eventos';

interface Props {
  item: EventoFestival;
}

export default function CardEvento({ item }: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: item.corDestaque }]}>
      <Text style={[styles.cardTitulo, { color: item.corDestaque }]}>{item.titulo}</Text>
      <Text style={styles.cardResumo}>{item.resumo}</Text>
      
      {/* Seção de Informações Fixas */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTexto}>📅 <Text style={styles.bold}>Data:</Text> {item.data}</Text>
        <Text style={styles.infoTexto}>📍 <Text style={styles.bold}>Local:</Text> {item.local}</Text>
        <Text style={styles.infoTexto}>💰 <Text style={styles.bold}>Valor:</Text> {item.valor}</Text>
      </View>

      <View style={styles.detalhesContainer}>
        <Text style={styles.cardDetalhes}>{item.detalhes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardResumo: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#F0F2F5',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  infoTexto: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
  detalhesContainer: {
    marginTop: 5,
    paddingTop: 10,
  },
  cardDetalhes: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
});