import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getCategoriaLabel } from '@/data/categorias';
import type { Evento } from '@/types/evento';
import { formatarDistancia } from '@/utils/geo';

type EventoCardProps = {
  evento: Evento;
  isInteresse?: boolean;
  onPress: () => void;
  onToggleInteresse?: () => void;
};

export default function EventoCard({
  evento,
  isInteresse = false,
  onPress,
  onToggleInteresse,
}: EventoCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.headerLinha}>
        <Text style={styles.categoria}>{getCategoriaLabel(evento.categoria)}</Text>
        {evento.origem === 'usuario' ? <Text style={styles.proprio}>Meu evento</Text> : null}
      </View>

      <Text style={styles.titulo}>{evento.titulo}</Text>

      <View style={styles.infoLinha}>
        <Ionicons name="calendar-outline" size={17} color="#7C3AED" />
        <Text style={styles.info}>{evento.data} - {evento.hora}</Text>
      </View>

      <View style={styles.infoLinha}>
        <Ionicons name="location-outline" size={17} color="#7C3AED" />
        <Text style={styles.info}>{evento.local} | {evento.cidade} - {evento.estado}</Text>
      </View>

      <View style={styles.infoLinha}>
        <Ionicons name="navigate-outline" size={17} color="#7C3AED" />
        <Text style={styles.info}>{formatarDistancia(evento.distanciaKm)}</Text>
      </View>

      <Text numberOfLines={3} style={styles.descricao}>{evento.descricao}</Text>

      {onToggleInteresse ? (
        <TouchableOpacity
          style={[styles.botaoInteresse, isInteresse && styles.botaoInteresseAtivo]}
          onPress={onToggleInteresse}
          activeOpacity={0.8}>
          <Ionicons
            name={isInteresse ? 'heart' : 'heart-outline'}
            size={18}
            color={isInteresse ? '#FFFFFF' : '#7C3AED'}
          />
          <Text style={[styles.textoInteresse, isInteresse && styles.textoInteresseAtivo]}>
            {isInteresse ? 'Marcado em Meus Interesses' : 'Marcar interesse'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    borderLeftWidth: 7,
    borderLeftColor: '#7C3AED',
    borderTopWidth: 2,
    borderTopColor: '#FACC15',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 5,
  },
  headerLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  categoria: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    color: '#4338CA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 'bold',
  },
  proprio: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 12,
  },
  infoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 6,
  },
  info: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  descricao: {
    marginTop: 10,
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  botaoInteresse: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 16,
    paddingVertical: 11,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botaoInteresseAtivo: {
    backgroundColor: '#7C3AED',
  },
  textoInteresse: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  textoInteresseAtivo: {
    color: '#FFFFFF',
  },
});
