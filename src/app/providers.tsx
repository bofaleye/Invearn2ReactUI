"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ToastContainer/>
      {children}
    </Provider>
  )
}