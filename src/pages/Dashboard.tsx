import {
  ArrowRightIcon,
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  FireIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import { Grid, Section } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Card, CountdownCard, ProgressBar } from "../components/ui/Card";
import {
  FeatureCard,
  MealCard,
  WorkoutCard,
} from "../components/ui/FeatureCards";
import { DAYS_OF_WEEK, MEAL_TYPES, WORKOUT_SCHEDULE } from "../constants";
import {
  useCurrentDay,
  useCurrentMeal,
  useFormattedTimeRemaining,
} from "../hooks/useCurrentContext";

export const Dashboard = () => {
  const currentDay = useCurrentDay();
  const { currentMeal, nextMeal, timeToNextMeal } = useCurrentMeal();
  const timeRemaining = useFormattedTimeRemaining(timeToNextMeal);

  const currentMealData = {
    title: currentMeal ? MEAL_TYPES[currentMeal] : "Sem refeição atual",
    time: dayjs().format("HH:mm"),
    description:
      currentMeal === "breakfast"
        ? "Pão integral + creme de ricota light + leite desnatado com café"
        : currentMeal === "lunch" || currentMeal === "dinner"
        ? "Arroz, feijão, carne, batata, hortaliças"
        : currentMeal === "post-workout"
        ? "Whey protein com água"
        : currentMeal === "snack" || currentMeal === "supper"
        ? "1 porção de fruta"
        : "Opções de lanches variados",
  };

  const nextMealData = {
    title: nextMeal ? MEAL_TYPES[nextMeal] : "Próxima refeição",
    time: timeToNextMeal ? `Em ${timeRemaining}` : "--:--",
    description:
      nextMeal === "breakfast"
        ? "Pão integral + creme de ricota light + leite desnatado com café"
        : nextMeal === "lunch" || nextMeal === "dinner"
        ? "Arroz, feijão, carne, batata, hortaliças"
        : nextMeal === "post-workout"
        ? "Whey protein com água"
        : nextMeal === "snack" || nextMeal === "supper"
        ? "1 porção de fruta"
        : "Opções de lanches variados",
  };

  const workoutData = {
    title: `Treino de ${DAYS_OF_WEEK[currentDay]}`,
    muscleGroup: WORKOUT_SCHEDULE[currentDay],
    exercises: currentDay === "saturday" || currentDay === "sunday" ? 0 : 8,
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-montserrat font-bold text-2xl md:text-3xl text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Boas vindas! Aqui está seu resumo diário de nutrição e treinos.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
          <CalendarIcon className="h-5 w-5" />
          <span>{dayjs().format("DD/MM/YYYY")}</span>
          <span className="mx-2">•</span>
          <ClockIcon className="h-5 w-5" />
          <span>{dayjs().format("HH:mm")}</span>
        </div>
      </div>

      <Section title="Nutrição">
        <Grid cols={2}>
          <MealCard
            title={currentMealData.title}
            time={currentMealData.time}
            description={currentMealData.description}
            isActive={true}
          />
          <MealCard
            title={nextMealData.title}
            time={nextMealData.time}
            description={nextMealData.description}
          />
        </Grid>
      </Section>

      <Section title="Treino de Hoje">
        <div className="mb-4">
          {currentDay !== "saturday" && currentDay !== "sunday" ? (
            <WorkoutCard
              title={workoutData.title}
              exercises={workoutData.exercises}
              muscleGroup={workoutData.muscleGroup}
            />
          ) : (
            <Card>
              <div className="text-center py-6">
                <h3 className="font-roboto-condensed font-bold text-lg text-gray-700 dark:text-gray-200 mb-2">
                  Hoje é dia de descanso!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  O descanso é tão importante quanto o treino para o seu
                  progresso.
                </p>
                <Button variant="outline">Ver cronograma da semana</Button>
              </div>
            </Card>
          )}
        </div>
      </Section>

      <Grid cols={3}>
        <CountdownCard
          title="Próxima Refeição"
          timeRemaining={timeRemaining}
          label={nextMeal ? MEAL_TYPES[nextMeal] : "Carregando..."}
        />

        <Card className="flex flex-col justify-between h-full">
          <div>
            <h3 className="font-roboto-condensed font-bold text-lg text-gray-700 dark:text-gray-200 mb-3">
              Progresso Diário
            </h3>
            <ProgressBar value={4} max={6} label="Refeições" className="mb-2" />
            <ProgressBar
              value={
                currentDay !== "saturday" && currentDay !== "sunday" ? 0 : 1
              }
              max={1}
              label="Treinos"
            />
          </div>
          <div className="mt-4 text-right">
            <Button
              variant="outline"
              size="sm"
              icon={<ChartBarIcon className="h-4 w-4" />}
            >
              Ver detalhes
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col justify-between h-full">
          <div>
            <h3 className="font-roboto-condensed font-bold text-lg text-gray-700 dark:text-gray-200 mb-2">
              Registrar Medidas
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Acompanhe seu progresso registrando suas medidas e peso
              regularmente.
            </p>
          </div>
          <div className="mt-2">
            <Button icon={<ScaleIcon className="h-5 w-5" />} fullWidth>
              Registrar Agora
            </Button>
          </div>
        </Card>
      </Grid>

      <Section title="Explore o GCFit">
        <Grid cols={4}>
          <FeatureCard
            icon={<CalendarIcon className="h-6 w-6" />}
            title="Plano Alimentar"
            description="Consulte seu plano alimentar completo com horários e substituições."
          />
          <FeatureCard
            icon={<FireIcon className="h-6 w-6" />}
            title="Treinos"
            description="Acompanhe seus treinos e registre seu progresso de cargas."
          />
          <FeatureCard
            icon={<ChartBarIcon className="h-6 w-6" />}
            title="Progresso"
            description="Visualize seu progresso com gráficos e estatísticas."
          />
          <FeatureCard
            icon={<ClockIcon className="h-6 w-6" />}
            title="Rotina"
            description="Organize sua rotina diária com lembretes e notificações."
          />
        </Grid>
      </Section>

      <motion.div
        className="bg-fitness-50 dark:bg-fitness-900/10 rounded-xl p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="font-roboto-condensed font-bold text-xl text-fitness-700 dark:text-fitness-400 mb-2">
          Pronto para começar seu dia fitness?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
          Com o GCFit, você tem tudo que precisa para alcançar seus objetivos.
          Vamos nessa!
        </p>
        <Button
          variant="primary"
          size="lg"
          icon={<ArrowRightIcon className="h-5 w-5" />}
        >
          Explorar o App Completo
        </Button>
      </motion.div>
    </div>
  );
};
