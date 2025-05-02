import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_COMPLETED_EXERCISE,
  CREATE_WORKOUT_LOG,
  PUBLISH_COMPLETED_EXERCISE,
  PUBLISH_WORKOUT_LOG,
} from "../apollo/mutations";
import { GET_WORKOUT_LOGS } from "../apollo/queries";
import {
  CompletedExercise,
  WorkoutFeedback,
  WorkoutLog,
} from "../apollo/types";

interface UseWorkoutLogsResult {
  workoutLogs: WorkoutLog[];
  loading: boolean;
  error: any;
}

interface CreateWorkoutLogData {
  date: string;
  workoutId: string;
  totalDuration: number;
  feedback: WorkoutFeedback;
  notes?: any;
}

interface CreateCompletedExerciseData {
  workoutLogId: string;
  exerciseId: string;
  completedSets: number;
  completedReps: string;
  usedWeight: string;
  difficulty: number;
}

interface UseCreateWorkoutLogResult {
  createWorkoutLog: (data: CreateWorkoutLogData) => Promise<WorkoutLog | null>;
  loading: boolean;
  error: any;
}

interface UseCreateCompletedExerciseResult {
  createCompletedExercise: (
    data: CreateCompletedExerciseData
  ) => Promise<CompletedExercise | null>;
  loading: boolean;
  error: any;
}

// Hook para obter registros de treinos
export const useWorkoutLogs = (limit = 10): UseWorkoutLogsResult => {
  const { data, loading, error } = useQuery(GET_WORKOUT_LOGS, {
    variables: { limit },
    fetchPolicy: "cache-and-network",
  });

  return {
    workoutLogs: data?.workoutLogs || [],
    loading,
    error,
  };
};

// Hook para criar um novo registro de treino
export const useCreateWorkoutLog = (): UseCreateWorkoutLogResult => {
  const [createLog, { loading, error }] = useMutation(CREATE_WORKOUT_LOG);
  const [publishLog] = useMutation(PUBLISH_WORKOUT_LOG);

  const createWorkoutLog = async (
    data: CreateWorkoutLogData
  ): Promise<WorkoutLog | null> => {
    try {
      // Primeiro, criamos o registro do treino
      const createResult = await createLog({
        variables: {
          date: data.date,
          workoutId: data.workoutId,
          totalDuration: data.totalDuration,
          feedback: data.feedback,
          notes: data.notes || null,
        },
      });

      const logId = createResult?.data?.createWorkoutLog?.id;

      if (!logId) {
        throw new Error("Falha ao criar registro de treino");
      }

      // Em seguida, publicamos o registro para que fique visível na API
      await publishLog({
        variables: { id: logId },
      });

      return createResult?.data?.createWorkoutLog || null;
    } catch (err) {
      console.error("Erro ao criar registro de treino:", err);
      throw err;
    }
  };

  return {
    createWorkoutLog,
    loading,
    error,
  };
};

// Hook para criar um novo exercício realizado
export const useCreateCompletedExercise =
  (): UseCreateCompletedExerciseResult => {
    const [createExercise, { loading, error }] = useMutation(
      CREATE_COMPLETED_EXERCISE
    );
    const [publishExercise] = useMutation(PUBLISH_COMPLETED_EXERCISE);

    const createCompletedExercise = async (
      data: CreateCompletedExerciseData
    ): Promise<CompletedExercise | null> => {
      try {
        // Primeiro, criamos o exercício realizado
        const createResult = await createExercise({
          variables: {
            workoutLogId: data.workoutLogId,
            exerciseId: data.exerciseId,
            completedSets: data.completedSets,
            completedReps: data.completedReps,
            usedWeight: data.usedWeight,
            difficulty: data.difficulty,
          },
        });

        const exerciseId = createResult?.data?.createCompletedExercise?.id;

        if (!exerciseId) {
          throw new Error("Falha ao criar exercício realizado");
        }

        // Em seguida, publicamos o exercício realizado para que fique visível na API
        await publishExercise({
          variables: { id: exerciseId },
        });

        return createResult?.data?.createCompletedExercise || null;
      } catch (err) {
        console.error("Erro ao criar exercício realizado:", err);
        throw err;
      }
    };

    return {
      createCompletedExercise,
      loading,
      error,
    };
  };
