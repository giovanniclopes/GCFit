import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LoadingScreen from "./components/ui/LoadingScreen";
import { SyncProvider } from "./context/SyncContext";
import "./index.css";
import { createApolloClient } from "./services/apollo";

const AppWithProviders = () => {
  const [client, setClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApollo = async () => {
      try {
        const apolloClient = await createApolloClient();
        setClient(apolloClient);
      } catch (error) {
        console.error("Erro ao inicializar Apollo Client:", error);
      } finally {
        setLoading(false);
      }
    };

    initApollo();
  }, []);

  if (loading || !client) {
    return <LoadingScreen />;
  }

  return (
    <ApolloProvider client={client}>
      <SyncProvider>
        <App />
      </SyncProvider>
    </ApolloProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>
);
