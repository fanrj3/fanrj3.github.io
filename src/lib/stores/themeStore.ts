import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const storage = createJSONStorage(() => {
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => { },
      removeItem: () => { },
    };
  }
  return localStorage;
});

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme: Theme) => {
        set({ theme });
        updateTheme(theme);
      },
      toggleTheme: () => {
        const current = get().theme;
        const newTheme = current === 'dark' ? 'light' : 'dark';
        set({ theme: newTheme });
        updateTheme(newTheme);
      },
    }),
    {
      name: 'theme-storage',
      storage,
      skipHydration: true,
    }
  )
);

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemPrefersDark() ? 'dark' : 'light';
  }
  return theme;
}

function updateTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const effective = resolveTheme(theme);
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(effective);
  root.setAttribute('data-theme', effective);
}
