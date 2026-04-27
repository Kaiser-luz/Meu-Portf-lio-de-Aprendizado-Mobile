import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "./themed-text";
import { View } from "./themed-view";

type Props = {
  titulo: string;
  descricao: string;
};

export default function Card({ titulo, descricao }: Props) {
  const [aberto, setAberto] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setAberto(!aberto)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>{titulo}</Text>

        {!aberto && (
          <Text style={styles.maisInfo}>mais informações</Text>
        )}
      </View>

      {aberto && (
        <Text style={styles.descricao}>{descricao}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  maisInfo: {
    fontSize: 12,
    color: "#4da6ff",
  },
  descricao: {
    marginTop: 10,
    fontSize: 14,
  },
});
