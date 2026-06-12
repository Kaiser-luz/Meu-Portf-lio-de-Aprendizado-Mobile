import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { CATEGORIAS_SEM_TODOS } from '@/data/categorias';
import { useAuth } from '@/context/AuthContext';
import { useEventos } from '@/context/EventosContext';
import type { EventoCategoria, EventoFormData } from '@/types/evento';

function hojeIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function EventoFormScreen() {
  const { eventoId } = useLocalSearchParams();
  const { isAuthenticated } = useAuth();
  const { meusEventos, criarEvento, atualizarEvento, localizacao } = useEventos();

  const eventoIdString = typeof eventoId === 'string' ? eventoId : undefined;
  const eventoParaEditar = useMemo(
    () => meusEventos.find((evento) => evento.id === eventoIdString),
    [meusEventos, eventoIdString]
  );
  const isEditando = !!eventoIdString;

  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState(hojeIso());
  const [hora, setHora] = useState('19:00');
  const [local, setLocal] = useState('');
  const [cidade, setCidade] = useState('Sao Paulo');
  const [estado, setEstado] = useState('SP');
  const [endereco, setEndereco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [link, setLink] = useState('');
  const [categoria, setCategoria] = useState<EventoCategoria>('musica');
  const [latitude, setLatitude] = useState(String(localizacao.latitude));
  const [longitude, setLongitude] = useState(String(localizacao.longitude));
  const [erro, setErro] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eventoParaEditar) {
      setTitulo(eventoParaEditar.titulo);
      setData(eventoParaEditar.data);
      setHora(eventoParaEditar.hora);
      setLocal(eventoParaEditar.local);
      setCidade(eventoParaEditar.cidade);
      setEstado(eventoParaEditar.estado);
      setEndereco(eventoParaEditar.endereco);
      setDescricao(eventoParaEditar.descricao);
      setImagem(eventoParaEditar.imagem ?? '');
      setLink(eventoParaEditar.link ?? '');
      setCategoria(eventoParaEditar.categoria);
      setLatitude(String(eventoParaEditar.latitude));
      setLongitude(String(eventoParaEditar.longitude));
    }
  }, [eventoParaEditar]);

  if (!isAuthenticated) {
    return (
      <View style={styles.containerCentralizado}>
        <View style={styles.cardBloqueio}>
          <Text style={styles.tituloBloqueio}>Acesso restrito</Text>
          <Text style={styles.textoBloqueio}>Faca login para adicionar ou editar eventos.</Text>
          <TouchableOpacity style={styles.botaoPrimario} onPress={() => router.replace('/login')}>
            <Text style={styles.textoBotao}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const montarDados = (): EventoFormData => {
    const latitudeNumero = Number(latitude.replace(',', '.'));
    const longitudeNumero = Number(longitude.replace(',', '.'));

    if (!titulo.trim() || !data.trim() || !hora.trim() || !local.trim() || !cidade.trim()) {
      throw new Error('Preencha titulo, data, horario, local e cidade.');
    }

    if (Number.isNaN(latitudeNumero) || Number.isNaN(longitudeNumero)) {
      throw new Error('Latitude e longitude precisam ser numeros validos.');
    }

    return {
      titulo: titulo.trim(),
      data: data.trim(),
      hora: hora.trim(),
      local: local.trim(),
      cidade: cidade.trim(),
      estado: estado.trim() || 'UF',
      endereco: endereco.trim() || 'Endereco nao informado',
      descricao: descricao.trim() || 'Evento cadastrado pelo usuario.',
      imagem: imagem.trim(),
      link: link.trim(),
      categoria,
      latitude: latitudeNumero,
      longitude: longitudeNumero,
    };
  };

  const handleSubmit = async () => {
    setErro(null);
    setIsSubmitting(true);

    try {
      const dados = montarDados();

      if (isEditando && eventoIdString) {
        await atualizarEvento(eventoIdString, dados);
      } else {
        await criarEvento(dados);
      }

      router.replace('/(tabs)/meus-eventos');
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Nao foi possivel salvar o evento.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.titulo}>{isEditando ? 'Editar evento' : 'Adicionar evento'}</Text>
          <Text style={styles.subtitulo}>
            Os dados sao salvos localmente e a acao tambem dispara {isEditando ? 'PUT' : 'POST'} em uma API de demonstracao.
          </Text>

          <Campo label="Titulo" value={titulo} onChangeText={setTitulo} placeholder="Nome do evento" />
          <View style={styles.linha}>
            <Campo label="Data" value={data} onChangeText={setData} placeholder="AAAA-MM-DD" style={styles.campoLinha} />
            <Campo label="Horario" value={hora} onChangeText={setHora} placeholder="19:00" style={styles.campoLinha} />
          </View>
          <Campo label="Local" value={local} onChangeText={setLocal} placeholder="Nome do local" />
          <View style={styles.linha}>
            <Campo label="Cidade" value={cidade} onChangeText={setCidade} placeholder="Cidade" style={styles.campoLinha} />
            <Campo label="UF" value={estado} onChangeText={setEstado} placeholder="SP" style={styles.campoLinhaMenor} />
          </View>
          <Campo label="Endereco" value={endereco} onChangeText={setEndereco} placeholder="Rua, numero" />
          <Campo
            label="Descricao"
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descreva o evento"
            multiline
          />
          <Campo label="Imagem URL" value={imagem} onChangeText={setImagem} placeholder="https://..." />
          <Campo label="Link" value={link} onChangeText={setLink} placeholder="https://..." />

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoriasWrap}>
            {CATEGORIAS_SEM_TODOS.map((item) => {
              const selected = categoria === item.key;

              return (
                <TouchableOpacity
                  key={item.key}
                  style={[styles.categoriaBotao, selected && styles.categoriaBotaoAtivo]}
                  onPress={() => setCategoria(item.key)}>
                  <Text style={[styles.categoriaTexto, selected && styles.categoriaTextoAtivo]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.linha}>
            <Campo
              label="Latitude"
              value={latitude}
              onChangeText={setLatitude}
              placeholder="-23.5505"
              keyboardType="numeric"
              style={styles.campoLinha}
            />
            <Campo
              label="Longitude"
              value={longitude}
              onChangeText={setLongitude}
              placeholder="-46.6333"
              keyboardType="numeric"
              style={styles.campoLinha}
            />
          </View>

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          <TouchableOpacity
            style={[styles.botaoPrimario, isSubmitting && styles.botaoDesabilitado]}
            onPress={handleSubmit}
            disabled={isSubmitting}>
            <Text style={styles.textoBotao}>{isSubmitting ? 'Salvando...' : 'Salvar evento'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
            <Text style={styles.textoVoltar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type CampoProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  style?: object;
};

function Campo({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  style,
}: CampoProps) {
  return (
    <View style={[styles.campoContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 34,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
  },
  titulo: {
    fontSize: 29,
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
  linha: {
    flexDirection: 'row',
    gap: 12,
  },
  campoContainer: {
    marginBottom: 14,
  },
  campoLinha: {
    flex: 1,
  },
  campoLinhaMenor: {
    width: 90,
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
    color: '#0F172A',
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  categoriasWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  categoriaBotao: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
  },
  categoriaBotaoAtivo: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  categoriaTexto: {
    color: '#334155',
    fontWeight: 'bold',
  },
  categoriaTextoAtivo: {
    color: '#FFFFFF',
  },
  erro: {
    color: '#DC2626',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  botaoPrimario: {
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
  containerCentralizado: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardBloqueio: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  tituloBloqueio: {
    fontSize: 25,
    color: '#2563EB',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoBloqueio: {
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },
});
