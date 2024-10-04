import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

import Login from "./pages/login/Login";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./routes/AuthContext";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      }
    ],
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
