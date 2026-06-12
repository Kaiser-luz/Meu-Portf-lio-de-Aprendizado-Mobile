import { router } from 'expo-router';
import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getCategoriaLabel } from '@/data/categorias';
import { useEventos } from '@/context/EventosContext';
import { formatarDistancia } from '@/utils/geo';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mapas = Platform.OS === 'web' ? null : require('react-native-maps');
const MapView = mapas?.default;
const Marker = mapas?.Marker;
const Callout = mapas?.Callout;

export default function MapaScreen() {
  const { eventos, localizacao, erroLocalizacao } = useEventos();

  if (Platform.OS === 'web' || !MapView || !Marker || !Callout) {
    return (
      <View style={styles.container}>
        <View style={styles.topo}>
          <Text style={styles.tituloPrincipal}>Mapa dos Eventos</Text>
          <Text style={styles.subtitulo}>
            No navegador web, o mapa nativo e substituido por uma lista com coordenadas.
          </Text>
        </View>
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaFallback}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardFallback}
              onPress={() =>
                router.push({
                  pathname: '/detalhes-item',
                  params: { eventoId: item.id },
                })
              }>
              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardTexto}>{item.local} - {item.cidade}</Text>
              <Text style={styles.cardTexto}>{item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}</Text>
              <Text style={styles.cardTexto}>{formatarDistancia(item.distanciaKm)}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topoMapa}>
        <Text style={styles.tituloMapa}>Mapa dos Eventos</Text>
        <Text style={styles.subtituloMapa}>
          Toque em um marcador para ver detalhes. {erroLocalizacao ? erroLocalizacao : ''}
        </Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: localizacao.latitude,
          longitude: localizacao.longitude,
          latitudeDelta: 0.22,
          longitudeDelta: 0.22,
        }}
        showsUserLocation>
        {eventos.map((evento) => (
          <Marker
            key={evento.id}
            coordinate={{ latitude: evento.latitude, longitude: evento.longitude }}
            title={evento.titulo}
            description={evento.local}>
            <Callout
              onPress={() =>
                router.push({
                  pathname: '/detalhes-item',
                  params: { eventoId: evento.id },
                })
              }>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutCategoria}>{getCategoriaLabel(evento.categoria)}</Text>
                <Text style={styles.calloutTitle}>{evento.titulo}</Text>
                <Text style={styles.calloutDescription}>{evento.local}</Text>
                <Text style={styles.calloutDescription}>{formatarDistancia(evento.distanciaKm)}</Text>
                <Text style={styles.calloutLink}>Ver detalhes</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  map: {
    flex: 1,
  },
  topoMapa: {
    position: 'absolute',
    zIndex: 10,
    top: 48,
    left: 18,
    right: 18,
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FACC15',
  },
  tituloMapa: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtituloMapa: {
    marginTop: 6,
    color: '#CBD5E1',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 17,
  },
  calloutContainer: {
    width: 190,
    padding: 6,
  },
  calloutCategoria: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#0F172A',
  },
  calloutDescription: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 3,
  },
  calloutLink: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  topo: {
    backgroundColor: '#2563EB',
    borderRadius: 22,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#FACC15',
  },
  tituloPrincipal: {
    fontSize: 30,
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
  listaFallback: {
    padding: 20,
    paddingBottom: 90,
  },
  cardFallback: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  cardTitulo: {
    fontSize: 18,
    color: '#2563EB',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTexto: {
    color: '#334155',
    fontSize: 14,
    marginBottom: 4,
  },
});
