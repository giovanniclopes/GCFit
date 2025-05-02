import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_MEAL_BY_TYPE, GET_MEALS_FOR_DAY } from "../apollo/queries";
import { DayOfWeek, Meal, MealType } from "../apollo/types";
import { getWithTimestamp, saveWithTimestamp } from "../localStorage";

const MEAL_CACHE_KEY_PREFIX = "cache:meal:";
const DAY_MEALS_CACHE_KEY_PREFIX = "cache:day-meals:";

/**
 * Hook para obter uma refeição específica pelo tipo
 */
export const useMealByType = (mealType: MealType) => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { data, loading, refetch } = useQuery(GET_MEAL_BY_TYPE, {
    variables: { type: mealType },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error("Erro ao buscar refeição:", error);
      setError(error);

      // Tentar carregar do cache local em caso de erro
      const cachedMeal = getWithTimestamp<Meal>(
        `${MEAL_CACHE_KEY_PREFIX}${mealType}`
      );
      if (cachedMeal) {
        setMeal(cachedMeal);
      }
    },
  });

  useEffect(() => {
    if (data?.meal) {
      const fetchedMeal = data.meal;
      setMeal(fetchedMeal);

      // Salvar no cache local com timestamp
      saveWithTimestamp(`${MEAL_CACHE_KEY_PREFIX}${mealType}`, fetchedMeal);
    }
  }, [data, mealType]);

  // Se não temos dados e não estamos carregando, tentar do cache local
  useEffect(() => {
    if (!loading && !data?.meal && !meal) {
      const cachedMeal = getWithTimestamp<Meal>(
        `${MEAL_CACHE_KEY_PREFIX}${mealType}`
      );
      if (cachedMeal) {
        setMeal(cachedMeal);
      }
    }
  }, [loading, data, mealType, meal]);

  return { meal, loading, error, refetch };
};

/**
 * Hook para obter todas as refeições para um dia específico
 */
export const useMealsForDay = (dayOfWeek: DayOfWeek) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { data, loading, refetch } = useQuery(GET_MEALS_FOR_DAY, {
    variables: { day: dayOfWeek },
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.error("Erro ao buscar refeições do dia:", error);
      setError(error);

      // Tentar carregar do cache local em caso de erro
      const cachedMeals = getWithTimestamp<Meal[]>(
        `${DAY_MEALS_CACHE_KEY_PREFIX}${dayOfWeek}`
      );
      if (cachedMeals) {
        setMeals(cachedMeals);
      }
    },
  });

  useEffect(() => {
    if (data?.meals) {
      const fetchedMeals = data.meals;
      setMeals(fetchedMeals);

      // Salvar no cache local com timestamp
      saveWithTimestamp(
        `${DAY_MEALS_CACHE_KEY_PREFIX}${dayOfWeek}`,
        fetchedMeals
      );
    }
  }, [data, dayOfWeek]);

  // Se não temos dados e não estamos carregando, tentar do cache local
  useEffect(() => {
    if (!loading && !data?.meals && meals.length === 0) {
      const cachedMeals = getWithTimestamp<Meal[]>(
        `${DAY_MEALS_CACHE_KEY_PREFIX}${dayOfWeek}`
      );
      if (cachedMeals) {
        setMeals(cachedMeals);
      }
    }
  }, [loading, data, dayOfWeek, meals]);

  return { meals, loading, error, refetch };
};
