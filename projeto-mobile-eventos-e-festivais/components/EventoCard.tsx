import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type EventoCardProps = {
  titulo: string;
  data: string;
  local: string;
  descricao: string;
  onPress: () => void;
};

export default function EventoCard({
  titulo,
  data,
  local,
  descricao,
  onPress,
}: EventoCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.info}>Data: {data}</Text>
      <Text style={styles.info}>Local: {local}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
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
    elevation: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: 5,
  },
  descricao: {
    marginTop: 10,
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
});