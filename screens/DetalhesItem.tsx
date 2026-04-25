import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DetalhesItem() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { eventoId, titulo, desc } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
      <Text style={styles.id}>ID: {eventoId}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F8F9FA' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#007BFF', marginBottom: 12, textAlign: 'center' },
  id: { fontSize: 14, color: '#6C757D', marginBottom: 8 },
  desc: { fontSize: 16, color: '#212529', textAlign: 'center', marginBottom: 32 },
  button: { backgroundColor: '#007BFF', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 24 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
