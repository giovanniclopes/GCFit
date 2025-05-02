import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";

// Criando o cache do Apollo
const cache = new InMemoryCache({
  typePolicies: {
    // Configurações de políticas de tipos podem ser adicionadas aqui
  },
});

// URL da sua API GraphQL no HygraphCMS
const HYGRAPH_URL = import.meta.env.VITE_HYGRAPH_API_URL || ""; // Configuração do cliente Apollo
export const createApolloClient = async (): Promise<
  ApolloClient<NormalizedCacheObject>
> => {
  try {
    console.log("📡 Inicializando Apollo Client");
    console.log(`🌐 API URL: ${HYGRAPH_URL}`);
    console.log(
      `🔑 Token presente: ${!!import.meta.env.VITE_HYGRAPH_AUTH_TOKEN}`
    );

    // Configurar persistência do cache para funcionamento offline
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
      maxSize: 1048576 * 10, // 10MB de cache
      debug: import.meta.env.DEV,
    });

    console.log("💾 Cache persistente configurado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao configurar cache persistente:", error);
    // Se falhar em configurar o cache persistente, prosseguimos sem ele
  } // Error handling link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}`
        );
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
      // Você pode adicionar aqui lógica para notificar o usuário sobre problemas de conexão
    }
  });

  // Retry link para tentar novamente em caso de falhas na rede
  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: 3000,
      jitter: true,
    },
    attempts: {
      max: 5,
      retryIf: (error, _operation) => {
        // Não tente novamente em erros 400 (bad request) ou se não houver erro
        return !!error && error.statusCode !== 400;
      },
    },
  });

  // Link HTTP para o HygraphCMS
  const httpLink = new HttpLink({
    uri: HYGRAPH_URL,
    headers: {
      authorization: import.meta.env.VITE_HYGRAPH_AUTH_TOKEN
        ? `Bearer ${import.meta.env.VITE_HYGRAPH_AUTH_TOKEN}`
        : "",
    },
    // Use credentials: 'include' se necessário para cookies
    // credentials: 'include',
  });

  // Criação do cliente Apollo - combinando os links na ordem correta
  return new ApolloClient({
    link: from([errorLink, retryLink, httpLink]),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        // Alterado de "ignore" para "all" para não ignorar erros
        errorPolicy: "all",
        // Adiciona um pequeno delay entre retentativas
        pollInterval: 0,
      },
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
      mutate: {
        // Garantimos que erros em mutações sejam capturados
        errorPolicy: "all",
      },
    },
    connectToDevTools: import.meta.env.DEV,
  });
};
