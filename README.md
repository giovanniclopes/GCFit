# GC Fit - Aplicativo de Gerenciamento de Treinos e Dieta

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange.svg)

## 📋 Sobre o Projeto

GC Fit é uma aplicação web responsiva desenvolvida para gerenciamento personalizado de treinos, dieta e rotina diária. O sistema prioriza simplicidade, usabilidade e acessibilidade em todos os dispositivos, com foco especial em dispositivos móveis para consulta durante deslocamentos e na academia.

![GC Fit Screenshot](./public/screenshot.png)

## 🎯 Objetivos Principais

- Exibição contextual de refeições baseada no horário atual
- Apresentação de treinos correspondentes ao dia da semana
- Acompanhamento e registro do progresso nos treinos
- Adaptação à rotina rígida do usuário
- Estatísticas de progressão de ganho de massa muscular
- Funcionamento offline durante treinos na academia

## 🛠️ Tecnologias Utilizadas

### Frontend

- [React](https://reactjs.org/) (v19.0.0)
- [TypeScript](https://www.typescriptlang.org/) (v5.7.2)
- [ViteJS](https://vitejs.dev/) (v6.3.1)
- [TailwindCSS](https://tailwindcss.com/) (v3.4.17)
- [Framer Motion](https://www.framer.com/motion/) (v12.9.4)
- [Dayjs](https://day.js.org/) (v1.11.13)

### Dependências Adicionais

- [@heroicons/react](https://heroicons.com/) - Ícones
- [@fontsource](https://fontsource.org/) - Fontes (Montserrat, Poppins, Roboto Condensed)
- [Lodash](https://lodash.js.org/) - Utilitários JavaScript

### Backend (Planejado)

- Node.js com Express
- GraphQL
- Hygraph CMS

## ✨ Funcionalidades

### 1. Dashboard Central

- Cabeçalho com data e hora atual
- Cards destacados para refeição atual e próxima
- Exibição do treino do dia em seção prioritária
- Resumo do progresso semanal
- Contador regressivo para próxima refeição

### 2. Módulo de Alimentação

- Visualização detalhada do plano alimentar
- Organização das refeições por horários
- Tabelas de substituição
- Registro de consumo de água (planejado)

### 3. Módulo de Treinos

- Estruturação da divisão semanal de treinos
- Detalhamento de exercícios
- Cronômetro para descanso entre séries (planejado)
- Registro de cargas utilizadas (planejado)

### 4. Módulo de Progressão

- Gráficos para acompanhamento de peso e medidas (planejado)
- Estatísticas de progressão de cargas (planejado)
- Comparação visual de progresso (planejado)

### 5. Módulo de Rotina

- Organização da rotina diária completa (planejado)
- Timeline interativa (planejado)
- Lembretes para refeições e treinos (planejado)

## 📊 Estrutura de Dados

A aplicação utiliza uma estruturação de dados bem definida para gerenciar:

- Refeições (tipo, horário, alimentos)
- Alimentos (porções, nutrientes)
- Treinos (por dias da semana)
- Exercícios (séries, repetições)
- Registros de progresso (peso, medidas)
- Atividades da rotina diária

## 🚀 Instalação e Uso

### Pré-requisitos

- Node.js 18.0.0+
- npm ou pnpm

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/gcfit.git
cd gcfit
```

2. Instale as dependências

```bash
npm install
# ou
pnpm install
```

3. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
pnpm dev
```

4. Acesse a aplicação em `http://localhost:5173`

## 📝 Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento Vite
- `build`: Compila TypeScript e constrói o projeto para produção
- `lint`: Executa linting no código
- `preview`: Visualiza a versão de produção localmente
- `tailwind`: Gera os estilos CSS do Tailwind
- `tailwind:watch`: Gera os estilos CSS do Tailwind em modo watch

## 🌐 Roadmap de Desenvolvimento

### Fase 1 - MVP

- [x] Dashboard com visualização de refeição atual e treino do dia
- [ ] Registro básico de treinos
- [ ] Visualização de dieta por horário

### Fase 2 - Expansão

- [ ] Sistema completo de tracking de progressão
- [ ] Módulo de rotina detalhado
- [ ] Notificações e lembretes

### Fase 3 - Avançado

- [ ] Integração com wearables
- [ ] Análise avançada de dados
- [ ] Recomendações personalizadas baseadas em progresso

## 💼 Considerações Técnicas

- O modo offline será implementado utilizando localStorage/IndexedDB
- Performance otimizada com lazy loading e caching
- Design responsivo com foco em dispositivos móveis

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido com ❤️ para otimizar a rotina de fitness.
