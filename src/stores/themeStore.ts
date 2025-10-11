import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: "light",
        toggleTheme: () =>
          set(
            { theme: get().theme === "light" ? "dark" : "light" },
            false,
            "toggleTheme"
          ),
        setTheme: (theme) => set({ theme }, false, "setTheme"),
      }),
      {
        name: "theme-storage",
      }
    ),
    { name: "ThemeStore" }
  )
);
