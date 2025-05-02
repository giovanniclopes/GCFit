import { gql } from "@apollo/client";
import { EXERCISE_FRAGMENT, WORKOUT_FRAGMENT } from "./queries";

// Mutation para criar um registro de progresso
export const CREATE_PROGRESS_RECORD = gql`
  mutation CreateProgressRecord(
    $date: Date!
    $weight: Float!
    $armMeasurement: Float
    $legMeasurement: Float
    $chestMeasurement: Float
    $waistMeasurement: Float
    $notes: RichTextAST
  ) {
    createProgressRecord(
      data: {
        date: $date
        weight: $weight
        armMeasurement: $armMeasurement
        legMeasurement: $legMeasurement
        chestMeasurement: $chestMeasurement
        waistMeasurement: $waistMeasurement
        notes: $notes
      }
    ) {
      id
      date
      weight
      armMeasurement
      legMeasurement
      chestMeasurement
      waistMeasurement
      notes {
        html
      }
    }
  }
`;

// Mutation para publicar um registro de progresso (necessário no Hygraph para torná-lo visível)
export const PUBLISH_PROGRESS_RECORD = gql`
  mutation PublishProgressRecord($id: ID!) {
    publishProgressRecord(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

// Mutation para criar um registro de treino
export const CREATE_WORKOUT_LOG = gql`
  mutation CreateWorkoutLog(
    $date: Date!
    $workoutId: ID!
    $totalDuration: Int!
    $feedback: WorkoutFeedback!
    $notes: RichTextAST
  ) {
    createWorkoutLog(
      data: {
        date: $date
        workout: { connect: { id: $workoutId } }
        totalDuration: $totalDuration
        feedback: $feedback
        notes: $notes
      }
    ) {
      id
      date
      totalDuration
      feedback
      notes {
        html
      }
      workout {
        ...WorkoutFields
      }
    }
  }
  ${WORKOUT_FRAGMENT}
`;

// Mutation para publicar um registro de treino
export const PUBLISH_WORKOUT_LOG = gql`
  mutation PublishWorkoutLog($id: ID!) {
    publishWorkoutLog(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

// Mutation para criar um exercício realizado
export const CREATE_COMPLETED_EXERCISE = gql`
  mutation CreateCompletedExercise(
    $workoutLogId: ID!
    $exerciseId: ID!
    $completedSets: Int!
    $completedReps: String!
    $usedWeight: String!
    $difficulty: Int!
  ) {
    createCompletedExercise(
      data: {
        workoutLog: { connect: { id: $workoutLogId } }
        exercise: { connect: { id: $exerciseId } }
        completedSets: $completedSets
        completedReps: $completedReps
        usedWeight: $usedWeight
        difficulty: $difficulty
      }
    ) {
      id
      completedSets
      completedReps
      usedWeight
      difficulty
      exercise {
        ...ExerciseFields
      }
    }
  }
  ${EXERCISE_FRAGMENT}
`;

// Mutation para publicar um exercício realizado
export const PUBLISH_COMPLETED_EXERCISE = gql`
  mutation PublishCompletedExercise($id: ID!) {
    publishCompletedExercise(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;
