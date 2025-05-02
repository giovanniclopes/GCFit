import { gql } from "@apollo/client";

/**
 * Este arquivo contém queries utilitárias para verificar o estado da API
 * e outras funcionalidades que não estão diretamente relacionadas com modelos específicos
 */

// Query simples para verificar se a API está operacional
export const API_HEALTH_CHECK = gql`
  query ApiHealthCheck {
    __typename
  }
`;

/**
 * Função para verificar o estado de saúde da API GraphQL
 * @param client - Cliente Apollo
 * @returns Promise que resolve para true se a API estiver disponível
 */
export async function checkApiHealth(client: any): Promise<boolean> {
  try {
    const result = await client.query({
      query: API_HEALTH_CHECK,
      fetchPolicy: "network-only", // Garante que vamos testar a rede, não o cache
    });
    return !!result.data.__typename;
  } catch (error) {
    console.error("Erro ao verificar estado da API:", error);
    return false;
  }
}
