import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useConnectivity } from "../../hooks/useConnectivity";
import {
  CREATE_PROGRESS_RECORD,
  PUBLISH_PROGRESS_RECORD,
} from "../apollo/mutations";
import { GET_LATEST_PROGRESS, GET_PROGRESS_RECORDS } from "../apollo/queries";
import { ProgressRecord } from "../apollo/types";
import { getWithTimestamp, saveWithTimestamp } from "../localStorage";
import { addOfflineAction } from "../offlineSync";

const PROGRESS_CACHE_KEY = "cache:progress-records";
const LATEST_PROGRESS_CACHE_KEY = "cache:latest-progress";

interface ProgressInput {
  date: string;
  weight: number;
  arm?: number;
  leg?: number;
  chest?: number;
  waist?: number;
  notes?: string;
}

/**
 * Hook para obter todos os registros de progresso
 */
export const useProgressRecords = (limit = 10) => {
  const [records, setRecords] = useState<ProgressRecord[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { data, loading, refetch } = useQuery(GET_PROGRESS_RECORDS, {
    variables: { limit },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error("Erro ao buscar registros de progresso:", error);
      setError(error);

      // Tentar carregar do cache local em caso de erro
      const cachedRecords =
        getWithTimestamp<ProgressRecord[]>(PROGRESS_CACHE_KEY);
      if (cachedRecords) {
        setRecords(cachedRecords);
      }
    },
  });

  useEffect(() => {
    if (data?.progressRecords) {
      const fetchedRecords = data.progressRecords;
      setRecords(fetchedRecords);

      // Salvar no cache local com timestamp
      saveWithTimestamp(PROGRESS_CACHE_KEY, fetchedRecords);
    }
  }, [data]);

  // Se não temos dados e não estamos carregando, tentar do cache local
  useEffect(() => {
    if (!loading && !data?.progressRecords && records.length === 0) {
      const cachedRecords =
        getWithTimestamp<ProgressRecord[]>(PROGRESS_CACHE_KEY);
      if (cachedRecords) {
        setRecords(cachedRecords);
      }
    }
  }, [loading, data, records]);

  return { records, loading, error, refetch };
};

/**
 * Hook para obter o último registro de progresso
 */
export const useLatestProgress = () => {
  const [latestRecord, setLatestRecord] = useState<ProgressRecord | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { data, loading, refetch } = useQuery(GET_LATEST_PROGRESS, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error("Erro ao buscar último progresso:", error);
      setError(error);

      // Tentar carregar do cache local em caso de erro
      const cachedRecord = getWithTimestamp<ProgressRecord>(
        LATEST_PROGRESS_CACHE_KEY
      );
      if (cachedRecord) {
        setLatestRecord(cachedRecord);
      }
    },
  });

  useEffect(() => {
    if (data?.latestProgressRecord) {
      const fetchedRecord = data.latestProgressRecord;
      setLatestRecord(fetchedRecord);

      // Salvar no cache local com timestamp
      saveWithTimestamp(LATEST_PROGRESS_CACHE_KEY, fetchedRecord);
    }
  }, [data]);

  // Se não temos dados e não estamos carregando, tentar do cache local
  useEffect(() => {
    if (!loading && !data?.latestProgressRecord && !latestRecord) {
      const cachedRecord = getWithTimestamp<ProgressRecord>(
        LATEST_PROGRESS_CACHE_KEY
      );
      if (cachedRecord) {
        setLatestRecord(cachedRecord);
      }
    }
  }, [loading, data, latestRecord]);

  return { latestRecord, loading, error, refetch };
};

/**
 * Hook para criar um novo registro de progresso
 */
export const useCreateProgressRecord = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { isOnline } = useConnectivity();

  const [createRecord] = useMutation(CREATE_PROGRESS_RECORD);
  const [publishRecord] = useMutation(PUBLISH_PROGRESS_RECORD);

  const createProgressRecord = async (
    input: ProgressInput
  ): Promise<ProgressRecord | null> => {
    setLoading(true);
    setError(null);

    try {
      // Se estiver online, tentar criar diretamente
      if (isOnline) {
        const createResult = await createRecord({
          variables: {
            date: input.date,
            weight: input.weight,
            measurements: {
              arm: input.arm || 0,
              leg: input.leg || 0,
              chest: input.chest || 0,
              waist: input.waist || 0,
            },
            notes: input.notes ? { html: input.notes } : { html: '' },
          },
        });

        const recordId = createResult?.data?.createProgressRecord?.id;

        if (!recordId) {
          throw new Error("Falha ao criar registro de progresso");
        }

        // Publicar o registro
        await publishRecord({
          variables: { id: recordId },
        });

        return createResult?.data?.createProgressRecord || null;
      } else {
        // Se offline, adicionar à fila de ações offline
        addOfflineAction("CREATE_PROGRESS_RECORD", {
          date: input.date,
          weight: input.weight,
          measurements: {
            arm: input.arm || 0,
            leg: input.leg || 0,
            chest: input.chest || 0,
            waist: input.waist || 0,
          },
          notes: input.notes ? { html: input.notes } : { html: '' },
        });

        // Criar um registro provisório para experiência offline
        const tempRecord: ProgressRecord = {
          id: `temp_${Date.now()}`,
          date: input.date,
          weight: input.weight,
          measurements: {
            arm: input.arm || 0,
            leg: input.leg || 0,
            chest: input.chest || 0,
            waist: input.waist || 0,
          },
          notes: input.notes ? { html: input.notes } : { html: '' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        return tempRecord;
      }
    } catch (err) {
      console.error("Erro ao criar registro de progresso:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createProgressRecord, loading, error };
};
