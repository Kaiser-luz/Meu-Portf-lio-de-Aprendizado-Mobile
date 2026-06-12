import type { CategoriaOpcao } from '@/types/evento';

export const CATEGORIAS: CategoriaOpcao[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'musica', label: 'Musica', ticketmasterClassification: 'Music' },
  { key: 'arte', label: 'Arte', ticketmasterClassification: 'Arts & Theatre' },
  { key: 'gastronomia', label: 'Gastronomia', ticketmasterKeyword: 'gastronomia festival' },
  { key: 'esportes', label: 'Esportes', ticketmasterClassification: 'Sports' },
  { key: 'familia', label: 'Familia', ticketmasterClassification: 'Family' },
];

export const CATEGORIAS_SEM_TODOS = CATEGORIAS.filter((categoria) => categoria.key !== 'todos');

export function getCategoriaLabel(key: string) {
  return CATEGORIAS.find((categoria) => categoria.key === key)?.label ?? 'Evento';
}
