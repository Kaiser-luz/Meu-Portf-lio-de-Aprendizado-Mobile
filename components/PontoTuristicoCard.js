import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

export default function PontoTuristicoCard({
  titulo,
  descricao,
  cor,
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.card, { borderLeftColor: cor }]}
      onPress={() => setAberto(!aberto)}
    >
      <Text style={[styles.titulo, { color: cor }]}>
        {titulo}
      </Text>

      {aberto && (
        <Text style={styles.descricao}>
          {descricao}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderLeftWidth: 6,
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  descricao: {
    color: '#E5E5EA',
    fontSize: 18,
    marginTop: 12,
    lineHeight: 26,
  },
});