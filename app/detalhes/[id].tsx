import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

//import eventos from '../../dados';
import eventos from '../../dados';

// Tela 2 — DetalhesItem
// O nome do arquivo [id].tsx faz com que o Expo Router capture
// qualquer rota /detalhes/1, /detalhes/2, etc. como parâmetro "id"
export default function DetalhesItem() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Busca o evento completo usando o parâmetro recebido
  const evento = eventos.find((e) => e.id === id);

  if (!evento) {
    return (
      <View style={styles.root}>
        <Text style={styles.erro}>Evento não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Banner colorido com a cor do evento */}
        <View style={[styles.banner, { backgroundColor: evento.tagColor }]}>
          <View style={styles.tagBanner}>
            <Text style={styles.tagBannerText}>{evento.categoria}</Text>
          </View>
          <Text style={styles.bannerTitulo}>{evento.nome}</Text>
          {/* Exibe o parâmetro recebido pela rota — requisito da aula */}
          <Text style={styles.bannerIdLabel}>ID do evento: {id}</Text>
        </View>

        <View style={styles.corpo}>

          <Text style={styles.secaoTitulo}>Sobre o evento</Text>
          <Text style={styles.descricao}>{evento.descricao}</Text>

          <Text style={styles.secaoTitulo}>Informações</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoIcone}>📅</Text>
              <Text style={styles.infoLabel}>Data</Text>
              <Text style={styles.infoValor}>{evento.data}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoIcone}>🎟️</Text>
              <Text style={styles.infoLabel}>Ingresso</Text>
              <Text style={[styles.infoValor, { color: '#FF6B35' }]}>{evento.ingresso}</Text>
            </View>
          </View>

          <View style={styles.localCard}>
            <Text style={styles.infoIcone}>📍</Text>
            <View>
              <Text style={styles.infoLabel}>Local</Text>
              <Text style={styles.infoValor}>{evento.local}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoVoltarText}>← Voltar para a lista</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#13131F',
  },
  erro: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  banner: {
    paddingTop: 40,
    paddingBottom: 36,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  tagBanner: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
  },
  tagBannerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerTitulo: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 10,
  },
  bannerIdLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 11,
  },
  corpo: {
    padding: 24,
  },
  secaoTitulo: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 12,
  },
  descricao: {
    color: '#AAA',
    fontSize: 15,
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 16,
  },
  localCard: {
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    padding: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcone: {
    fontSize: 20,
    marginBottom: 8,
  },
  infoLabel: {
    color: '#666',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoValor: {
    color: '#F0EAD6',
    fontSize: 15,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    marginTop: 32,
    backgroundColor: '#1E1E2E',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E2E3E',
  },
  botaoVoltarText: {
    color: '#FF6B35',
    fontSize: 15,
    fontWeight: 'bold',
  },
});