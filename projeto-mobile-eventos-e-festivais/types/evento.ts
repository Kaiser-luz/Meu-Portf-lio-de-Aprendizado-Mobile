export type EventoCategoria = 'todos' | 'musica' | 'arte' | 'gastronomia' | 'esportes' | 'familia';

export type Coordenadas = {
  latitude: number;
  longitude: number;
};

export type Evento = {
  id: string;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  cidade: string;
  estado: string;
  endereco: string;
  descricao: string;
  imagem?: string;
  link?: string;
  categoria: EventoCategoria;
  latitude: number;
  longitude: number;
  origem: 'api' | 'usuario';
  remoteId?: string;
  distanciaKm?: number;
};

export type EventoFormData = Omit<Evento, 'id' | 'origem' | 'distanciaKm' | 'remoteId'>;

export type CategoriaOpcao = {
  key: EventoCategoria;
  label: string;
  ticketmasterClassification?: string;
  ticketmasterKeyword?: string;
};
