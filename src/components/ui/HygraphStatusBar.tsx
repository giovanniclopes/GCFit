import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { API_HEALTH_CHECK } from "../../services/apollo/utils";

export const HygraphStatusBar = () => {
  const { loading, error } = useQuery(API_HEALTH_CHECK, {
    fetchPolicy: "network-only",
    pollInterval: 60000, // Verificar a cada 60 segundos
  });

  if (loading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 text-xs text-yellow-900 py-0.5 text-center">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-full h-0.5 bg-yellow-500 absolute top-0 left-0"
        />
        Verificando conexão com Hygraph CMS...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-xs text-white py-0.5 text-center">
        <span className="mr-2">⚠️</span>
        Erro de conexão com Hygraph CMS
      </div>
    );
  }

  // Conexão OK
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-xs text-white py-0.5 text-center opacity-80 hover:opacity-100 transition-opacity duration-200">
      <span className="mr-2">✓</span>
      Conectado ao Hygraph CMS
    </div>
  );
};

export default HygraphStatusBar;
