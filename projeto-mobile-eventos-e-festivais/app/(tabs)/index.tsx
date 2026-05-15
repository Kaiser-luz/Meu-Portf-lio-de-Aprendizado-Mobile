import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import ErrorMessage from '@/components/ErrorMessage';
import EventoCard from '@/components/EventoCard';
import Loading from '@/components/Loading';
import api from '@/services/api';

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

export default function HomeScreen() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function buscarEventos() {
      try {
        const response = await api.get('/events.json', {
          params: {
            apikey: 'q9uh0aSWLq7gVjJLRof6UeJ0B7oeafQm',
            countryCode: 'BR',
            classificationName: 'music',
            size: 10,
          },
        });

        const dadosAdaptados: Evento[] =
          response.data._embedded?.events?.map((item: any) => {
            const venue = item._embedded?.venues?.[0];

            return {
              id: item.id,
              titulo: item.name,
              data: item.dates?.start?.localDate || 'Data a confirmar',
              hora: item.dates?.start?.localTime || 'Horário a confirmar',
              local: venue?.name || 'Local não informado',
              cidade: venue?.city?.name || 'Cidade não informada',
              estado: venue?.state?.name || 'Estado não informado',
              endereco: venue?.address?.line1 || 'Endereço não informado',
              imagem: item.images?.[0]?.url || '',
              link: item.url || '',
              descricao:
                item.info ||
                item.pleaseNote ||
                `${item.name} acontecerá em ${venue?.city?.name || 'uma cidade especial'}, no local ${venue?.name || 'informado pela Ticketmaster'}. Confira data, local e mais detalhes deste evento musical.`,
            };
          }) || [];

        setEventos(dadosAdaptados);
      } catch (error) {
        setErro('Não foi possível carregar os eventos.');
      } finally {
        setIsLoading(false);
      }
    }

    buscarEventos();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (erro) {
    return <ErrorMessage mensagem={erro} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.tituloPrincipal}>Festivais no Brasil</Text>
        <Text style={styles.subtitulo}>
          Descubra shows, eventos e festivais a qualquer momento
        </Text>
      </View>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventoCard
            titulo={item.titulo}
            data={item.data}
            local={item.local}
            descricao={item.descricao}
            onPress={() =>
              router.push({
                pathname: '/detalhes-item',
                params: {
                  evento: JSON.stringify(item),
                },
              })
            }
          />
        )}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 50,
  },
  lista: {
    padding: 20,
    paddingBottom: 30,
  },
  topo: {
    backgroundColor: '#2563EB',
    borderRadius: 22,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#FACC15',
  },
  tituloPrincipal: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#DBEAFE',
    textAlign: 'center',
    lineHeight: 22,
  },
});