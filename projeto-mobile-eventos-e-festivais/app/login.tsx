import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('aluno@eventos.com');
  const [senha, setSenha] = useState('123');
  const [erro, setErro] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setErro(null);
    setIsSubmitting(true);

    try {
      await login(email, senha);
      router.replace('/(tabs)/meus-eventos');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Nao foi possivel entrar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Entrar</Text>
        <Text style={styles.subtitulo}>
          Use qualquer e-mail e uma senha com pelo menos 3 caracteres para liberar o cadastro de eventos.
        </Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholder="Senha"
          placeholderTextColor="#94A3B8"
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          style={[styles.botao, isSubmitting && styles.botaoDesabilitado]}
          onPress={handleLogin}
          disabled={isSubmitting}>
          <Text style={styles.textoBotao}>{isSubmitting ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
  },
  titulo: {
    fontSize: 30,
    color: '#2563EB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 22,
  },
  label: {
    color: '#334155',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    color: '#0F172A',
    fontSize: 16,
  },
  erro: {
    color: '#DC2626',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    opacity: 0.65,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
  },
  textoVoltar: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
});
