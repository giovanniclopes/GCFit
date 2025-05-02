import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  className = "",
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
      <h3 className="text-lg font-roboto-condensed font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
    </motion.div>
  );
};

interface MealCardProps {
  title: string;
  time: string;
  description: string;
  isActive?: boolean;
  className?: string;
}

export const MealCard = ({
  title,
  time,
  description,
  isActive = false,
  className = "",
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
      </div>
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

interface WorkoutCardProps {
  title: string;
  exercises: number;
  muscleGroup: string;
  className?: string;
}

export const WorkoutCard = ({
  title,
  exercises,
  muscleGroup,
  className = "",
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
        <h3 className="font-roboto-condensed font-bold text-lg text-fitness-700 dark:text-fitness-400">
          {title}
        </h3>
      </div>
      <div className="p-4">
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
      </div>
    </motion.div>
  );
};
