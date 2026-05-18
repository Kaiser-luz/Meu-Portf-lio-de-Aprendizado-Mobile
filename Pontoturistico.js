import { useEffect, useState } from "react";

import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import PontoTuristicoCard from "./components/PontoTuristicoCard";
import api from "./services/api";

export default function ListaPontosTuristicos() {
  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await api.get("/posts");

        const dadosFormatados = response.data.map((item) => ({
          id: item.id.toString(),
          nome: item.title,
          descricao: item.body,
        }));

        setPontosTuristicos(dadosFormatados);
      } catch (err) {
        setError("Erro ao carregar os pontos turísticos.");
      } finally {
        setIsLoading(false);
      }
    }

    carregarDados();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pontosTuristicos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PontoTuristicoCard
          nome={item.nome}
          descricao={item.descricao}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});