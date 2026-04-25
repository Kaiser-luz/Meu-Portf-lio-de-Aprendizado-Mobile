import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';

import CardEvento from '../components/CardEvento';
import { EVENTOS } from '../data/eventos';

export default function ListaEventos() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8A1538" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Guia de Grandes Festivais</Text>
        <Text style={styles.subHeader}>Dicas de Sobrevivência e Logística</Text>
      </View>
      
      <FlatList
        data={EVENTOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardEvento 
            item={item} 
            aoPressionar={() => navigation.navigate('DetalhesItem', item)} 
          />
        )}
        // O segredo do scroll está nestas duas linhas abaixo:
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40, flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#8A1538',
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
  },
  subHeader: {
    color: '#D1D1D1',
    fontSize: 14,
    marginTop: 6,
  }
});