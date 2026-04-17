export interface EventoFestival {
  id: string;
  titulo: string;
  resumo: string;
  detalhes: string;
  corDestaque: string; 
}

export const EVENTOS: EventoFestival[] = [
  { 
    id: '1', 
    titulo: 'Guia Tomorrowland: DreamVille', 
    resumo: 'Como sobreviver ao acampamento na Bélgica.',
    detalhes: 'Chegue na quinta-feira cedo para garantir um bom lugar no acampamento. Leve barraca impermeável e roupas térmicas: apesar de ser verão europeu, as madrugadas em Boom são muito frias e frequentemente chuvosas.',
    corDestaque: '#D32F2F' // Vermelho
  },
  { 
    id: '2', 
    titulo: 'Rotas da Tomorrowland', 
    resumo: 'Estratégia para não perder seus DJs favoritos.',
    detalhes: 'Baixe o app oficial e monte sua grade de horários offline. O parque é gigantesco! Calcule pelo menos 20 a 30 minutos de caminhada em ritmo normal entre o Mainstage e os palcos mais distantes (como o Freedom Stage).',
    corDestaque: '#29B6F6' // Azul Claro
  },
  { 
    id: '3', 
    titulo: 'Manual do Rock in Rio', 
    resumo: 'Otimizando seu tempo na Cidade do Rock.',
    detalhes: 'Use os tênis mais confortáveis que tiver. Assim que os portões abrirem, corra para agendar os brinquedos (Tirolesa, Roda Gigante) pelo app oficial. Mantenha-se hidratado usando os bebedouros gratuitos espalhados pelo gramado.',
    corDestaque: '#FBC02D' // Amarelo
  },
  { 
    id: '4', 
    titulo: 'Logística em Estádios', 
    resumo: 'Pista Premium vs. Arquibancada.',
    detalhes: 'Para ver o artista de perto, vá de pista e chegue com horas de antecedência. Se prefere conforto, visão global dos telões e acesso fácil aos banheiros, escolha a arquibancada inferior. Na saída, sempre opte pelo transporte público.',
    corDestaque: '#388E3C' // Verde
  },
  { 
    id: '5', 
    titulo: 'Kit Lollapalooza', 
    resumo: 'Preparação para o Autódromo de Interlagos.',
    detalhes: 'O clima de São Paulo no Lolla é imprevisível. Seu kit obrigatório deve ter: capa de chuva, óculos escuros, protetor solar e um casaco leve amarrado na cintura. Evite calçados novos, pois o autódromo é cheio de ladeiras.',
    corDestaque: '#D32F2F' // Vermelho
  },
  { 
    id: '6', 
    titulo: 'Dicas para o The Town', 
    resumo: 'Acesso e pagamentos no festival paulista.',
    detalhes: 'O trânsito nos arredores costuma ser bloqueado; a melhor forma de chegar é usando os trens da CPTM (funcionamento 24h nos dias do evento). Evite filas nas praças de alimentação cadastrando seu cartão na pulseira antecipadamente.',
    corDestaque: '#29B6F6' // Azul Claro
  },
];