// Tipos correspondentes aos modelos definidos no HygraphCMS
// Estes tipos serão usados nas queries e mutations GraphQL

export type MealType =
  | "breakfast" // Desjejum
  | "post-workout" // Pós-treino
  | "snack" // Colação
  | "lunch" // Almoço
  | "afternoon-snack" // Lanche da tarde
  | "dinner" // Jantar
  | "supper"; // Ceia

export type DayOfWeek =
  | "monday" // Segunda
  | "tuesday" // Terça
  | "wednesday" // Quarta
  | "thursday" // Quinta
  | "friday" // Sexta
  | "saturday" // Sábado
  | "sunday"; // Domingo

export type FoodCategory =
  | "protein" // Proteína
  | "carb" // Carboidrato
  | "fat" // Gordura
  | "fruit" // Fruta
  | "vegetable"; // Vegetal

export type WorkoutObjective =
  | "hypertrophy" // Hipertrofia
  | "strength" // Força
  | "endurance"; // Resistência

export type ExerciseDifficulty =
  | "beginner" // Iniciante
  | "intermediate" // Intermediário
  | "advanced"; // Avançado

export type WorkoutFeedback =
  | "excellent" // Excelente
  | "good" // Bom
  | "regular" // Regular
  | "bad"; // Ruim

export type ActivityType =
  | "work" // Trabalho
  | "study" // Estudo
  | "workout" // Treino
  | "meal" // Refeição
  | "commute" // Deslocamento
  | "rest"; // Descanso

// Interfaces baseadas nos modelos do HygraphCMS
export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  portion: string;
  measure: string;
  amount: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  image?: {
    url: string;
  };
}

export interface SubstitutionTable {
  id: string;
  name: string;
  description: {
    html: string;
  };
  foodGroup: string;
  options: Food[];
}

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  defaultTime: string;
  description: {
    html: string;
  };
  foods: Food[];
  substitutionTable?: SubstitutionTable;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: {
    html: string;
  };
  targetedMuscles: string;
  sets: number;
  reps: string;
  restTime: number;
  demonstration?: {
    url: string;
  };
  requiredEquipment: string;
  difficulty: ExerciseDifficulty;
  variants: Exercise[];
}

export interface Workout {
  id: string;
  dayOfWeek: DayOfWeek;
  muscleGroups: string;
  exercises: Exercise[];
  objective: WorkoutObjective;
  estimatedDuration: number;
  notes: {
    html: string;
  };
}

export interface CompletedExercise {
  id: string;
  exercise: Exercise;
  completedSets: number;
  completedReps: string;
  usedWeight: string;
  difficulty: number;
}

export interface WorkoutLog {
  id: string;
  date: string;
  workout: Workout;
  completedExercises: CompletedExercise[];
  totalDuration: number;
  feedback: WorkoutFeedback;
  notes: {
    html: string;
  };
}

export interface ProgressRecord {
  id: string;
  date: string;
  weight: number;
  armMeasurement: number;
  legMeasurement: number;
  chestMeasurement: number;
  waistMeasurement: number;
  photo?: {
    url: string;
  };
  notes: {
    html: string;
  };
}

export interface Activity {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  type: ActivityType;
  location: string;
  description: {
    html: string;
  };
  meal?: Meal;
  workout?: Workout;
}

export interface Routine {
  id: string;
  dayOfWeek: DayOfWeek;
  activities: Activity[];
}
