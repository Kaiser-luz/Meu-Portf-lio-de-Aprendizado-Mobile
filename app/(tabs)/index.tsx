import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const EVENTOS = [
  { id: "1", titulo: "Rock in Rio", desc: "O maior festival de música e entretenimento do mundo." },
  { id: "2", titulo: "Lollapalooza Brasil", desc: "Festival de música alternativa e cultura pop." },
  { id: "3", titulo: "Tomorrowland Brasil", desc: "O maior festival de música eletrônica do planeta." },
  { id: "4", titulo: "Festa do Peão de Barretos", desc: "Referência mundial em rodeio e música sertaneja." },
  { id: "5", titulo: "Carnaval de Salvador", desc: "A maior festa popular de rua do mundo." },
  { id: "6", titulo: "Festival de Inverno", desc: "Evento multicultural com shows e arte." },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Meu Portfólio: Eventos</Text>

      <FlatList
        data={EVENTOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7} 
            onPress={() => 
              router.push({
                // O "../" sai da pasta (tabs) para achar o arquivo na raiz da pasta app
                pathname: "../DetalhesItem", 
                params: { 
                  eventoId: item.id, 
                  titulo: item.titulo, 
                  desc: item.desc 
                }
              })
            }
          >
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", paddingTop: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#212529",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#007BFF" },
  cardDesc: { fontSize: 14, color: "#6C757D", marginTop: 8 },
});