import { DayOfWeek, MealType } from "../types";

export const MEAL_TYPES: Record<MealType, string> = {
  breakfast: "Desjejum",
  "post-workout": "Pós-treino",
  snack: "Colação",
  lunch: "Almoço",
  "afternoon-snack": "Lanche da Tarde",
  dinner: "Jantar",
  supper: "Ceia",
};

export const DAYS_OF_WEEK: Record<DayOfWeek, string> = {
  monday: "Segunda-feira",
  tuesday: "Terça-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sábado",
  sunday: "Domingo",
};

export const WORKOUT_SCHEDULE: Record<DayOfWeek, string> = {
  monday: "Peito e Tríceps",
  tuesday: "Pernas",
  wednesday: "Costas e Bíceps",
  thursday: "Ombros e Abdômen",
  friday: "Treino Completo (Full Body)",
  saturday: "Descanso",
  sunday: "Descanso",
};

export const DEFAULT_MEALS_SCHEDULE = [
  { type: "breakfast", time: "05:45" },
  { type: "post-workout", time: "07:50" },
  { type: "snack", time: "09:30" },
  { type: "lunch", time: "12:00" },
  { type: "afternoon-snack", time: "15:30" },
  { type: "dinner", time: "17:35" },
  { type: "supper", time: "20:30" },
] as const;
