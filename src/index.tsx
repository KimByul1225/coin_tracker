import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {RecoilRoot} from "recoil";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient()


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

