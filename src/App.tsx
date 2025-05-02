import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";

import { Footer } from "./components/layout/Footer";
import { MainLayout, PageLayout } from "./components/layout/Layout";
import { Navbar } from "./components/layout/Navbar";
import { Dashboard } from "./pages/Dashboard";

import "./App.css";

dayjs.locale("pt-br");

function App() {
  const [currentDate, setCurrentDate] = useState(formatDate());

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
      <MainLayout>
        <Dashboard />
      </MainLayout>
      <Footer />
    </PageLayout>
  );
}

export default App;
