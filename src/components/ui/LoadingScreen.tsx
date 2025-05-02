import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mb-6"
        >
          <img
            src="/src/assets/images/logo.svg"
            alt="GCFit Logo"
            className="h-20 w-auto mx-auto"
          />
        </motion.div>

        <h2 className="text-xl font-roboto-condensed font-bold text-gray-800 dark:text-white mb-4">
          Carregando GC Fit
        </h2>

        <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-fitness-500 rounded-full"
            animate={{
              width: ["0%", "100%"],
              x: [0, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
