"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SideMenuContextValue {
  open: boolean;
  onToggle: () => void;
}

const SideMenuContext = createContext<SideMenuContextValue | null>(null);

export function SideMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  const onToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <SideMenuContext.Provider value={{ open, onToggle }}>
      {children}
    </SideMenuContext.Provider>
  );
}

export function useSideMenu() {
  const context = useContext(SideMenuContext);

  if (!context) {
    throw new Error("useSideMenu must be used within a SideMenuProvider");
  }

  return context;
}
