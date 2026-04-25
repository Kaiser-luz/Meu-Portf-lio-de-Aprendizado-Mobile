import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


import eventos from '../dados';
import EventoCard from '@/constants/EventoCard';

// Tela 1 — ListaItens
// No Expo Router, app/index.tsx é automaticamente a tela inicial (rota "/")
export default function ListaItens() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>🗓  AGENDA</Text>
          <Text style={styles.headerTitulo}>Eventos & Festivais</Text>
          <Text style={styles.headerSub}>Curitiba · 2025</Text>
        </View>

        <Text style={styles.count}>{eventos.length} eventos encontrados</Text>

        {/* Lista dinâmica carregada a partir de dados.ts */}
        {eventos.map((evento) => (
          <EventoCard
            key={evento.id}
            evento={evento}
            // Navega para detalhes/[id] passando o ID como parâmetro de rota
            onPress={() => router.push({ pathname: '/detalhes/[id]', params: { id: evento.id } })}
          />
        ))}

        <Text style={styles.footer}>Meu Portfólio de Aprendizado Mobile 🚀</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#13131F',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#1A1A2E',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 8,
  },
  headerLabel: {
    color: '#FF6B35',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  headerTitulo: {
    color: '#F0EAD6',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerSub: {
    color: '#555',
    fontSize: 13,
    marginTop: 4,
  },
  count: {
    color: '#444',
    fontSize: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  footer: {
    textAlign: 'center',
    color: '#333',
    fontSize: 12,
    marginTop: 24,
  },
});