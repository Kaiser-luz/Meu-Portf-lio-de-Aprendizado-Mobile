# 📅 Eventos & Festivais App

Este é o repositório principal do projeto **Eventos & Festivais**, desenvolvido como parte das atividades práticas de Desenvolvimento Mobile. O aplicativo foi selecionado pelo grupo para ser a versão oficial na branch `main`.

Ele consiste em uma plataforma mobile completa para a exploração e gestão de eventos e festivais, integrando consumo de API externa (via **Axios** e **MockAPI**), persistência de dados local (via **AsyncStorage**) para favoritos e sessão de usuário, renderização de mapas interativos nativos (via **React Native Maps**) e navegação fluida baseada em abas com o **Expo Router**.

---

## 👥 Integrantes do Grupo
*Insira abaixo os nomes e RAs dos integrantes do seu grupo para a avaliação do professor:*
- **Integrante 1**: [Nome Completo] (RA: [Número])
- **Integrante 2**: [Nome Completo] (RA: [Número])
- **Integrante 3**: [Nome Completo] (RA: [Número])
- **Integrante 4**: [Nome Completo] (RA: [Número])

**Professor Orientador**: [Nome do Professor]  
**Disciplina**: [Nome da Disciplina / Ex: Desenvolvimento de Aplicações Mobile]

---

## 🚀 Funcionalidades do Aplicativo

### 1. 🔍 Explorar Eventos (`app/index.tsx`)
- **Tela Inicial**: Lista todos os eventos ativos cadastrados em tempo real no nosso backend remoto.
- **Filtros Dinâmicos**: Barra de busca por texto com suporte a limpeza rápida e carrossel de categorias (Música, Arte, Gastronomia, Tecnologia, Esporte).
- **Cards Personalizados**: Exibição elegante do evento com tags coloridas com base na categoria, data formatada, local e custo do ingresso.

### 2. 📄 Detalhes do Evento (`app/detalhes/[id].tsx`)
- **Visualização Completa**: Apresenta informações detalhadas do evento selecionado (descrição rica, data, local, preço).
- **Favoritar (Interesse)**: Botão de coração interativo que adiciona ou remove o evento da lista de interesses local de forma instantânea.
- **📍 Mapa Interativo**: Integração nativa com o `react-native-maps`, que plota um marcador no mapa usando as coordenadas de latitude e longitude cadastradas para o evento.
- *Fallback de Compatibilidade*: Para testes no navegador (ambiente Web), o mapa renderiza de forma silenciosa e segura para não interromper a navegação.

### 3. 💖 Interesses (`app/interesses.tsx`)
- **Lista de Favoritos**: Reúne todos os eventos favoritados pelo usuário.
- **Persistência de Dados**: Os dados são salvos localmente utilizando o **AsyncStorage** (`@favoritos_eventos`), o que garante o funcionamento mesmo offline ou ao reiniciar o aplicativo.
- **Remoção Rápida**: Opção direta de remover o interesse com apenas um clique.

### 4. 🔑 Autenticação Administrativa (`app/login.tsx`)
- Para simular permissões em um cenário real, o aplicativo possui uma tela de login administrativa.
- **Sessão Persistente**: Após o login bem-sucedido, as credenciais são gravadas no AsyncStorage (`@sessao_usuario`). Ao reabrir o aplicativo, o login é restaurado automaticamente.
- **Credenciais para Teste (Administrador)**:
  - **E-mail**: `admin@eventos.com`
  - **Senha**: `123456`

### 5. 🛠️ Gestão de Eventos - CRUD (`app/meus-eventos.tsx`)
- **Acesso Restrito**: Caso o usuário não esteja logado, a tela exibe um aviso amigável de restrição.
- **Visualização**: Exibe a lista dos eventos cadastrados com botões rápidos de ação.
- **Criar Novo Evento (POST)**: Modal completo com formulário dinâmico para cadastrar o nome, descrição, categoria, data, local, valor do ingresso, latitude e longitude.
- **Editar Evento (PUT)**: Permite preencher o formulário com os dados existentes e atualizá-los diretamente no backend do MockAPI.
- **Excluir Evento (DELETE)**: Solicita uma confirmação de segurança (Alert dialog) antes de enviar a requisição de remoção à API.

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

O projeto foi construído utilizando as melhores práticas do ecossistema React Native / Expo:

- **React Native & TypeScript**: Estrutura robusta fortemente tipada para melhor legibilidade e prevenção de erros.
- **Expo Framework (v54)**: Ambiente moderno para compilação rápida e suporte híbrido.
- **Expo Router (v6)**: Gerenciador de rotas baseado em arquivos (semelhante ao Next.js), trazendo simplicidade para a navegação de tabs e telas dinâmicas.
- **Axios**: Cliente HTTP para consumir e enviar dados de eventos para a API REST.
- **MockAPI**: Plataforma RESTful hospedada na nuvem que armazena os dados dos eventos e simula as operações de banco de dados em tempo real.
- **AsyncStorage**: Armazenamento offline chave-valor rápido para gerenciar a sessão do usuário e os favoritos localmente.
- **React Native Maps**: Exibição de mapas geográficos integrados no Android e iOS.
- **Expo Vector Icons (Ionicons)**: Biblioteca de ícones vetoriais de alta qualidade.
- **Expo Haptics & Reanimated**: Para micro-interações táteis e fluidez visual.

---

## 🏗️ Estrutura de Pastas e Arquivos

```bash
Meu-Portfólio-de-Aprendizado-Mobile/
├── .expo/                   # Configurações internas do Expo
├── app/                     # Rotas e Páginas (Expo Router)
│   ├── detalhes/
│   │   └── [id].tsx        # Tela de detalhes do evento (mapa e favorito)
│   ├── _layout.tsx         # Configuração da navegação por abas inferiores (Tabs)
│   ├── index.tsx           # Aba Explorar: listagem, busca e filtros
│   ├── interesses.tsx      # Aba Interesses: exibição dos favoritos locais
│   ├── login.tsx           # Aba Login: autenticação administrativa e logout
│   └── meus-eventos.tsx    # Aba Meus Eventos: listagem e formulários de CRUD (Criar/Editar/Deletar)
├── assets/                  # Imagens, fontes e splash screens
├── components/              # Componentes comuns da aplicação
│   ├── MapaEvento.tsx      # Mapa nativo (Android e iOS)
│   ├── MapaEvento.web.tsx  # Fallback de mapa para ambiente Web
│   └── ui/                 # Elementos e ícones auxiliares
├── constants/
│   └── EventoCard.tsx      # Card estilizado de exibição de evento na lista
├── services/
│   └── api.ts              # Configuração global da instância Axios conectada ao MockAPI
├── dados.ts                 # Definições de tipos TypeScript do Evento
├── app.json                 # Metadados e permissões da aplicação no Expo
├── package.json             # Scripts de execução e controle de dependências
└── tsconfig.json            # Configuração do compilador TypeScript
```

---

## 💻 Como Rodar o Projeto Passo a Passo

Siga as instruções abaixo para executar a aplicação na sua máquina local:

### 📋 Pré-requisitos
Certifique-se de ter instalado em sua máquina:
1. **Node.js** (versão 18 ou superior recomendada): [Instalar Node.js](https://nodejs.org/)
2. **NPM** (instalado automaticamente com o Node)
3. **Expo Go** instalado no seu celular (caso queira testar em dispositivo físico real):
   - [Google Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Apple App Store (iOS)](https://apps.apple.com/br/app/expo-go/id984021022)
4. Um emulador configurado no seu computador (Android Studio ou Xcode), caso não use o celular físico.

### 🔌 Passo 1: Clonar o Repositório
Abra o seu terminal no diretório desejado e clone o projeto:
```bash
git clone https://github.com/Kaiser-luz/Meu-Portf-lio-de-Aprendizado-Mobile.git
cd Meu-Portf-lio-de-Aprendizado-Mobile-dereck-felipe-maciel-pereira
```

### 📦 Passo 2: Instalar Dependências
Instale todos os pacotes e bibliotecas descritos no `package.json` executando o comando abaixo:
```bash
npm install
```

### 🚀 Passo 3: Iniciar o Servidor Expo
Inicie a aplicação utilizando o CLI do Expo:
```bash
npm run start
```
*ou se preferir:*
```bash
npx expo start
```

### 📱 Passo 4: Visualizar o Aplicativo

No terminal, o Expo abrirá uma interface interativa com um **QR Code** e algumas instruções extras:

- **No Celular Físico (Expo Go)**:
  1. Conecte o seu celular e o seu computador **na mesma rede Wi-Fi**.
  2. Abra a câmera do seu celular (no iOS) ou o aplicativo **Expo Go** (no Android) e escaneie o **QR Code** gerado no terminal.
  3. O app será baixado e executado instantaneamente!
  
- **No Emulador Android (Android Studio)**:
  1. Certifique-se de que o emulador está aberto e rodando no computador.
  2. Pressione a tecla **`a`** no terminal onde o Expo está rodando.
  
- **No Emulador iOS (Xcode)**:
  1. Certifique-se de que o simulador iOS está aberto no macOS.
  2. Pressione a tecla **`i`** no terminal onde o Expo está rodando.

- **No Navegador (Ambiente Web)**:
  1. Pressione a tecla **`w`** no terminal onde o Expo está rodando para abrir no navegador de internet.

---

## 🔒 Instruções para Avaliação do CRUD (Passo a Passo)

Para facilitar a correção do professor, listamos o fluxo de testes ideal para avaliar a persistência e o consumo de dados:

1. Abra o aplicativo e vá até a aba **Login** no menu inferior.
2. Insira as credenciais padrão:
   - **E-mail**: `admin@eventos.com`
   - **Senha**: `123456`
3. Clique em **Entrar**. Você verá a confirmação do login e a sua sessão persistirá no AsyncStorage.
4. Navegue até a aba **Meus Eventos** (que antes estava bloqueada).
5. Clique em **Novo Evento** para abrir o modal de cadastro.
6. Preencha todos os campos e adicione coordenadas válidas de latitude e longitude (ex: Curitiba: Lat `-25.4284`, Lng `-49.2733`). Clique em **Criar evento**.
7. Verifique na listagem de **Meus Eventos** que o item foi inserido. Você também pode **Editar** ou **Excluir** os eventos.
8. Volte para a aba **Explorar** e veja que as alterações foram refletidas em tempo real a partir da API.
9. Clique no evento que você criou para ver os detalhes e ver a localização plotada interativamente no **Mapa** (em dispositivo físico ou emulador).
10. Toque no ícone de coração para favoritar o evento.
11. Vá até a aba **Interesses** e certifique-se de que o evento favoritado está salvo localmente na sua lista offline.

---

## 🎨 Detalhes de Design e UX/UI
- **Visual Dark Mode**: Interface futurista baseada em cores profundas (`#13131F` e `#1E1E2E`) e texto contrastante (`#F0EAD6`), reduzindo a fadiga visual.
- **Cores Temáticas por Categoria**: Facilita a identificação visual rápida de cada tipo de evento:
  - 🟣 **Música**: Roxo (`#7B61FF`)
  - 🟠 **Arte**: Laranja (`#FF9800`)
  - 🍊 **Gastronomia**: Laranja Escuro (`#FF6B35`)
  - 🔵 **Tecnologia**: Ciano (`#00BCD4`)
  - 🟢 **Esporte**: Verde (`#4CAF50`)
- **Feedback Hárptico**: Respostas táteis integradas para interações de botões no celular.
