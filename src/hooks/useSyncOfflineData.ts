import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  CREATE_COMPLETED_EXERCISE,
  CREATE_PROGRESS_RECORD,
  CREATE_WORKOUT_LOG,
  PUBLISH_COMPLETED_EXERCISE,
  PUBLISH_PROGRESS_RECORD,
  PUBLISH_WORKOUT_LOG,
} from "../services/apollo/mutations";
import {
  cleanupFailedActions,
  getPendingActions,
  incrementActionRetry,
  removeOfflineAction,
} from "../services/offlineSync";
import { useConnectivity } from "./useConnectivity";

/**
 * Hook para sincronizar dados que foram armazenados offline
 * quando o usuário fica online novamente
 */
export function useSyncOfflineData() {
  const client = useApolloClient();
  const { isOnline, wasOffline, reconnectedAt, clearReconnectionState } =
    useConnectivity();
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncError, setLastSyncError] = useState<Error | null>(null);
  const [pendingActionsCount, setPendingActionsCount] = useState<number>(0);

  // Realizar a sincronização quando estiver online novamente
  useEffect(() => {
    if (isOnline && wasOffline && reconnectedAt) {
      syncOfflineData();
    }
  }, [isOnline, wasOffline, reconnectedAt]);

  // Conta as ações pendentes
  useEffect(() => {
    if (isOnline) {
      const actions = getPendingActions();
      setPendingActionsCount(actions.length);
    }
  }, [isOnline, isSyncing]);

  // Função para sincronizar dados offline
  const syncOfflineData = async () => {
    if (!isOnline || isSyncing) return;

    try {
      setIsSyncing(true);
      setLastSyncError(null);

      const pendingActions = getPendingActions();
      setPendingActionsCount(pendingActions.length);

      if (pendingActions.length === 0) {
        clearReconnectionState();
        return;
      }

      // Processa cada ação pendente
      for (const action of pendingActions) {
        try {
          switch (action.type) {
            case "CREATE_WORKOUT_LOG":
              await processWorkoutLog(action.data, action.id);
              break;
            case "CREATE_COMPLETED_EXERCISE":
              await processCompletedExercise(action.data, action.id);
              break;
            case "CREATE_PROGRESS_RECORD":
              await processProgressRecord(action.data, action.id);
              break;
            default:
              console.warn(`Tipo de ação desconhecido: ${action.type}`);
              removeOfflineAction(action.id);
          }
        } catch (err) {
          console.error(`Erro ao processar ação ${action.id}:`, err);
          incrementActionRetry(action.id);
        }
      }

      // Limpa ações que falharam muitas vezes
      cleanupFailedActions();

      // Atualiza contagem final
      const remainingActions = getPendingActions();
      setPendingActionsCount(remainingActions.length);

      // Se não há mais ações, limpa o estado de reconexão
      if (remainingActions.length === 0) {
        clearReconnectionState();
      }
    } catch (error) {
      console.error("Erro durante sincronização:", error);
      setLastSyncError(
        error instanceof Error ? error : new Error(String(error))
      );
    } finally {
      setIsSyncing(false);
    }
  };

  // Processa um registro de treino
  const processWorkoutLog = async (data: any, actionId: string) => {
    try {
      // Cria o registro
      const createResult = await client.mutate({
        mutation: CREATE_WORKOUT_LOG,
        variables: data,
      });

      const logId = createResult?.data?.createWorkoutLog?.id;

      if (!logId) {
        throw new Error("Falha ao criar registro de treino");
      }

      // Publica o registro
      await client.mutate({
        mutation: PUBLISH_WORKOUT_LOG,
        variables: { id: logId },
      });

      // Remove a ação após sucesso
      removeOfflineAction(actionId);
    } catch (error) {
      throw error;
    }
  };

  // Processa um exercício realizado
  const processCompletedExercise = async (data: any, actionId: string) => {
    try {
      // Cria o exercício
      const createResult = await client.mutate({
        mutation: CREATE_COMPLETED_EXERCISE,
        variables: data,
      });

      const exerciseId = createResult?.data?.createCompletedExercise?.id;

      if (!exerciseId) {
        throw new Error("Falha ao criar exercício realizado");
      }

      // Publica o exercício
      await client.mutate({
        mutation: PUBLISH_COMPLETED_EXERCISE,
        variables: { id: exerciseId },
      });

      // Remove a ação após sucesso
      removeOfflineAction(actionId);
    } catch (error) {
      throw error;
    }
  };

  // Processa um registro de progresso
  const processProgressRecord = async (data: any, actionId: string) => {
    try {
      // Cria o registro
      const createResult = await client.mutate({
        mutation: CREATE_PROGRESS_RECORD,
        variables: data,
      });

      const recordId = createResult?.data?.createProgressRecord?.id;

      if (!recordId) {
        throw new Error("Falha ao criar registro de progresso");
      }

      // Publica o registro
      await client.mutate({
        mutation: PUBLISH_PROGRESS_RECORD,
        variables: { id: recordId },
      });

      // Remove a ação após sucesso
      removeOfflineAction(actionId);
    } catch (error) {
      throw error;
    }
  };

  // Força uma sincronização manual
  const manualSync = () => {
    if (isOnline && !isSyncing) {
      syncOfflineData();
    }
  };

  return {
    isSyncing,
    lastSyncError,
    pendingActionsCount,
    manualSync,
    isOnline,
  };
}
