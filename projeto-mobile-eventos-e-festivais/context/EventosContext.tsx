import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { CATEGORIAS_SEM_TODOS } from '@/data/categorias';
import { EVENTOS_FALLBACK } from '@/data/eventosFallback';
import api, { crudApi, TICKETMASTER_API_KEY } from '@/services/api';
import type { Coordenadas, Evento, EventoCategoria, EventoFormData } from '@/types/evento';
import { DEFAULT_LOCATION, ordenarPorProximidade } from '@/utils/geo';
import { useAuth } from './AuthContext';

type EventosContextValue = {
  eventos: Evento[];
  eventosApi: Evento[];
  meusEventos: Evento[];
  eventosComInteresse: Evento[];
  interesseIds: string[];
  isLoadingEventos: boolean;
  erroEventos: string | null;
  localizacao: Coordenadas;
  localizacaoReal: boolean;
  erroLocalizacao: string | null;
  ultimoCrudStatus: string | null;
  refreshEventos: () => Promise<void>;
  alternarInteresse: (eventoId: string) => Promise<void>;
  isInteresse: (eventoId: string) => boolean;
  criarEvento: (dados: EventoFormData) => Promise<Evento>;
  atualizarEvento: (eventoId: string, dados: EventoFormData) => Promise<void>;
  removerEvento: (eventoId: string) => Promise<void>;
  limparUltimoCrudStatus: () => void;
};

const MEUS_EVENTOS_KEY = '@EventosFestivais:meus-eventos';
const INTERESSES_KEY = '@EventosFestivais:interesses';
const EventosContext = createContext<EventosContextValue | undefined>(undefined);

function safeText(value: unknown, fallback: string) {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  return fallback;
}

function coordenadaFallback(index: number): Coordenadas {
  const baseLat = DEFAULT_LOCATION.latitude;
  const baseLon = DEFAULT_LOCATION.longitude;
  const offsetLat = ((index % 7) - 3) * 0.018;
  const offsetLon = ((index % 5) - 2) * 0.022;

  return {
    latitude: baseLat + offsetLat,
    longitude: baseLon + offsetLon,
  };
}

function adaptarEventoTicketmaster(item: any, categoria: EventoCategoria, index: number): Evento {
  const venue = item?._embedded?.venues?.[0];
  const fallbackCoords = coordenadaFallback(index);
  const latitude = Number(venue?.location?.latitude ?? fallbackCoords.latitude);
  const longitude = Number(venue?.location?.longitude ?? fallbackCoords.longitude);
  const imagem = Array.isArray(item?.images)
    ? item.images.sort((a: any, b: any) => (b?.width ?? 0) - (a?.width ?? 0))[0]?.url
    : '';

  return {
    id: String(item?.id ?? `api-${categoria}-${index}`),
    titulo: safeText(item?.name, 'Evento sem titulo'),
    data: safeText(item?.dates?.start?.localDate, 'Data a confirmar'),
    hora: safeText(item?.dates?.start?.localTime, 'Horario a confirmar'),
    local: safeText(venue?.name, 'Local nao informado'),
    cidade: safeText(venue?.city?.name, 'Cidade nao informada'),
    estado: safeText(venue?.state?.name ?? venue?.country?.countryCode, 'UF'),
    endereco: safeText(venue?.address?.line1, 'Endereco nao informado'),
    descricao:
      safeText(item?.info, '') ||
      safeText(item?.pleaseNote, '') ||
      `${safeText(item?.name, 'Este evento')} acontecera em ${safeText(
        venue?.city?.name,
        'uma cidade do Brasil'
      )}. Confira data, local e detalhes na tela do evento.`,
    imagem: imagem || '',
    link: safeText(item?.url, ''),
    categoria,
    latitude,
    longitude,
    origem: 'api',
  };
}

export function EventosProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [eventosApi, setEventosApi] = useState<Evento[]>([]);
  const [meusEventos, setMeusEventos] = useState<Evento[]>([]);
  const [interesseIds, setInteresseIds] = useState<string[]>([]);
  const [isLoadingEventos, setIsLoadingEventos] = useState(true);
  const [erroEventos, setErroEventos] = useState<string | null>(null);
  const [localizacao, setLocalizacao] = useState<Coordenadas>(DEFAULT_LOCATION);
  const [localizacaoReal, setLocalizacaoReal] = useState(false);
  const [erroLocalizacao, setErroLocalizacao] = useState<string | null>(null);
  const [ultimoCrudStatus, setUltimoCrudStatus] = useState<string | null>(null);

  const carregarLocalizacao = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLocalizacao(DEFAULT_LOCATION);
        setLocalizacaoReal(false);
        setErroLocalizacao('Permissao de localizacao negada. Usando Sao Paulo como ponto de referencia.');
        return;
      }

      const position = await Location.getCurrentPositionAsync({});
      setLocalizacao({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLocalizacaoReal(true);
      setErroLocalizacao(null);
    } catch (error) {
      setLocalizacao(DEFAULT_LOCATION);
      setLocalizacaoReal(false);
      setErroLocalizacao('Nao foi possivel obter a localizacao. Usando Sao Paulo como ponto de referencia.');
    }
  }, []);

  const carregarDadosLocais = useCallback(async () => {
    try {
      const [meusEventosSalvos, interessesSalvos] = await Promise.all([
        AsyncStorage.getItem(MEUS_EVENTOS_KEY),
        AsyncStorage.getItem(INTERESSES_KEY),
      ]);

      if (meusEventosSalvos) {
        setMeusEventos(JSON.parse(meusEventosSalvos));
      }

      if (interessesSalvos) {
        setInteresseIds(JSON.parse(interessesSalvos));
      }
    } catch (error) {
      console.warn('Erro ao carregar dados locais.', error);
    }
  }, []);

  const salvarMeusEventos = useCallback(async (eventosAtualizados: Evento[]) => {
    setMeusEventos(eventosAtualizados);
    await AsyncStorage.setItem(MEUS_EVENTOS_KEY, JSON.stringify(eventosAtualizados));
  }, []);

  const salvarInteresses = useCallback(async (ids: string[]) => {
    setInteresseIds(ids);
    await AsyncStorage.setItem(INTERESSES_KEY, JSON.stringify(ids));
  }, []);

  const refreshEventos = useCallback(async () => {
    setIsLoadingEventos(true);
    setErroEventos(null);

    try {
      const requisicoes = CATEGORIAS_SEM_TODOS.map(async (categoria) => {
        const response = await api.get('/events.json', {
          params: {
            apikey: TICKETMASTER_API_KEY,
            countryCode: 'BR',
            size: 8,
            sort: 'date,asc',
            classificationName: categoria.ticketmasterClassification,
            keyword: categoria.ticketmasterKeyword,
          },
        });

        const events = response.data?._embedded?.events ?? [];
        return events.map((item: any, index: number) =>
          adaptarEventoTicketmaster(item, categoria.key, index)
        );
      });

      const resultados = await Promise.allSettled(requisicoes);
      const eventosExternos = resultados.flatMap((resultado) =>
        resultado.status === 'fulfilled' ? resultado.value : []
      );
      const eventosUnicos = Array.from(new Map(eventosExternos.map((evento) => [evento.id, evento])).values());

      if (eventosUnicos.length === 0) {
        setEventosApi(EVENTOS_FALLBACK);
        setErroEventos('A API externa nao retornou eventos agora. Usei dados demonstrativos para manter o app testavel.');
      } else {
        setEventosApi(eventosUnicos);
      }
    } catch (error) {
      setEventosApi(EVENTOS_FALLBACK);
      setErroEventos('Nao foi possivel carregar a API externa. Usei dados demonstrativos para manter o app testavel.');
    } finally {
      setIsLoadingEventos(false);
    }
  }, []);

  useEffect(() => {
    carregarDadosLocais();
    carregarLocalizacao();
    refreshEventos();
  }, [carregarDadosLocais, carregarLocalizacao, refreshEventos]);

  const eventos = useMemo(() => {
    return ordenarPorProximidade([...eventosApi, ...meusEventos], localizacao);
  }, [eventosApi, meusEventos, localizacao]);

  const eventosComInteresse = useMemo(() => {
    return eventos.filter((evento) => interesseIds.includes(evento.id));
  }, [eventos, interesseIds]);

  const isInteresse = useCallback(
    (eventoId: string) => interesseIds.includes(eventoId),
    [interesseIds]
  );

  const alternarInteresse = useCallback(
    async (eventoId: string) => {
      const atualizados = interesseIds.includes(eventoId)
        ? interesseIds.filter((id) => id !== eventoId)
        : [...interesseIds, eventoId];

      await salvarInteresses(atualizados);
    },
    [interesseIds, salvarInteresses]
  );

  const criarEvento = useCallback(
    async (dados: EventoFormData) => {
      if (!isAuthenticated) {
        throw new Error('Voce precisa estar logado para adicionar eventos.');
      }

      let remoteId: string | undefined;

      try {
        const response = await crudApi.post('/posts', dados);
        remoteId = response.data?.id ? String(response.data.id) : undefined;
        setUltimoCrudStatus('POST enviado com sucesso para a API de demonstracao.');
      } catch (error) {
        setUltimoCrudStatus('POST falhou na API externa, mas o evento foi salvo localmente.');
      }

      const novoEvento: Evento = {
        ...dados,
        id: `meu-${Date.now()}`,
        origem: 'usuario',
        remoteId,
      };

      await salvarMeusEventos([novoEvento, ...meusEventos]);
      return novoEvento;
    },
    [isAuthenticated, meusEventos, salvarMeusEventos]
  );

  const atualizarEvento = useCallback(
    async (eventoId: string, dados: EventoFormData) => {
      if (!isAuthenticated) {
        throw new Error('Voce precisa estar logado para editar eventos.');
      }

      const eventoAtual = meusEventos.find((evento) => evento.id === eventoId);

      if (!eventoAtual) {
        throw new Error('Evento proprio nao encontrado.');
      }

      try {
        await crudApi.put(`/posts/${eventoAtual.remoteId ?? 1}`, dados);
        setUltimoCrudStatus('PUT enviado com sucesso para a API de demonstracao.');
      } catch (error) {
        setUltimoCrudStatus('PUT falhou na API externa, mas o evento foi atualizado localmente.');
      }

      const atualizados = meusEventos.map((evento) =>
        evento.id === eventoId
          ? {
              ...evento,
              ...dados,
            }
          : evento
      );

      await salvarMeusEventos(atualizados);
    },
    [isAuthenticated, meusEventos, salvarMeusEventos]
  );

  const removerEvento = useCallback(
    async (eventoId: string) => {
      if (!isAuthenticated) {
        throw new Error('Voce precisa estar logado para excluir eventos.');
      }

      const eventoAtual = meusEventos.find((evento) => evento.id === eventoId);

      if (!eventoAtual) {
        throw new Error('Evento proprio nao encontrado.');
      }

      try {
        await crudApi.delete(`/posts/${eventoAtual.remoteId ?? 1}`);
        setUltimoCrudStatus('DELETE enviado com sucesso para a API de demonstracao.');
      } catch (error) {
        setUltimoCrudStatus('DELETE falhou na API externa, mas o evento foi removido localmente.');
      }

      await salvarMeusEventos(meusEventos.filter((evento) => evento.id !== eventoId));
      if (interesseIds.includes(eventoId)) {
        await salvarInteresses(interesseIds.filter((id) => id !== eventoId));
      }
    },
    [isAuthenticated, meusEventos, interesseIds, salvarMeusEventos, salvarInteresses]
  );

  const limparUltimoCrudStatus = useCallback(() => {
    setUltimoCrudStatus(null);
  }, []);

  const value = useMemo(
    () => ({
      eventos,
      eventosApi,
      meusEventos,
      eventosComInteresse,
      interesseIds,
      isLoadingEventos,
      erroEventos,
      localizacao,
      localizacaoReal,
      erroLocalizacao,
      ultimoCrudStatus,
      refreshEventos,
      alternarInteresse,
      isInteresse,
      criarEvento,
      atualizarEvento,
      removerEvento,
      limparUltimoCrudStatus,
    }),
    [
      eventos,
      eventosApi,
      meusEventos,
      eventosComInteresse,
      interesseIds,
      isLoadingEventos,
      erroEventos,
      localizacao,
      localizacaoReal,
      erroLocalizacao,
      ultimoCrudStatus,
      refreshEventos,
      alternarInteresse,
      isInteresse,
      criarEvento,
      atualizarEvento,
      removerEvento,
      limparUltimoCrudStatus,
    ]
  );

  return <EventosContext.Provider value={value}>{children}</EventosContext.Provider>;
}

export function useEventos() {
  const context = useContext(EventosContext);

  if (!context) {
    throw new Error('useEventos deve ser usado dentro de EventosProvider.');
  }

  return context;
}
