import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EVENTOS = [
  { id: '1', titulo: 'Rock in Rio', desc: 'O maior festival de música do mundo.' },
  { id: '2', titulo: 'Lollapalooza Brasil', desc: 'Festival de música alternativa.' },
  { id: '3', titulo: 'Tomorrowland Brasil', desc: 'O maior festival de eletrônica.' },
  { id: '4', titulo: 'Festa do Peão de Barretos', desc: 'Referência mundial em rodeio.' },
  { id: '5', titulo: 'Carnaval de Salvador', desc: 'A maior festa popular de rua do mundo.' },
];

export default function ListaItens() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Meu Portfólio: Eventos</Text>
      <FlatList
        data={EVENTOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('DetalhesItem', {
                eventoId: item.id,
                titulo: item.titulo,
                desc: item.desc,
              })
            }>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', paddingTop: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#212529' },
  card: { backgroundColor: '#FFF', borderRadius: 15, padding: 20, marginVertical: 10, marginHorizontal: 20, elevation: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#007BFF' },
  cardDesc: { fontSize: 14, color: '#6C757D', marginTop: 8 },
});
