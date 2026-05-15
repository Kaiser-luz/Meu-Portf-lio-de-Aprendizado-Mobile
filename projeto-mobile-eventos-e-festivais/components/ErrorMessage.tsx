import { StyleSheet, Text, View } from 'react-native';

type ErrorMessageProps = {
  mensagem: string;
};

export default function ErrorMessage({ mensagem }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b3d2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  texto: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});