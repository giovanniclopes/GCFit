import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  loading?: boolean;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  className = "",
  loading = false,
}: FeatureCardProps) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md ${className}`}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-fitness-100 dark:bg-fitness-900 text-fitness-600 rounded-full mb-4">
        {icon}
      </div>
      {loading ? (
        <>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mb-1"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-roboto-condensed font-bold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        </>
      )}
    </motion.div>
  );
};

interface MealCardProps {
  title: string;
  time: string;
  description: string;
  isActive?: boolean;
  className?: string;
  loading?: boolean;
  nutrients?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
  };
}

export const MealCard = ({
  title,
  time,
  description,
  isActive = false,
  className = "",
  loading = false,
  nutrients,
}: MealCardProps) => {
  return (
    <motion.div
      className={`
        bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border-l-4
        ${
          isActive
            ? "border-energy-500"
            : "border-gray-200 dark:border-gray-700"
        }
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`
        px-4 py-3 flex justify-between items-center 
        ${
          isActive
            ? "bg-energy-50 dark:bg-energy-900/20"
            : "bg-gray-50 dark:bg-gray-700"
        }
      `}
      >
        {loading ? (
          <>
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-1/3"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-16"></div>
          </>
        ) : (
          <>
            <h3
              className={`
              font-roboto-condensed font-bold text-lg
              ${
                isActive
                  ? "text-energy-700 dark:text-energy-400"
                  : "text-gray-700 dark:text-gray-200"
              }
            `}
            >
              {title}
            </h3>
            <span
              className={`
              text-sm font-medium px-2 py-1 rounded
              ${
                isActive
                  ? "bg-energy-100 text-energy-700 dark:bg-energy-800 dark:text-energy-300"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
              }
            `}
            >
              {time}
            </span>
          </>
        )}
      </div>
      <div className="p-4">
        {loading ? (
          <>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 mb-3"></div>

            {/* Skeleton para os nutrientes */}
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 grid grid-cols-4 gap-2 text-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12 mx-auto mb-1"></div>
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8 mx-auto"></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {description}
            </p>
            {nutrients && (
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Calorias
                  </div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {nutrients.calories || 0}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Proteínas
                  </div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {nutrients.protein || 0}g
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Carbos
                  </div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {nutrients.carbs || 0}g
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Gorduras
                  </div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    {nutrients.fats || 0}g
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

interface WorkoutCardProps {
  title: string;
  exercises: number;
  muscleGroup: string;
  className?: string;
  loading?: boolean;
}

export const WorkoutCard = ({
  title,
  exercises,
  muscleGroup,
  className = "",
  loading = false,
}: WorkoutCardProps) => {
  return (
    <motion.div
      className={`
        bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md
        border-l-4 border-fitness-500
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-4 py-3 bg-fitness-50 dark:bg-fitness-900/20">
        {loading ? (
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
        ) : (
          <h3 className="font-roboto-condensed font-bold text-lg text-fitness-700 dark:text-fitness-400">
            {title}
          </h3>
        )}
      </div>
      <div className="p-4">
        {loading ? (
          <>
            <div className="flex mb-3">
              <div className="mr-4 flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24 mb-2"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20 mb-2"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
              </div>
            </div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
          </>
        ) : (
          <>
            <div className="flex mb-3">
              <div className="mr-4">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Grupo Muscular
                </div>
                <div className="font-medium text-gray-700 dark:text-gray-200">
                  {muscleGroup}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Exercícios
                </div>
                <div className="font-medium text-gray-700 dark:text-gray-200">
                  {exercises}
                </div>
              </div>
            </div>
            <button className="text-fitness-600 hover:text-fitness-700 text-sm font-medium">
              Ver detalhes →
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};
