"use client";

import { useTheme } from "next-themes";
import DarkModeToggleButton from "./DarkModeToggleButton";

export default function DarkModeToggleButtonContainer() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <DarkModeToggleButton
      isDarkMode={resolvedTheme === "dark"}
      onToggle={(next) => setTheme(next ? "dark" : "light")}
    />
  );
}
