export interface Competencia {
  id: string;
  titulo: string;
  resumo: string;
  detalhes: string;
}

export const COMPETENCIAS: Competencia[] = [
  { 
    id: '1', 
    titulo: 'Componentes Fundamentais', 
    resumo: 'View, Text e SafeAreaView.',
    detalhes: 'Domínio na estruturação de telas utilizando os componentes base do React Native para garantir uma interface funcional e segura em diferentes dispositivos.' 
  },
  { 
    id: '2', 
    titulo: 'Listas Dinâmicas', 
    resumo: 'Uso avançado de FlatList.',
    detalhes: 'Implementação de listas de alto desempenho com carregamento dinâmico de dados, garantindo fluidez na rolagem vertical da aplicação.' 
  },
  { 
    id: '3', 
    titulo: 'Estilização Integrada', 
    resumo: 'StyleSheet e Flexbox.',
    detalhes: 'Capacidade de criar layouts responsivos e atraentes utilizando o sistema de estilos nativo e posicionamento de elementos com Flexbox.' 
  },
  { 
    id: '4', 
    titulo: 'TypeScript no Mobile', 
    resumo: 'Tipagem robusta de dados.',
    detalhes: 'Utilização de interfaces e tipos do TypeScript para aumentar a segurança do código, evitando erros comuns de desenvolvimento.' 
  },
  { 
    id: '5', 
    titulo: 'Versionamento Colaborativo', 
    resumo: 'Git e Fluxo de Branches.',
    detalhes: 'Experiência prática em ambiente de equipe, utilizando Git para criação de branches individuais e organização do repositório no GitHub.' 
  },
  { 
    id: '6', 
    titulo: 'Ecossistema Expo', 
    resumo: 'Expo Go e Fast Refresh.',
    detalhes: 'Utilização do ambiente Expo para agilizar o ciclo de desenvolvimento, testes em tempo real e deploy rápido do projeto.' 
  },
];