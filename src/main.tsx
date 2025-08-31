import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from 'primereact/api';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <ToastContainer stacked/>
    <RecoilRoot>
        <App />
    </RecoilRoot>
    </PrimeReactProvider>
  </StrictMode>
);
