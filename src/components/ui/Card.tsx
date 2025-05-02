import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}

export const Card = ({
  title,
  children,
  className = "",
  highlight = false,
}: CardProps) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden ${
        highlight ? "border-l-4 border-fitness-500" : ""
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {title && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <h3 className="font-roboto-condensed font-bold text-gray-700 dark:text-gray-200">
            {title}
          </h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
};

export const CountdownCard = ({
  title,
  timeRemaining,
  label,
  className = "",
}: {
  title: string;
  timeRemaining: string;
  label: string;
  className?: string;
}) => {
  return (
    <Card className={`text-center ${className}`}>
      <h3 className="font-roboto-condensed font-bold text-lg text-gray-700 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <div className="font-montserrat font-bold text-3xl text-fitness-600 mb-1">
        {timeRemaining}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </Card>
  );
};

export const ProgressBar = ({
  value,
  max,
  label,
  className = "",
}: {
  value: number;
  max: number;
  label?: string;
  className?: string;
}) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={className}>
      {label && (
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          {label}
        </div>
      )}
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-fitness-500"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
        {percentage}%
      </div>
    </div>
  );
};
