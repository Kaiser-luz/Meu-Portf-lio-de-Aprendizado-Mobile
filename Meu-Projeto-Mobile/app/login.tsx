import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

// Usuário fixo para simular autenticação
const USUARIO_VALIDO = { email: 'admin@eventos.com', senha: '123456' };

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [loading, setLoading] = useState(true);
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  useEffect(() => {
    verificarSessao();
  }, []);

  const verificarSessao = async () => {
    try {
      const sessao = await AsyncStorage.getItem('@sessao_usuario');
      if (sessao) {
        const dados = JSON.parse(sessao);
        setLogado(true);
        setNomeUsuario(dados.email);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }

    if (
      email.trim() === USUARIO_VALIDO.email &&
      senha.trim() === USUARIO_VALIDO.senha
    ) {
      const sessao = { email: email.trim() };
      await AsyncStorage.setItem('@sessao_usuario', JSON.stringify(sessao));
      setLogado(true);
      setNomeUsuario(email.trim());
    } else {
      Alert.alert('Erro', 'Email ou senha incorretos.\n\nUse:\nemail: admin@eventos.com\nsenha: 123456');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@sessao_usuario');
    setLogado(false);
    setEmail('');
    setSenha('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  if (logado) {
    return (
      <View style={styles.root}>
        <View style={styles.logadoContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={40} color="#FF6B35" />
          </View>
          <Text style={styles.logadoTitulo}>Olá!</Text>
          <Text style={styles.logadoEmail}>{nomeUsuario}</Text>
          <Text style={styles.logadoInfo}>
            Você está logado e pode criar, editar e excluir eventos na aba "Meus Eventos".
          </Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={18} color="#fff" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.form}>
        <Ionicons name="calendar" size={48} color="#FF6B35" style={styles.logo} />
        <Text style={styles.titulo}>Entrar</Text>
        <Text style={styles.subtitulo}>Faça login para gerenciar seus eventos</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.senhaRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="••••••"
            placeholderTextColor="#555"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
          />
          <TouchableOpacity
            style={styles.olhoBtn}
            onPress={() => setSenhaVisivel(!senhaVisivel)}
          >
            <Ionicons
              name={senhaVisivel ? 'eye-off' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.dica}>
          <Text style={styles.dicaText}>Email: admin@eventos.com</Text>
          <Text style={styles.dicaText}>Senha: 123456</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#13131F' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#13131F' },

  form: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
  },
  logo: { alignSelf: 'center', marginBottom: 16 },
  titulo: { color: '#F0EAD6', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 6 },
  subtitulo: { color: '#666', fontSize: 14, textAlign: 'center', marginBottom: 32 },

  label: { color: '#888', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' },
  input: {
    backgroundColor: '#1E1E2E',
    color: '#F0EAD6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2E2E3E',
  },
  senhaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  olhoBtn: { position: 'absolute', right: 14, padding: 4 },

  loginBtn: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  dica: {
    marginTop: 24,
    backgroundColor: '#1E1E2E',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2E2E3E',
  },
  dicaText: { color: '#666', fontSize: 13, textAlign: 'center' },

  // Logado
  logadoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 28 },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#1E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  logadoTitulo: { color: '#F0EAD6', fontSize: 26, fontWeight: 'bold', marginBottom: 4 },
  logadoEmail: { color: '#FF6B35', fontSize: 15, marginBottom: 20 },
  logadoInfo: { color: '#888', fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2E2E3E',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});