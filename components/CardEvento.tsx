import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EventoFestival } from '../data/eventos';

interface Props {
  item: EventoFestival;
  aoPressionar: () => void; // Obrigatório para a navegação funcionar
}

export default function CardEvento({ item, aoPressionar }: Props) {
  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: item.corDestaque }]}
      onPress={aoPressionar}
      activeOpacity={0.8}
    >
      <Text style={[styles.cardTitulo, { color: item.corDestaque }]}>{item.titulo}</Text>
      <Text style={styles.cardResumo}>{item.resumo}</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTexto}>📅 <Text style={styles.bold}>Data:</Text> {item.data}</Text>
        <Text style={styles.infoTexto}>📍 <Text style={styles.bold}>Local:</Text> {item.local}</Text>
        <Text style={styles.infoTexto}>💰 <Text style={styles.bold}>Valor:</Text> {item.valor}</Text>
      </View>

      <Text style={styles.cliqueAqui}>Clique para ver detalhes ➔</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20,
    marginBottom: 15, borderLeftWidth: 8, elevation: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  cardTitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  cardResumo: { fontSize: 14, color: '#666', fontStyle: 'italic', marginBottom: 10 },
  infoContainer: { backgroundColor: '#F0F2F5', padding: 10, borderRadius: 8, marginTop: 5 },
  infoTexto: { fontSize: 13, color: '#444', marginBottom: 2 },
  bold: { fontWeight: 'bold' },
  cliqueAqui: { fontSize: 12, color: '#999', textAlign: 'right', marginTop: 15, fontWeight: 'bold' }
});