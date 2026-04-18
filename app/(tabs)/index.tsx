import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import CardEvento from '../../components/CardEvento';
import { EVENTOS } from '../../data/eventos';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8A1538" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Guia de Grandes Festivais</Text>
        <Text style={styles.subHeader}>Dicas de Sobrevivência e Logística</Text>
      </View>
      
      <FlatList
        data={EVENTOS}
        keyExtractor={(item) => item.id}
        // Agora só passamos o "item", sem funções de clique
        renderItem={({ item }) => <CardEvento item={item} />} 
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#8A1538', // GRENÁ
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    elevation: 8,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subHeader: {
    color: '#D1D1D1',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
  },
  lista: {
    padding: 16,
    paddingBottom: 40,
  },
});