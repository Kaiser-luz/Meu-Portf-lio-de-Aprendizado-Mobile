import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DetalhesEvento() {
  const route = useRoute();
  const navigation = useNavigation();

  // Recebendo os parâmetros enviados pela tela anterior (desafio do professor!)
  const { titulo, detalhes, data, valor, local, corDestaque } = route.params as any;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: corDestaque }]}>{titulo}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTexto}>📅 <Text style={styles.bold}>Data:</Text> {data}</Text>
        <Text style={styles.infoTexto}>📍 <Text style={styles.bold}>Local:</Text> {local}</Text>
        <Text style={styles.infoTexto}>💰 <Text style={styles.bold}>Valor:</Text> {valor}</Text>
      </View>

      <Text style={styles.detalhes}>{detalhes}</Text>

      <TouchableOpacity 
        style={[styles.botaoVoltar, { backgroundColor: corDestaque }]} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotao}>Voltar para a Lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#FFFFFF', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  infoContainer: { backgroundColor: '#F0F2F5', padding: 20, borderRadius: 8, marginBottom: 25 },
  infoTexto: { fontSize: 16, color: '#444', marginBottom: 10 },
  bold: { fontWeight: 'bold' },
  detalhes: { fontSize: 18, color: '#333', lineHeight: 28, marginBottom: 40, textAlign: 'justify' },
  botaoVoltar: { padding: 18, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});