import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type CardItem = {
  id: number;
  titulo: string;
  descricao: string;
};

export default function HomeScreen() {
  const cards: CardItem[] = [
    {
      id: 1,
      titulo: 'Sobre mim',
      descricao:
        'Meu nome é Bernardo Canestraro. Sou desenvolvedor júnior há 1 ano e 4 meses, sendo 4 meses de estágio. Atuo com back-end, front-end, mobile, banco de dados, suporte e definição de soluções. Trabalho com linguagens como C#, React, JavaScript, Java Mobile e VB.NET. Em banco de dados, utilizo SQL Server, PostgreSQL e SQLite. No mobile, já trabalhei com Java e agora estou aprendendo React Native.',
    },
    {
      id: 2,
      titulo: 'Área de trabalho',
      descricao:
        'As áreas em que mais gosto de atuar são banco de dados e cibersegurança. Mesmo ainda não sabendo tanto sobre cyber, quero aprender cada vez mais e continuar evoluindo. Em relação a banco de dados, gosto bastante de SQL Server. Já o PostgreSQL não é o meu favorito, porque exige uma escrita mais específica em vários casos, como em procedures, tipagem, aliases e definições mais detalhadas.',
    },
    {
      id: 3,
      titulo: 'Objetivos profissionais',
      descricao:
        'No futuro, quero trabalhar com cibersegurança. Tenho vontade de atuar em órgãos como a Polícia Federal ou outras organizações do governo, mas também gostaria de ter a oportunidade de trabalhar em grandes empresas de tecnologia voltadas para segurança digital.',
    },
    {
      id: 4,
      titulo: 'Meus gostos',
      descricao:
        'Eu gosto muito de Fórmula 1, UFC, futebol, basquete, IndyCar, CS:GO e pesca. Sou torcedor fanático da Ferrari e do Corinthians. Gosto de acompanhar esportes, competir em jogos e também curtir momentos mais tranquilos, como a pesca.',
    },
    {
      id: 5,
      titulo: 'Corinthians e o Mundial de 2012',
      descricao:
        'Um momento marcante para mim como torcedor foi o Mundial de 2012 do Corinthians. A conquista contra o Chelsea ficou histórica, com muita raça, entrega e a defesa inesquecível do Cássio. Esse título representa muito para a torcida corintiana e é uma lembrança especial para qualquer corinthiano.',
    },
    {
      id: 6,
      titulo: 'Projeto Yoga no Parque Curitiba',
      descricao:
        'Estou tentando construir um aplicativo para o meu tio, que é professor de yoga. O projeto dele se chama Yoga no Parque Curitiba. A ideia do app é ter um fórum de bate-papo, um módulo com aulas pagas e gratuitas, avisos sobre aulas gratuitas nos parques Barigui e Jardim Botânico, além de sorteios por frequência para premiar alunos com brindes. É um projeto que une tecnologia, organização e bem-estar.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.tituloPrincipal}>Meu Portfólio de Aprendizado Mobile</Text>
        <Text style={styles.nome}>Bernardo Canestraro</Text>
      </View>

      {cards.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitulo}>{item.titulo}</Text>
          <Text style={styles.cardDescricao}>{item.descricao}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#111111',
  },
  topo: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2e2e2e',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
  },
  tituloPrincipal: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 15,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  nome: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: '#c1121f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 10,
  },
  cardDescricao: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
});