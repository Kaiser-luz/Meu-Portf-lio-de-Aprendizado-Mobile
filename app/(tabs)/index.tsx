import React, { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

// Importando nossos novos dados e componente
import CardEvento from '../../components/CardEvento';
import { EVENTOS } from '../../data/eventos';

export default function HomeScreen() {
  const [cardAberto, setCardAberto] = useState<string | null>(null);

  const alternarCard = (id: string) => {
    setCardAberto(cardAberto === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar Vermelha */}
      <StatusBar barStyle="light-content" backgroundColor="#D32F2F" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Guia de Grandes Festivais</Text>
        <Text style={styles.subHeader}>Tomorrowland, Rock in Rio e mais!</Text>
      </View>
      
      <FlatList
        data={EVENTOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardEvento 
            item={item} 
            isExpandido={cardAberto === item.id}
            aoPressionar={() => alternarCard(item.id)}
          />
        )}
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fundo cinza claro para destacar os cards
  },
  header: {
    backgroundColor: '#D32F2F', // VERMELHO principal
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    elevation: 5, // Sombra no cabeçalho
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    color: '#FFCDD2', // Vermelho clarinho para o subtítulo
    fontSize: 14,
    marginTop: 5,
  },
  lista: {
    padding: 15,
    paddingBottom: 40,
  },
});