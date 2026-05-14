import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { api } from '../../services/api';
// Se tiver criado o arquivo de types, descomente a linha abaixo
// import { Evento } from '../../types'; 

export default function MapScreen() {
    const [location, setLocation] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]); // Troque any[] por Evento[] se estiver usando a tipagem

    useEffect(() => {
        (async () => {
            // 1. Pede permissão de GPS
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                // 2. Pega a localização atual do usuário
                let loc = await Location.getCurrentPositionAsync({});
                setLocation(loc.coords);

                // 3. Busca eventos enviando a latitude e longitude (Ordena por proximidade!)
                const data = await api.getEvents('', '', `${loc.coords.latitude},${loc.coords.longitude}`);
                setEvents(data);
            } else {
                // Se o usuário recusar o GPS, busca eventos gerais
                const data = await api.getEvents();
                setEvents(data);
            }
        })();
    }, []);

    // Mostra um loading enquanto o GPS pensa (evita que o mapa abra no oceano ou trave)
    if (!location) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FF5722" />
                <Text style={{ marginTop: 10 }}>Buscando eventos próximos a você...</Text>
            </View>
        );
    }

    return (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: location.latitude,     // Agora o mapa centraliza no usuário!
                longitude: location.longitude,   // Agora o mapa centraliza no usuário!
                latitudeDelta: 0.09,
                longitudeDelta: 0.04,
            }}
            showsUserLocation={true} // Mostra aquela bolinha azul do usuário no mapa
        >
            {events.map((event: any) => {
                // Pega as coordenadas de forma segura
                const lat = event._embedded?.venues?.[0]?.location?.latitude;
                const lon = event._embedded?.venues?.[0]?.location?.longitude;

                // Se o evento não tiver coordenada cadastrada na API, a gente pula ele
                if (!lat || !lon) return null;

                return (
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: parseFloat(lat),
                            longitude: parseFloat(lon),
                        }}
                        title={event.name}
                        description={event._embedded?.venues?.[0]?.name || 'Local a confirmar'}
                    />
                );
            })}
        </MapView>
    );
}