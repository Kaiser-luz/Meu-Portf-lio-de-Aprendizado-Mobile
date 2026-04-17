import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EventoFestival } from '../data/eventos';

interface Props {
  item: EventoFestival;
  isExpandido: boolean;
  aoPressionar: () => void;
}

export default function CardEvento({ item, isExpandido, aoPressionar }: Props) {
  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: item.corDestaque }]} // Cor da borda dinâmica
      onPress={aoPressionar}
      activeOpacity={0.8}
    >
      <Text style={[styles.cardTitulo, { color: item.corDestaque }]}>{item.titulo}</Text> {/* Cor do título dinâmica */}
      <Text style={styles.cardResumo}>{item.resumo}</Text>
      
      {isExpandido && (
        <View style={styles.detalhesContainer}>
          <Text style={styles.cardDetalhes}>{item.detalhes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardResumo: {
    fontSize: 14,
    color: '#666',
  },
  detalhesContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  cardDetalhes: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
});