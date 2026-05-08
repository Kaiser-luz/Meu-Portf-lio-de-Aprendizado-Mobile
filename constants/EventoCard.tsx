import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Evento } from '../dados';

type Props = {
  evento: Evento;
  onPress: () => void;
};

const EventoCard = ({ evento, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.accentBar, { backgroundColor: evento.tagColor }]} />

      <View style={styles.conteudo}>
        <View style={styles.tagRow}>
          <View style={[styles.tag, { backgroundColor: evento.tagColor }]}>
            <Text style={styles.tagText}>{evento.categoria}</Text>
          </View>
          <Text style={styles.data}>{evento.data}</Text>
        </View>

        <Text style={styles.titulo}>{evento.nome}</Text>
        <Text style={styles.descricao} numberOfLines={2}>{evento.descricao}</Text>

        <View style={styles.rodape}>
          <Text style={styles.local}> {evento.local}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{evento.ingresso}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E2E',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  accentBar: {
    width: 4,
  },
  conteudo: {
    flex: 1,
    padding: 16,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tagText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  data: {
    color: '#777',
    fontSize: 11,
  },
  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#F0EAD6',
    marginBottom: 6,
  },
  descricao: {
    fontSize: 13,
    color: '#999',
    lineHeight: 19,
    marginBottom: 14,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2E2E3E',
    paddingTop: 10,
  },
  local: {
    color: '#777',
    fontSize: 12,
    flex: 1,
  },
  badge: {
    backgroundColor: '#2A2A3E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default EventoCard;