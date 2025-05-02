import { gql } from "@apollo/client";

// Fragmento para dados comuns de refeições
export const MEAL_FRAGMENT = gql`
  fragment MealFields on Meal {
    id
    name
    type
    defaultTime
    description {
      html
    }
    calories
    proteins
    carbs
    fats
    foods {
      id
      name
      category
      portion
      measure
      amount
      calories
      proteins
      carbs
      fats
      image {
        url
      }
    }
  }
`;

// Fragmento para dados comuns de exercícios
export const EXERCISE_FRAGMENT = gql`
  fragment ExerciseFields on Exercise {
    id
    name
    description {
      html
    }
    targetedMuscles
    sets
    reps
    restTime
    demonstration {
      url
    }
    requiredEquipment
    difficulty
  }
`;

// Fragmento para dados comuns de treinos
export const WORKOUT_FRAGMENT = gql`
  fragment WorkoutFields on Workout {
    id
    dayOfWeek
    muscleGroups
    objective
    estimatedDuration
    notes {
      html
    }
    exercises {
      ...ExerciseFields
    }
  }
  ${EXERCISE_FRAGMENT}
`;

// Query para obter todas as refeições
export const GET_ALL_MEALS = gql`
  query GetAllMeals {
    meals {
      ...MealFields
      substitutionTable {
        id
        name
        description {
          html
        }
        foodGroup
        options {
          id
          name
          category
          portion
        }
      }
    }
  }
  ${MEAL_FRAGMENT}
`;

// Query para obter uma refeição específica pelo tipo
export const GET_MEAL_BY_TYPE = gql`
  query GetMealByType($type: MealType!) {
    meal(where: { type: $type }) {
      ...MealFields
      substitutionTable {
        id
        name
        description {
          html
        }
        foodGroup
        options {
          id
          name
          category
          portion
        }
      }
    }
  }
  ${MEAL_FRAGMENT}
`;

// Query para obter todos os treinos
export const GET_ALL_WORKOUTS = gql`
  query GetAllWorkouts {
    workouts {
      ...WorkoutFields
    }
  }
  ${WORKOUT_FRAGMENT}
`;

// Query para obter treino por dia da semana
export const GET_WORKOUT_BY_DAY = gql`
  query GetWorkoutByDay($dayOfWeek: DayOfWeek!) {
    workout(where: { dayOfWeek: $dayOfWeek }) {
      ...WorkoutFields
    }
  }
  ${WORKOUT_FRAGMENT}
`;

// Query para obter registros de progresso
export const GET_PROGRESS_RECORDS = gql`
  query GetProgressRecords($limit: Int) {
    progressRecords(first: $limit, orderBy: date_DESC) {
      id
      date
      weight
      armMeasurement
      legMeasurement
      chestMeasurement
      waistMeasurement
      photo {
        url
      }
      notes {
        html
      }
    }
  }
`;

// Query para obter rotina por dia da semana
export const GET_ROUTINE_BY_DAY = gql`
  query GetRoutineByDay($dayOfWeek: DayOfWeek!) {
    routine(where: { dayOfWeek: $dayOfWeek }) {
      id
      dayOfWeek
      activities {
        id
        name
        startTime
        endTime
        type
        location
        description {
          html
        }
        meal {
          ...MealFields
        }
        workout {
          ...WorkoutFields
        }
      }
    }
  }
  ${MEAL_FRAGMENT}
  ${WORKOUT_FRAGMENT}
`;

// Query para obter registros de treino
export const GET_WORKOUT_LOGS = gql`
  query GetWorkoutLogs($limit: Int) {
    workoutLogs(first: $limit, orderBy: date_DESC) {
      id
      date
      workout {
        id
        dayOfWeek
        muscleGroups
      }
      completedExercises {
        id
        exercise {
          id
          name
        }
        completedSets
        completedReps
        usedWeight
        difficulty
      }
      totalDuration
      feedback
      notes {
        html
      }
    }
  }
`;

// Query para obter treinos semanais
export const GET_WEEKLY_WORKOUTS = gql`
  query GetWeeklyWorkouts {
    workouts(orderBy: dayOfWeek_ASC) {
      ...WorkoutFields
    }
  }
  ${WORKOUT_FRAGMENT}
`;

// Query para obter um exercício específico
export const GET_EXERCISE_BY_ID = gql`
  query GetExerciseById($id: ID!) {
    exercise(where: { id: $id }) {
      ...ExerciseFields
    }
  }
  ${EXERCISE_FRAGMENT}
`;

// Query para obter refeições para um dia específico
export const GET_MEALS_FOR_DAY = gql`
  query GetMealsForDay($day: DayOfWeek!) {
    meals(where: { scheduledDays_contains_some: [$day] }) {
      ...MealFields
    }
  }
  ${MEAL_FRAGMENT}
`;

// Query para obter o último registro de progresso
export const GET_LATEST_PROGRESS = gql`
  query GetLatestProgress {
    progressRecords(first: 1, orderBy: date_DESC) {
      id
      date
      weight
      armMeasurement
      legMeasurement
      chestMeasurement
      waistMeasurement
      photo {
        url
      }
      notes {
        html
      }
    }
  }
`;
