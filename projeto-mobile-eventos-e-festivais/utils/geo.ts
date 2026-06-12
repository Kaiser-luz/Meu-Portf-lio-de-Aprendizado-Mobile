import type { Coordenadas, Evento } from '@/types/evento';

export const DEFAULT_LOCATION: Coordenadas = {
  latitude: -23.5505,
  longitude: -46.6333,
};

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calcularDistanciaKm(origem: Coordenadas, destino: Coordenadas) {
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(destino.latitude - origem.latitude);
  const deltaLon = toRadians(destino.longitude - origem.longitude);

  const lat1 = toRadians(origem.latitude);
  const lat2 = toRadians(destino.latitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export function ordenarPorProximidade(eventos: Evento[], origem: Coordenadas) {
  return [...eventos]
    .map((evento) => ({
      ...evento,
      distanciaKm: calcularDistanciaKm(origem, {
        latitude: evento.latitude,
        longitude: evento.longitude,
      }),
    }))
    .sort((a, b) => (a.distanciaKm ?? 0) - (b.distanciaKm ?? 0));
}

export function formatarDistancia(distanciaKm?: number) {
  if (distanciaKm === undefined || Number.isNaN(distanciaKm)) {
    return 'Distancia indisponivel';
  }

  if (distanciaKm < 1) {
    return `${Math.round(distanciaKm * 1000)} m de distancia`;
  }

  return `${distanciaKm.toFixed(1)} km de distancia`;
}
