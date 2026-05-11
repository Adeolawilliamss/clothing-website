"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define types
type AlertType = {
  type: 'success' | 'error';
  msg: string;
};

type AlertContextType = {
  alert: AlertType | null;
  showAlert: (type: 'success' | 'error', msg: string, time?: number) => void;
};

// 2. Create context with default value
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// 3. Hook
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};

// 4. Provider
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertType | null>(null);

  const showAlert = (
    type: 'success' | 'error',
    msg: string,
    time = 3
  ) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), time * 2000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};