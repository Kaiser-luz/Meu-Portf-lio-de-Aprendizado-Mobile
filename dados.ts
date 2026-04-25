// dados.ts — simula o retorno de uma API externa
// Na semana que vem substituir este array por um fetch() real

export type Evento = {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  tagColor: string;
  data: string;
  local: string;
  ingresso: string;
};

const eventos: Evento[] = [
  {
    id: '1',
    nome: 'Festival de Jazz de Curitiba',
    descricao:
      'Uma noite inesquecível com os maiores nomes do jazz brasileiro e internacional, reunidos no coração da cidade. O palco principal fica na estrutura tubular da Ópera de Arame, cercada por natureza.',
    categoria: '🎷 Música',
    tagColor: '#7B61FF',
    data: '12 Jul 2025',
    local: 'Ópera de Arame, Curitiba',
    ingresso: 'R$ 80',
  },
  {
    id: '2',
    nome: 'Anime Festival Brasil',
    descricao:
      'O maior encontro da cultura pop japonesa do sul do país. Cosplay, painéis com dubladores, artistas independentes, área gamer e muito mais em dois dias de programação intensa.',
    categoria: '🎌 Pop Japonês',
    tagColor: '#E91E8C',
    data: '19 Jul 2025',
    local: 'Expo Barigui, Curitiba',
    ingresso: 'R$ 60',
  },
  {
    id: '3',
    nome: 'Expresso Gastronômico',
    descricao:
      'Festival de comida de rua com mais de 50 food trucks reunidos no Parque Barigui. Sabores do mundo inteiro, cerveja artesanal, música ao vivo e espaço pet-friendly.',
    categoria: '🍔 Gastronomia',
    tagColor: '#FF6B35',
    data: '26 Jul 2025',
    local: 'Parque Barigui, Curitiba',
    ingresso: 'Grátis',
  },
  {
    id: '4',
    nome: 'TechFest Paraná 2025',
    descricao:
      'Palestras, workshops e hackathon com foco em inteligência artificial, startups e desenvolvimento de software. Networking com profissionais e recrutadores das maiores empresas de tecnologia do Paraná.',
    categoria: '💻 Tecnologia',
    tagColor: '#00BCD4',
    data: '02 Ago 2025',
    local: 'UTFPR, Curitiba',
    ingresso: 'R$ 30',
  },
  {
    id: '5',
    nome: 'Festival Literário do Paraná',
    descricao:
      'Encontros com autores, lançamentos de livros, saraus e rodas de conversa para quem ama a leitura. Programação gratuita com nomes da literatura nacional e local.',
    categoria: '📚 Literatura',
    tagColor: '#4CAF50',
    data: '09 Ago 2025',
    local: 'Biblioteca Pública, Curitiba',
    ingresso: 'Grátis',
  },
  {
    id: '6',
    nome: 'Curitiba Street Art Week',
    descricao:
      'Uma semana dedicada à arte urbana: grafite ao vivo, exposições, batalhas de freestyle e intervenções artísticas por todo o Centro Histórico. Artistas locais e convidados internacionais.',
    categoria: '🎨 Arte Urbana',
    tagColor: '#FF9800',
    data: '16 Ago 2025',
    local: 'Centro Histórico, Curitiba',
    ingresso: 'Grátis',
  },
  {
    id: '7',
    nome: 'Maratona dos Filmes de Terror',
    descricao:
      'Do clássico ao contemporâneo, uma maratona noturna ao ar livre com as obras mais assustadoras do cinema mundial. Sessões a partir das 20h com pipoca e bebidas no local.',
    categoria: '🎬 Cinema',
    tagColor: '#9C27B0',
    data: '23 Ago 2025',
    local: 'Jardim Botânico, Curitiba',
    ingresso: 'R$ 25',
  },
];

export default eventos;