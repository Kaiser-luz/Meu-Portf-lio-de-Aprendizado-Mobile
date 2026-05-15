import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fdd835" />
      <Text style={styles.texto}>Carregando eventos...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b3d2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    marginTop: 12,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});