export type Meal = {
  id: string;
  name: string;
  type: MealType;
  time: string;
  description: string;
  foods: Food[];
};

export type MealType =
  | "breakfast"
  | "post-workout"
  | "snack"
  | "lunch"
  | "afternoon-snack"
  | "dinner"
  | "supper";

export type Food = {
  id: string;
  name: string;
  portion: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
};

export type Workout = {
  id: string;
  day: DayOfWeek;
  muscleGroups: string[];
  description: string;
  exercises: Exercise[];
};

export type Exercise = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: string;
  restTime: number;
};

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Activity = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  type: ActivityType;
  location?: string;
};

export type ActivityType =
  | "work"
  | "study"
  | "workout"
  | "meal"
  | "transport"
  | "rest";

export type ProgressRecord = {
  id: string;
  date: string;
  weight: number;
  measurements: {
    arm: number;
    leg: number;
    chest: number;
    waist: number;
  };
};
