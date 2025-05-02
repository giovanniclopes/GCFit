import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DEFAULT_MEALS_SCHEDULE } from "../constants";
import { DayOfWeek, MealType } from "../types";

export function useCurrentDay(): DayOfWeek {
  const [currentDay, setCurrentDay] = useState<DayOfWeek>(getDayOfWeek());

  function getDayOfWeek(): DayOfWeek {
    const day = dayjs().format("dddd").toLowerCase();
    switch (day) {
      case "segunda-feira":
        return "monday";
      case "terça-feira":
        return "tuesday";
      case "quarta-feira":
        return "wednesday";
      case "quinta-feira":
        return "thursday";
      case "sexta-feira":
        return "friday";
      case "sábado":
        return "saturday";
      case "domingo":
        return "sunday";
      default:
        return "monday";
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay(getDayOfWeek());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return currentDay;
}

export function useCurrentMeal() {
  const [currentMeal, setCurrentMeal] = useState<MealType | null>(null);
  const [nextMeal, setNextMeal] = useState<MealType | null>(null);
  const [timeToNextMeal, setTimeToNextMeal] = useState<number | null>(null);

  useEffect(() => {
    const updateMeals = () => {
      const now = dayjs();
      const currentTimeStr = now.format("HH:mm");

      const sortedMeals = [...DEFAULT_MEALS_SCHEDULE].sort((a, b) => {
        return dayjs(`2023-01-01 ${a.time}`).diff(
          dayjs(`2023-01-01 ${b.time}`)
        );
      });

      let currentMealObj = null;
      for (let i = sortedMeals.length - 1; i >= 0; i--) {
        if (currentTimeStr >= sortedMeals[i].time) {
          currentMealObj = sortedMeals[i];
          break;
        }
      }

      let nextMealObj = null;
      for (let i = 0; i < sortedMeals.length; i++) {
        if (currentTimeStr < sortedMeals[i].time) {
          nextMealObj = sortedMeals[i];
          break;
        }
      }

      if (!nextMealObj && sortedMeals.length > 0) {
        nextMealObj = sortedMeals[0];
      }

      setCurrentMeal(currentMealObj?.type || null);
      setNextMeal(nextMealObj?.type || null);

      if (nextMealObj) {
        const nextMealTime = dayjs(`2023-01-01 ${nextMealObj.time}`);
        let diff = nextMealTime.diff(
          dayjs(`2023-01-01 ${currentTimeStr}`),
          "minute"
        );

        if (diff < 0) {
          diff = nextMealTime
            .add(1, "day")
            .diff(dayjs(`2023-01-01 ${currentTimeStr}`), "minute");
        }

        setTimeToNextMeal(diff);
      } else {
        setTimeToNextMeal(null);
      }
    };

    updateMeals();
    const interval = setInterval(updateMeals, 60000);

    return () => clearInterval(interval);
  }, []);

  return { currentMeal, nextMeal, timeToNextMeal };
}

export function useFormattedTimeRemaining(minutes: number | null) {
  if (minutes === null) return "--:--";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${mins}min`;
  } else {
    return `${mins} min`;
  }
}
