import { create } from "zustand";
import type { ReactNode } from "react";

interface HeaderStore {
  title: ReactNode;
  setTitle: (title: ReactNode) => void;
  actions: ReactNode;
  setActions: (actions: ReactNode) => void;
}

const useHeaderStore = create<HeaderStore>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
  actions: null,
  setActions: (actions) => set({ actions }),
}));

export default useHeaderStore;
