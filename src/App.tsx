import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Footer } from "./components/layout/Footer";
import { MainLayout, PageLayout } from "./components/layout/Layout";
import { Navbar } from "./components/layout/Navbar";
import ApiHealthIndicator from "./components/ui/ApiHealthIndicator";
import HygraphStatusBar from "./components/ui/HygraphStatusBar";
import { useSync } from "./context/SyncContext";
import { Dashboard } from "./pages/Dashboard";

import "./App.css";

dayjs.locale("pt-br");

function App() {
  const [currentDate, setCurrentDate] = useState(formatDate());
  const { isOnline, isSyncing, pendingActionsCount } = useSync();

  function formatDate() {
    return dayjs().format("dddd, DD [de] MMMM [de] YYYY");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(formatDate());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout>
      <Navbar currentDate={currentDate} />

      {/* Notificação de modo offline */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-red-500 text-white text-center py-2 px-4 fixed top-0 left-0 right-0 z-50"
          >
            Você está offline. Algumas funcionalidades podem estar limitadas.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notificação de sincronização */}
      <AnimatePresence>
        {isOnline && isSyncing && pendingActionsCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-yellow-500 text-white text-center py-2 px-4 fixed top-0 left-0 right-0 z-50"
          >
            Sincronizando dados ({pendingActionsCount} pendentes)...
          </motion.div>
        )}
      </AnimatePresence>

      <MainLayout>
        <Dashboard />
      </MainLayout>
      <Footer>
        {/* Indicador de saúde da API */}
        <ApiHealthIndicator className="mt-2" />
      </Footer>

      {/* Barra de status do Hygraph */}
      <HygraphStatusBar />
    </PageLayout>
  );
}

export default App;
