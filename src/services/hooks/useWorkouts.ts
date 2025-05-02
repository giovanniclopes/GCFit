import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_EXERCISE_BY_ID,
  GET_WEEKLY_WORKOUTS,
  GET_WORKOUT_BY_DAY,
} from "../apollo/queries";
import { DayOfWeek, Exercise, Workout } from "../apollo/types";
import { getWithTimestamp, saveWithTimestamp } from "../localStorage";

const WORKOUT_CACHE_KEY_PREFIX = "cache:workout:";
const WEEKLY_WORKOUTS_CACHE_KEY = "cache:weekly-workouts";
const EXERCISE_CACHE_KEY_PREFIX = "cache:exercise:";

/**
 * Hook para obter o treino de um dia específico
 */
export const useWorkoutByDay = (dayOfWeek: DayOfWeek) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { data, loading, refetch } = useQuery(GET_WORKOUT_BY_DAY, {
    variables: { day: dayOfWeek },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error("Erro ao buscar treino:", error);
      setError(error);

      // Tentar carregar do cache local em caso de erro
      const cachedWorkout = getWithTimestamp<Workout>(
        `${WORKOUT_CACHE_KEY_PREFIX}${dayOfWeek}`
      );
      if (cachedWorkout) {
        setWorkout(cachedWorkout);
      }
    },
  });

  useEffect(() => {
    if (data?.workout) {
      const fetchedWorkout = data.workout;
      setWorkout(fetchedWorkout);

      // Salvar no cache local com timestamp
      saveWithTimestamp(
        `${WORKOUT_CACHE_KEY_PREFIX}${dayOfWeek}`,
        fetchedWorkout
      );
    }
  }, [data, dayOfWeek]);

  // Se não temos dados e não estamos carregando, tentar do cache local
  useEffect(() => {
    if (!loading && !data?.workout && !workout) {
      const cachedWorkout = getWithTimestamp<Workout>(
        `${WORKOUT_CACHE_KEY_PREFIX}${dayOfWeek}`
      );
      if (cachedWorkout) {
        setWorkout(cachedWorkout);
      }
    }
  }, [loading, data, dayOfWeek, workout]);

  return { workout, loading, error, refetch };
};

/**
 * Hook para obter todos os treinos da semana
 */
export const useWeeklyWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { data, loading, refetch } = useQuery(GET_WEEKLY_WORKOUTS, {
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error("Erro ao buscar treinos da semana:", error);
      setError(error);

      // Tentar carregar do cache local em caso de erro
      const cachedWorkouts = getWithTimestamp<Workout[]>(
        WEEKLY_WORKOUTS_CACHE_KEY
      );
      if (cachedWorkouts) {
        setWorkouts(cachedWorkouts);
      }
    },
  });

  useEffect(() => {
    if (data?.workouts) {
      const fetchedWorkouts = data.workouts;
      setWorkouts(fetchedWorkouts);

      // Salvar no cache local com timestamp
      saveWithTimestamp(WEEKLY_WORKOUTS_CACHE_KEY, fetchedWorkouts);
    }
  }, [data]);

  // Se não temos dados e não estamos carregando, tentar do cache local
  useEffect(() => {
    if (!loading && !data?.workouts && workouts.length === 0) {
      const cachedWorkouts = getWithTimestamp<Workout[]>(
        WEEKLY_WORKOUTS_CACHE_KEY
      );
      if (cachedWorkouts) {
        setWorkouts(cachedWorkouts);
      }
    }
  }, [loading, data, workouts]);

  return { workouts, loading, error, refetch };
};

/**
 * Hook para obter detalhes de um exercício específico
 */
export const useExerciseById = (exerciseId: string) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { data, loading, refetch } = useQuery(GET_EXERCISE_BY_ID, {
    variables: { id: exerciseId },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error("Erro ao buscar exercício:", error);
      setError(error);

      // Tentar carregar do cache local em caso de erro
      const cachedExercise = getWithTimestamp<Exercise>(
        `${EXERCISE_CACHE_KEY_PREFIX}${exerciseId}`
      );
      if (cachedExercise) {
        setExercise(cachedExercise);
      }
    },
  });

  useEffect(() => {
    if (data?.exercise) {
      const fetchedExercise = data.exercise;
      setExercise(fetchedExercise);

      // Salvar no cache local com timestamp
      saveWithTimestamp(
        `${EXERCISE_CACHE_KEY_PREFIX}${exerciseId}`,
        fetchedExercise
      );
    }
  }, [data, exerciseId]);

  // Se não temos dados e não estamos carregando, tentar do cache local
  useEffect(() => {
    if (!loading && !data?.exercise && !exercise) {
      const cachedExercise = getWithTimestamp<Exercise>(
        `${EXERCISE_CACHE_KEY_PREFIX}${exerciseId}`
      );
      if (cachedExercise) {
        setExercise(cachedExercise);
      }
    }
  }, [loading, data, exerciseId, exercise]);

  return { exercise, loading, error, refetch };
};
