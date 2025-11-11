import React, { createContext, useContext, useState } from "react";
import { type Alert } from "../types/Alert";

interface AlertContextType {
  alerts: Alert[];
  addAlert: (
    message: string,
    type: "success" | "error" | "info" | "warning",
    options?: { title?: string; duration?: number; closable?: boolean }
  ) => void;
  removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [nextId, setNextId] = useState(1);

  const addAlert = (
    message: string,
    type: "success" | "error" | "info" | "warning",
    options?: { title?: string; duration?: number; closable?: boolean }
  ) => {
    const id = nextId;
    setNextId((prev) => prev + 1);
    const duration = options?.duration ?? 5000;
    setAlerts((prev) => [
      ...prev,
      {
        id,
        message,
        type,
        title: options?.title,
        duration,
        closable: options?.closable ?? true,
      },
    ]);

    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert deve ser usado dentro de um AlertProvider");
  }
  return context;
};
