import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Evento = {
  id: string;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  cidade: string;
  estado: string;
  endereco: string;
  descricao: string;
  imagem: string;
  link: string;
};

export default function DetalhesItem() {
  const { evento } = useLocalSearchParams();

  if (!evento || typeof evento !== 'string') {
    return (
      <View style={styles.containerErro}>
        <Text style={styles.erro}>Detalhes do evento não encontrados.</Text>
        <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
          <Text style={styles.textoBotao}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const dados: Evento = JSON.parse(evento);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dados.imagem ? <Image source={{ uri: dados.imagem }} style={styles.imagem} /> : null}

      <View style={styles.card}>
        <Text style={styles.tag}>Detalhes do Evento</Text>
        <Text style={styles.titulo}>{dados.titulo}</Text>

        <Text style={styles.label}>ID</Text>
        <Text style={styles.valor}>{dados.id}</Text>

        <Text style={styles.label}>Data</Text>
        <Text style={styles.valor}>{dados.data}</Text>

        <Text style={styles.label}>Horário</Text>
        <Text style={styles.valor}>{dados.hora}</Text>

        <Text style={styles.label}>Local</Text>
        <Text style={styles.valor}>{dados.local}</Text>

        <Text style={styles.label}>Cidade</Text>
        <Text style={styles.valor}>{dados.cidade} - {dados.estado}</Text>

        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.valor}>{dados.endereco}</Text>

        <Text style={styles.subtitulo}>Sobre o evento</Text>
        <Text style={styles.descricao}>{dados.descricao}</Text>

        {dados.link ? (
          <TouchableOpacity style={styles.botaoIngresso} onPress={() => Linking.openURL(dados.link)}>
            <Text style={styles.textoBotao}>Ver ingressos</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity style={styles.botao} onPress={() => router.back()}>
          <Text style={styles.textoBotao}>Voltar para eventos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#0F172A',
  },
  containerErro: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  erro: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  imagem: {
    width: '100%',
    height: 220,
    borderRadius: 22,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#7C3AED',
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: 'bold',
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginTop: 3,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginTop: 22,
    marginBottom: 8,
  },
  descricao: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  botaoIngresso: {
    marginTop: 24,
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  botao: {
    marginTop: 14,
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});