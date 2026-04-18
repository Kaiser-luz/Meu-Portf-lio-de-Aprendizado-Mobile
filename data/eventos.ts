export interface EventoFestival {
  id: string;
  titulo: string;
  resumo: string;
  detalhes: string;
  data: string;      // Novo campo
  valor: string;     // Novo campo
  local: string;     // Novo campo
  corDestaque: string; 
}

export const EVENTOS: EventoFestival[] = [
  { 
    id: '1', 
    titulo: 'Tomorrowland (Bélgica)', 
    resumo: 'Guia de Sobrevivência: DreamVille.',
    detalhes: 'Chegue cedo para o acampamento. Leve barraca impermeável e roupas para frio intenso na madrugada.',
    data: '18 a 27 de Julho de 2025',
    valor: 'A partir de € 125 (Day Pass)',
    local: 'Boom, Bélgica',
    corDestaque: '#8A1538' 
  },
  { 
    id: '2', 
    titulo: 'Rock in Rio (Brasil)', 
    resumo: 'Manual da Cidade do Rock.',
    detalhes: 'Agende os brinquedos pelo app oficial logo na entrada. Mantenha o foco na hidratação constante.',
    data: 'Setembro de 2024',
    valor: 'R$ 795 (Inteira)',
    local: 'Parque Olímpico, RJ',
    corDestaque: '#29B6F6' 
  },
  { 
    id: '3', 
    titulo: 'Lollapalooza Brasil', 
    resumo: 'Dicas para o Autódromo.',
    detalhes: 'O clima de SP é imprevisível. Capa de chuva e calçados confortáveis são itens obrigatórios.',
    data: '28 a 30 de Março de 2025',
    valor: 'R$ 1.000 a R$ 4.000',
    local: 'Autódromo de Interlagos, SP',
    corDestaque: '#FBC02D' 
  },
  { 
    id: '4', 
    titulo: 'The Town', 
    resumo: 'Logística de transporte.',
    detalhes: 'Use o trem expresso. Cadastre seu cartão na pulseira com antecedência para evitar filas de comida.',
    data: 'Setembro de 2025',
    valor: R$ 815 (Inteira)',
    local: 'Interlagos, SP',
    corDestaque: '#388E3C' 
  },
  { 
    id: '5', 
    titulo: 'Show no Allianz Parque', 
    resumo: 'Dicas para Estádios.',
    detalhes: 'Pista Premium para ver de perto ou Cadeira Inferior para conforto. Saída rápida via Metrô Barra Funda.',
    data: 'Variável (Conforme Tour)',
    valor: 'R$ 450 a R$ 1.200',
    local: 'Allianz Parque, SP',
    corDestaque: '#8A1538' 
  },
  { 
    id: '6', 
    titulo: 'Ultra Music Festival', 
    resumo: 'Foco em Música Eletrônica.',
    detalhes: 'Festival urbano com foco em tecnologia e os maiores nomes do EDM mundial.',
    data: 'Março de 2025',
    valor: 'US$ 350 (3-Day Pass)',
    local: 'Bayfront Park, Miami',
    corDestaque: '#29B6F6' 
  },
];