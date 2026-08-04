import { create } from "zustand";
import type { ReactNode } from "react";

interface HeaderStore {
  title: ReactNode;
  setTitle: (title: ReactNode) => void;
}

const useHeaderStore = create<HeaderStore>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
}));

export default useHeaderStore;
