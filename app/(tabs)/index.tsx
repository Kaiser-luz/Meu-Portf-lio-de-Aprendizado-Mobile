import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function Index() {

  const eventos = [
    {
      id: 1,
      titulo: 'Entrada no Evento',
      descricao: 'A entrada no Tomorrowland é feita com pulseiras inteligentes. Curiosidade: elas funcionam como carteira digital.',
      cor: '#1E90FF'
    },
    {
      id: 2,
      titulo: 'Palco Principal',
      descricao: 'O palco principal é o destaque do festival. Curiosidade: ele muda completamente de tema todo ano.',
      cor: '#FF3B30'
    },
    {
      id: 3,
      titulo: 'DJs Internacionais',
      descricao: 'Grandes DJs se apresentam no evento. Curiosidade: muitos sets são exclusivos do festival.',
      cor: '#FFD60A'
    },
    {
      id: 4,
      titulo: 'Experiência Visual',
      descricao: 'Shows com luzes e efeitos incríveis. Curiosidade: o uso de lasers e fogos é um dos maiores do mundo.',
      cor: '#34C759'
    },
    {
      id: 5,
      titulo: 'DreamVille',
      descricao: 'Área de camping oficial do evento. Curiosidade: funciona como uma cidade completa.',
      cor: '#1E90FF'
    },
    {
      id: 6,
      titulo: 'Encerramento',
      descricao: 'O final do festival é emocionante. Curiosidade: o show final é planejado como o maior espetáculo.',
      cor: '#FF3B30'
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        
        <Text style={styles.titulo}>Guia do Tomorrowland 🎧</Text>

        {eventos.map((item) => (
          <View key={item.id} style={[styles.card, { borderLeftColor: item.cor }]}>
            <Text style={[styles.cardTitulo, { color: item.cor }]}>
              {item.titulo}
            </Text>
            <Text style={styles.cardDescricao}>
              {item.descricao}
            </Text>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 6,
    elevation: 5,
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  cardDescricao: {
    color: '#ccc',
    fontSize: 14,
  },
});