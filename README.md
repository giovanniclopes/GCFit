# GC Fit - Aplicativo de Gestão de Treinos e Dieta

GC Fit é um aplicativo web responsivo para gerenciamento de treinos, dieta e rotina diária, priorizando a simplicidade, usabilidade e acessibilidade em qualquer dispositivo.

## Tecnologias Utilizadas

- **Frontend**: ReactJS com TypeScript e ViteJS
- **Estilização**: TailwindCSS
- **API**: GraphQL com Apollo Client
- **CMS**: Hygraph para gerenciamento de conteúdo
- **Persistência**: Armazenamento local para dados offline

## Configuração do Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- pnpm (gerenciador de pacotes recomendado)

### Instalação

1. Clone o repositório:

   ```
   git clone [URL_DO_REPOSITÓRIO]
   cd gcfit
   ```

2. Instale as dependências:

   ```
   pnpm install
   ```

3. Crie um arquivo `.env` baseado no `.env.example`:

   ```
   cp .env.example .env
   ```

4. Configure as variáveis de ambiente no arquivo `.env`:

   - `VITE_HYGRAPH_API_URL`: URL da sua API GraphQL do Hygraph (formato: https://api-REGIÃO.hygraph.com/v2/CÓDIGO/master)
   - `VITE_HYGRAPH_AUTH_TOKEN`: Token de autenticação para o Hygraph (obtido em Project Settings > API Access)

5. Inicie o servidor de desenvolvimento:
   ```
   pnpm dev
   ```

## Configuração do Hygraph CMS

Para configurar o Hygraph CMS para este projeto, siga os passos abaixo:

1. Acesse o [Hygraph](https://hygraph.com/) e crie uma conta se ainda não tiver.

2. Crie um novo projeto.

3. No Schema Builder, crie os seguintes modelos:

### Modelo: Refeição (Meal)

**Campos:**

- **Nome** (String) - Nome da refeição
- **Tipo** (Enum) - Opções: breakfast, post-workout, snack, lunch, afternoon-snack, dinner, supper
- **HorarioPadrao** (String) - Formato HH:MM
- **Descricao** (Rich Text) - Detalhes sobre a refeição
- **Alimentos** (Lista de referências ao modelo Alimento)
- **TabelaSubstituicao** (Referência à tabela de substituição)
- **Calorias** (Number) - Total de calorias
- **Proteinas** (Number) - Gramas de proteínas
- **Carboidratos** (Number) - Gramas de carboidratos
- **Gorduras** (Number) - Gramas de gorduras

### Modelo: Alimento (Food)

**Campos:**

- **Nome** (String) - Nome do alimento
- **Categoria** (Enum) - Opções: protein, carb, fat, fruit, vegetable
- **Porcao** (String) - Descrição da porção (ex: "2 fatias")
- **Medida** (String) - Unidade de medida (ex: "g", "ml")
- **Quantidade** (Number) - Valor numérico
- **Calorias** (Number) - Por porção
- **Proteinas** (Number) - Gramas por porção
- **Carboidratos** (Number) - Gramas por porção
- **Gorduras** (Number) - Gramas por porção
- **Imagem** (Asset) - Foto do alimento

### Modelo: Treino (Workout)

**Campos:**

- **DiaSemana** (Enum) - Opções: monday, tuesday, wednesday, thursday, friday, saturday, sunday
- **GrupoMuscular** (String) - ex: "Peito e Tríceps"
- **Exercicios** (Lista de referências ao modelo Exercicio)
- **Objetivo** (Enum) - Opções: hypertrophy, strength, endurance
- **DuracaoEstimada** (Number) - Em minutos
- **Observacoes** (Rich Text) - Instruções específicas

### Modelo: Exercicio (Exercise)

**Campos:**

- **Nome** (String) - Nome do exercício
- **Descricao** (Rich Text) - Como executar
- **MusculosTrabalhados** (String) - Lista de músculos
- **Series** (Number) - Quantidade de séries
- **Repeticoes** (String) - ex: "12-15" ou "Falha"
- **TempoDescanso** (Number) - Em segundos
- **Demonstracao** (Asset) - GIF ou vídeo demonstrativo
- **EquipamentoNecessario** (String) - Material necessário
- **Dificuldade** (Enum) - Opções: beginner, intermediate, advanced

4. Configure as relações entre os modelos conforme necessário.

5. Gere um token de autenticação permanente:

   - Acesse Project Settings > API Access
   - Em "Permanent Auth Tokens", crie um novo token com permissões adequadas
   - Copie o token gerado para o arquivo `.env`

6. Adicione alguns dados de exemplo para desenvolvimento.

## Funcionalidades Implementadas

- [x] Dashboard com visualização contextual (refeição atual, próxima, treino do dia)
- [x] Integração com HygraphCMS
- [x] Consultas GraphQL para obtenção de dados
- [x] Suporte a funcionamento offline
- [x] Sincronização de dados quando volta a ficar online

## Integração com Apollo e GraphQL

Este projeto utiliza Apollo Client para integração com o Hygraph CMS através de GraphQL. Os principais componentes dessa integração são:

- **src/services/apollo/client.ts**: Configuração do Apollo Client com suporte a cache offline
- **src/services/apollo/queries.ts**: Definição das queries GraphQL para busca de dados
- **src/services/apollo/mutations.ts**: Definição das mutations GraphQL para modificação de dados
- **src/services/apollo/types.ts**: Tipos TypeScript correspondentes aos modelos do Hygraph

## Desenvolvimento

### Estrutura de Diretórios

```
src/
  ├── assets/          # Imagens e outros recursos estáticos
  ├── components/      # Componentes reutilizáveis
  ├── constants/       # Constantes e valores padrão
  ├── hooks/           # Hooks personalizados
  ├── pages/           # Componentes de página
  ├── services/        # Serviços (Apollo, localStorage, etc)
  ├── styles/          # Estilos globais
  ├── types/           # Definições de tipos
  └── utils/           # Funções utilitárias
```

### Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Gera a versão de produção
- `pnpm preview`: Pré-visualiza a versão de produção localmente
- `pnpm lint`: Executa a verificação de lint
- `pnpm test`: Executa os testes (caso configurados)
