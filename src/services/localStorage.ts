/**
 * Serviço para gerenciar o armazenamento local de dados
 * Usado para funcionalidade offline
 */

const STORAGE_KEY_PREFIX = "gcfit:";

/**
 * Salva um item no localStorage com o prefixo do app
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(data));
  } catch (error) {
    console.error("Erro ao salvar dados no localStorage:", error);
  }
}

/**
 * Recupera um item do localStorage
 */
export function getFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error("Erro ao recuperar dados do localStorage:", error);
    return null;
  }
}

/**
 * Remove um item do localStorage
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${key}`);
  } catch (error) {
    console.error("Erro ao remover dados do localStorage:", error);
  }
}

/**
 * Limpa todos os itens do app no localStorage
 */
export function clearAppStorage(): void {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Erro ao limpar dados do localStorage:", error);
  }
}

/**
 * Salva os dados com timestamp para verificação de atualização
 */
export function saveWithTimestamp<T>(key: string, data: T): void {
  const dataWithTimestamp = {
    data,
    timestamp: new Date().toISOString(),
  };
  saveToStorage(key, dataWithTimestamp);
}

/**
 * Recupera dados com timestamp e verifica se estão atualizados
 * baseado no número de horas desde a última atualização
 */
export function getWithTimestamp<T>(key: string, maxHoursOld = 24): T | null {
  const storedData = getFromStorage<{ data: T; timestamp: string }>(key);

  if (!storedData) return null;

  const storedTime = new Date(storedData.timestamp).getTime();
  const currentTime = new Date().getTime();
  const hoursDiff = (currentTime - storedTime) / (1000 * 60 * 60);

  // Se os dados são mais antigos que o máximo de horas, retorna null
  if (hoursDiff > maxHoursOld) {
    return null;
  }

  return storedData.data;
}

/**
 * Verifica se o dispositivo está online
 */
export function isOnline(): boolean {
  return navigator.onLine;
}
