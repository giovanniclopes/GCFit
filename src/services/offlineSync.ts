import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from "./localStorage";

// Chaves para armazenamento de ações offline
const OFFLINE_ACTIONS_KEY = "offline:actions";

// Tipos de ação que podem ser realizadas offline
type ActionType =
  | "CREATE_WORKOUT_LOG"
  | "CREATE_COMPLETED_EXERCISE"
  | "CREATE_PROGRESS_RECORD";

// Interface para uma ação aguardando sincronização
interface PendingAction {
  id: string;
  type: ActionType;
  data: any;
  createdAt: string;
  retries: number;
}

/**
 * Adiciona uma ação para ser executada quando voltar online
 */
export const addOfflineAction = (type: ActionType, data: any): string => {
  const actions = getPendingActions();

  const actionId = `action_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const newAction: PendingAction = {
    id: actionId,
    type,
    data,
    createdAt: new Date().toISOString(),
    retries: 0,
  };

  actions.push(newAction);
  saveToStorage(OFFLINE_ACTIONS_KEY, actions);

  return actionId;
};

/**
 * Recupera todas as ações pendentes de sincronização
 */
export const getPendingActions = (): PendingAction[] => {
  return getFromStorage<PendingAction[]>(OFFLINE_ACTIONS_KEY) || [];
};

/**
 * Remove uma ação já processada
 */
export const removeOfflineAction = (actionId: string): void => {
  const actions = getPendingActions();
  const filteredActions = actions.filter((action) => action.id !== actionId);
  saveToStorage(OFFLINE_ACTIONS_KEY, filteredActions);
};

/**
 * Incrementa o contador de tentativas para uma ação específica
 */
export const incrementActionRetry = (actionId: string): void => {
  const actions = getPendingActions();
  const updatedActions = actions.map((action) => {
    if (action.id === actionId) {
      return {
        ...action,
        retries: action.retries + 1,
      };
    }
    return action;
  });

  saveToStorage(OFFLINE_ACTIONS_KEY, updatedActions);
};

/**
 * Verifica se há ações pendentes para sincronizar
 */
export const hasPendingActions = (): boolean => {
  const actions = getPendingActions();
  return actions.length > 0;
};

/**
 * Remove ações que excederam o número máximo de tentativas
 */
export const cleanupFailedActions = (maxRetries = 5): void => {
  const actions = getPendingActions();
  const filteredActions = actions.filter(
    (action) => action.retries < maxRetries
  );

  if (filteredActions.length !== actions.length) {
    saveToStorage(OFFLINE_ACTIONS_KEY, filteredActions);
  }
};

/**
 * Limpa todas as ações pendentes (use com cuidado)
 */
export const clearAllPendingActions = (): void => {
  removeFromStorage(OFFLINE_ACTIONS_KEY);
};
