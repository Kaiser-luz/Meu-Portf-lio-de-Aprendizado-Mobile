import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PontoTuristicoCard from '../../components/PontoTuristicoCard';

export default function HomeScreen() {
  const cards = [
    {
      titulo: 'Entrada no Evento',
      descricao:
        'A entrada no Tomorrowland é feita com pulseiras inteligentes. Curiosidade: elas funcionam como carteira digital.',
      cor: '#0A84FF',
    },
    {
      titulo: 'Palco Principal',
      descricao:
        'O palco principal é o destaque do festival. Curiosidade: ele muda completamente de tema todo ano.',
      cor: '#FF3B30',
    },
    {
      titulo: 'DJs Internacionais',
      descricao:
        'Grandes DJs se apresentam no evento. Curiosidade: muitos sets são exclusivos do festival.',
      cor: '#FFD60A',
    },
    {
      titulo: 'Experiência Visual',
      descricao:
        'Shows com luzes e efeitos incríveis. Curiosidade: o uso de lasers e fogos é um dos maiores do mundo.',
      cor: '#32D74B',
    },
    {
      titulo: 'DreamVille',
      descricao:
        'Área de camping oficial do evento. Curiosidade: funciona como uma cidade completa.',
      cor: '#0A84FF',
    },
    {
      titulo: 'Encerramento',
      descricao:
        'O final do festival é emocionante. Curiosidade: o show final é planejado como o maior espetáculo.',
      cor: '#FF3B30',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>
          Guia do Tomorrowland 🎧
        </Text>

        {cards.map((item, index) => (
          <PontoTuristicoCard
            key={index}
            titulo={item.titulo}
            descricao={item.descricao}
            cor={item.cor}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
  },

  header: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 25,
    marginLeft: 20,
  },
});