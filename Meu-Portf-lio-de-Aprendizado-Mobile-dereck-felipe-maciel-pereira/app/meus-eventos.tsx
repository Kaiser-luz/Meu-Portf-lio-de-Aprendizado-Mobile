import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Evento } from '../dados';
import api from '../services/api';

const FORM_VAZIO = {
  nome: '', descricao: '', categoria: '',
  data: '', local: '', ingresso: '',
  latitude: '', longitude: '',
};

export default function MeusEventos() {
  const [logado, setLogado] = useState(false);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [eventoParaExcluir, setEventoParaExcluir] = useState<Evento | null>(null);
  const [editando, setEditando] = useState<Evento | null>(null);
  const [form, setForm] = useState(FORM_VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  useFocusEffect(
    useCallback(() => {
      verificarSessao();
    }, [])
  );

  const verificarSessao = async () => {
    const sessao = await AsyncStorage.getItem('@sessao_usuario');
    if (sessao) {
      setLogado(true);
      fetchEventos();
    } else {
      setLogado(false);
      setIsLoading(false);
    }
  };

  const fetchEventos = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/eventos');
      setEventos(response.data);
    } catch {
      // silencioso
    } finally {
      setIsLoading(false);
    }
  };

  const abrirCriar = () => {
    setEditando(null);
    setForm(FORM_VAZIO);
    setModalVisivel(true);
  };

  const abrirEditar = (evento: Evento) => {
    setEditando(evento);
    setForm({
      nome: evento.nome,
      descricao: evento.descricao,
      categoria: evento.categoria,
      data: evento.data,
      local: evento.local,
      ingresso: evento.ingresso,
      latitude: evento.latitude,
      longitude: evento.longitude,
    });
    setModalVisivel(true);
  };

  const salvar = async () => {
    if (!form.nome.trim() || !form.descricao.trim()) return;
    try {
      setSalvando(true);
      if (editando) {
        await api.put(`/eventos/${editando.id}`, form);
      } else {
        await api.post('/eventos', form);
      }
      setModalVisivel(false);
      fetchEventos();
    } catch {
      // silencioso
    } finally {
      setSalvando(false);
    }
  };

  const pedirConfirmacaoExcluir = (evento: Evento) => {
    setEventoParaExcluir(evento);
    setModalConfirmar(true);
  };

  const confirmarExcluir = async () => {
    if (!eventoParaExcluir) return;
    try {
      setExcluindo(true);
      await api.delete(`/eventos/${eventoParaExcluir.id}`);
      setModalConfirmar(false);
      setEventoParaExcluir(null);
      fetchEventos();
    } catch {
      // silencioso
    } finally {
      setExcluindo(false);
    }
  };

  if (!logado) {
    return (
      <View style={styles.bloqueio}>
        <Ionicons name="lock-closed" size={56} color="#2E2E3E" />
        <Text style={styles.bloqueioTitulo}>Acesso restrito</Text>
        <Text style={styles.bloqueioSub}>
          Faça login na aba "Login" para criar, editar e excluir eventos.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <TouchableOpacity style={styles.criarBtn} onPress={abrirCriar}>
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.criarText}>Novo Evento</Text>
          </TouchableOpacity>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum evento ainda.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemNome} numberOfLines={1}>{item.nome}</Text>
              <Text style={styles.itemLocal} numberOfLines={1}>📍 {item.local}</Text>
            </View>
            <View style={styles.itemAcoes}>
              <TouchableOpacity style={styles.editBtn} onPress={() => abrirEditar(item)}>
                <Ionicons name="pencil" size={16} color="#00BCD4" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => pedirConfirmacaoExcluir(item)}>
                <Ionicons name="trash" size={16} color="#E24B4A" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal confirmação excluir */}
      <Modal visible={modalConfirmar} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.confirmarBox}>
            <Ionicons name="warning-outline" size={36} color="#E24B4A" style={{ marginBottom: 12 }} />
            <Text style={styles.confirmarTitulo}>Excluir evento?</Text>
            <Text style={styles.confirmarSub} numberOfLines={2}>
              "{eventoParaExcluir?.nome}"
            </Text>
            <View style={styles.confirmarBtns}>
              <TouchableOpacity
                style={styles.cancelarBtn}
                onPress={() => { setModalConfirmar(false); setEventoParaExcluir(null); }}
              >
                <Text style={styles.cancelarText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.excluirBtn, excluindo && { opacity: 0.6 }]}
                onPress={confirmarExcluir}
                disabled={excluindo}
              >
                {excluindo
                  ? <ActivityIndicator color="#fff" size="small" />
                  : <Text style={styles.excluirText}>Excluir</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal criar / editar */}
      <Modal visible={modalVisivel} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitulo}>
              {editando ? 'Editar Evento' : 'Novo Evento'}
            </Text>
            <TouchableOpacity onPress={() => setModalVisivel(false)}>
              <Ionicons name="close" size={24} color="#F0EAD6" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalForm}>
            {([
              { label: 'Nome *', key: 'nome', placeholder: 'Nome do evento' },
              { label: 'Descrição *', key: 'descricao', placeholder: 'Descrição do evento' },
              { label: 'Categoria', key: 'categoria', placeholder: 'Ex: Música, Arte...' },
              { label: 'Data', key: 'data', placeholder: 'Ex: 12 Jul 2025' },
              { label: 'Local', key: 'local', placeholder: 'Ex: Curitiba, PR' },
              { label: 'Ingresso', key: 'ingresso', placeholder: 'Ex: R$ 50 ou Grátis' },
              { label: 'Latitude', key: 'latitude', placeholder: 'Ex: -25.4284' },
              { label: 'Longitude', key: 'longitude', placeholder: 'Ex: -49.2733' },
            ] as { label: string; key: keyof typeof FORM_VAZIO; placeholder: string }[]).map((campo) => (
              <View key={campo.key} style={styles.campoContainer}>
                <Text style={styles.campoLabel}>{campo.label}</Text>
                <TextInput
                  style={[styles.campoInput, campo.key === 'descricao' && { height: 80 }]}
                  placeholder={campo.placeholder}
                  placeholderTextColor="#555"
                  value={form[campo.key]}
                  onChangeText={(v) => setForm({ ...form, [campo.key]: v })}
                  multiline={campo.key === 'descricao'}
                />
              </View>
            ))}

            <TouchableOpacity
              style={[styles.salvarBtn, salvando && { opacity: 0.6 }]}
              onPress={salvar}
              disabled={salvando}
            >
              {salvando
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.salvarText}>{editando ? 'Salvar alterações' : 'Criar evento'}</Text>
              }
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#13131F' },
  listContent: { padding: 16, paddingBottom: 40 },

  criarBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FF6B35', borderRadius: 12,
    paddingVertical: 14, justifyContent: 'center', marginBottom: 16,
  },
  criarText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },

  itemCard: {
    backgroundColor: '#1E1E2E', borderRadius: 12, padding: 14,
    marginBottom: 10, flexDirection: 'row', alignItems: 'center',
  },
  itemInfo: { flex: 1 },
  itemNome: { color: '#F0EAD6', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  itemLocal: { color: '#777', fontSize: 12 },
  itemAcoes: { flexDirection: 'row', gap: 8 },
  editBtn: { backgroundColor: '#1A2E3E', padding: 8, borderRadius: 8 },
  deleteBtn: { backgroundColor: '#2E1A1A', padding: 8, borderRadius: 8 },

  emptyText: { color: '#555', textAlign: 'center', marginTop: 40 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#13131F' },

  bloqueio: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#13131F', padding: 32 },
  bloqueioTitulo: { color: '#F0EAD6', fontSize: 20, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  bloqueioSub: { color: '#666', fontSize: 14, textAlign: 'center', lineHeight: 22 },

  // Modal confirmação
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center', alignItems: 'center', padding: 32,
  },
  confirmarBox: {
    backgroundColor: '#1E1E2E', borderRadius: 20, padding: 28,
    alignItems: 'center', width: '100%', maxWidth: 340,
    borderWidth: 1, borderColor: '#2E2E3E',
  },
  confirmarTitulo: { color: '#F0EAD6', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  confirmarSub: { color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 24 },
  confirmarBtns: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelarBtn: {
    flex: 1, backgroundColor: '#2E2E3E', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  cancelarText: { color: '#F0EAD6', fontWeight: 'bold' },
  excluirBtn: {
    flex: 1, backgroundColor: '#E24B4A', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  excluirText: { color: '#fff', fontWeight: 'bold' },

  // Modal criar/editar
  modal: { flex: 1, backgroundColor: '#13131F' },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, backgroundColor: '#1A1A2E',
    borderBottomWidth: 1, borderBottomColor: '#2E2E3E',
  },
  modalTitulo: { color: '#F0EAD6', fontSize: 18, fontWeight: 'bold' },
  modalForm: { padding: 20 },

  campoContainer: { marginBottom: 16 },
  campoLabel: { color: '#888', fontSize: 11, fontWeight: 'bold', letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' },
  campoInput: {
    backgroundColor: '#1E1E2E', color: '#F0EAD6', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 14,
    borderWidth: 1, borderColor: '#2E2E3E',
  },
  salvarBtn: {
    backgroundColor: '#FF6B35', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center', marginTop: 8,
  },
  salvarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});