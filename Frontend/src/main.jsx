import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1a1a", // slightly lighter than your background
            color: "#f5f5f5", // light text
            border: "1px solid #333",
            boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
            fontWeight: "500",
          },
          success: {
            style: {
              background: "#1a7b3d", // green
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ef4444", // red
              color: "#fff",
            },
          },
          loading: {
            style: {
              background: "#2563eb", // blue
              color: "#fff",
            },
          },
        }}
      />
    </Provider>
  </StrictMode>
);
