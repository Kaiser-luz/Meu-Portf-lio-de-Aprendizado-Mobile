import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

type Evento = {
  id: number;
  titulo: string;
  data: string;
  local: string;
  descricao: string;
};

export default function HomeScreen() {
  const eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Rock in Rio',
      data: '4, 5, 6, 7, 11, 12 e 13 de setembro de 2026',
      local: 'Cidade do Rock / Parque Olímpico, Rio de Janeiro - RJ',
      descricao:
        'O Rock in Rio é um dos maiores festivais de música do Brasil e do mundo. O evento reúne artistas nacionais e internacionais, grandes palcos e experiências temáticas para o público.',
    },
    {
      id: 2,
      titulo: 'Lollapalooza Brasil',
      data: '20, 21 e 22 de março de 2026',
      local: 'Autódromo de Interlagos, São Paulo - SP',
      descricao:
        'O Lollapalooza Brasil é um dos festivais mais conhecidos do país. Ele mistura estilos como rock, pop, rap, indie e eletrônico, reunindo grandes nomes da música nacional e internacional.',
    },
    {
      id: 3,
      titulo: 'The Town',
      data: '6, 7, 12, 13 e 14 de setembro',
      local: 'Autódromo de Interlagos, São Paulo - SP',
      descricao:
        'O The Town é um grande festival realizado em São Paulo, com estrutura inspirada em eventos internacionais. Ele reúne música, arte, cenários temáticos e atrações para públicos variados.',
    },
    {
      id: 4,
      titulo: 'João Rock',
      data: '14 de junho de 2025',
      local: 'Parque Permanente de Exposições, Ribeirão Preto - SP',
      descricao:
        'O João Rock é um festival importante da música brasileira, com foco em artistas nacionais. O evento reúne rock, rap, reggae, MPB e outros gêneros em uma grande celebração musical.',
    },
    {
      id: 5,
      titulo: 'Coala Festival',
      data: '12 e 13 de setembro de 2026',
      local: 'Memorial da América Latina, São Paulo - SP',
      descricao:
        'O Coala Festival valoriza a música brasileira e reúne artistas consagrados e novos nomes da cena nacional. É um evento muito ligado à diversidade e à riqueza cultural do Brasil.',
    },
    {
      id: 6,
      titulo: 'Festival de Verão Salvador',
      data: '24 e 25 de janeiro de 2026',
      local: 'Arena FV, Wet Eventos, Salvador - BA',
      descricao:
        'O Festival de Verão Salvador é um dos principais eventos musicais do país. Ele reúne grandes artistas brasileiros e mistura diferentes estilos, como axé, pop, pagode, sertanejo e MPB.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.tituloPrincipal}>Guia de Festivais de Música do Brasil</Text>
        <Text style={styles.subtitulo}>
          Conheça grandes eventos musicais brasileiros com data, local e descrição
        </Text>
      </View>

      {eventos.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/detalhes-item',
              params: {
                id: item.id,
                titulo: item.titulo,
                data: item.data,
                local: item.local,
                descricao: item.descricao,
              },
            })
          }
        >
          <Text style={styles.cardTitulo}>{item.titulo}</Text>
          <Text style={styles.cardInfo}>Data: {item.data}</Text>
          <Text style={styles.cardInfo}>Local: {item.local}</Text>
          <Text style={styles.cardDescricao}>{item.descricao}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#0b3d2e',
  },
  topo: {
    backgroundColor: '#4fc3f7',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#fdd835',
  },
  tituloPrincipal: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#c62828',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 15,
    color: '#0b3d2e',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderLeftWidth: 8,
    borderLeftColor: '#c62828',
    borderTopWidth: 3,
    borderTopColor: '#fdd835',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288d1',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#c62828',
    marginBottom: 4,
  },
  cardDescricao: {
    marginTop: 8,
    fontSize: 14,
    color: '#1b5e20',
    lineHeight: 22,
  },
});