import React, { useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import CardCompetencia from '../../components/CardCompetencia';
import { COMPETENCIAS } from '../../data/competencias';

export default function HomeScreen() {
  const [cardAberto, setCardAberto] = useState<string | null>(null);

  const alternarCard = (id: string) => {
    setCardAberto(cardAberto === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8A1538" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Catálogo de Competências</Text>
        <Text style={styles.subHeader}>Portfólio de Aprendizado Mobile</Text>
      </View>
      
      <FlatList
        data={COMPETENCIAS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardCompetencia 
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#8A1538', // GRENÁ
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    color: '#E0E0E0',
    fontSize: 14,
    marginTop: 5,
  },
  lista: {
    padding: 15,
    paddingBottom: 40,
  },
});