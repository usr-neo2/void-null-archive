
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type ColorScheme = "matrix" | "blue" | "amber" | "purple" | "default" | "green" | "orange" | "pink" | "retro-red" | "cyber-cyan" | "vintage-amber" | "midnight-blue";

interface ThemeContextProps {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const COLOR_SCHEMES: Record<ColorScheme, Record<Theme, Record<string, string>>> = {
  default: {
    light: {
      primary: "196 80% 36%",
      accent: "196 80% 36%",
    },
    dark: {
      primary: "180 70% 58%",
      accent: "217 33% 18%",
    }
  },
  matrix: {
    light: {
      primary: "131 80% 40%",
      accent: "131 80% 30%",
      "terminal-green": "142 76% 36%",
    },
    dark: {
      primary: "131 90% 45%",
      accent: "131 70% 20%",
      "terminal-green": "142 86% 45%",
    }
  },
  blue: {
    light: {
      primary: "210 100% 50%",
      accent: "210 80% 35%",
    },
    dark: {
      primary: "210 100% 60%",
      accent: "210 80% 25%",
    }
  },
  amber: {
    light: {
      primary: "45 100% 45%",
      accent: "35 90% 35%",
    },
    dark: {
      primary: "45 100% 50%",
      accent: "35 90% 30%",
    }
  },
  purple: {
    light: {
      primary: "275 80% 50%",
      accent: "275 70% 35%",
    },
    dark: {
      primary: "275 80% 60%",
      accent: "275 70% 25%",
    }
  },
  green: {
    light: {
      primary: "150 80% 40%",
      accent: "150 70% 30%",
    },
    dark: {
      primary: "150 90% 40%",
      accent: "150 80% 20%",
    }
  },
  orange: {
    light: {
      primary: "25 100% 50%",
      accent: "25 90% 40%",
    },
    dark: {
      primary: "25 100% 55%",
      accent: "25 90% 35%",
    }
  },
  pink: {
    light: {
      primary: "330 80% 50%",
      accent: "330 70% 40%",
    },
    dark: {
      primary: "330 85% 60%",
      accent: "330 70% 30%",
    }
  },
  // New retro themes
  "retro-red": {
    light: {
      primary: "0 90% 55%",
      accent: "0 80% 40%",
      "terminal-green": "0 100% 60%",
    },
    dark: {
      primary: "0 100% 65%",
      accent: "0 90% 30%",
      "terminal-green": "0 100% 70%",
    }
  },
  "cyber-cyan": {
    light: {
      primary: "180 90% 40%", 
      accent: "180 80% 30%",
      "terminal-green": "180 100% 45%",
    },
    dark: {
      primary: "180 100% 50%",
      accent: "180 90% 20%",
      "terminal-green": "180 100% 55%",
    }
  },
  "vintage-amber": {
    light: {
      primary: "40 100% 50%",
      accent: "35 90% 40%",
      "terminal-green": "40 100% 55%",
    },
    dark: {
      primary: "40 100% 60%",
      accent: "35 90% 30%",
      "terminal-green": "40 100% 70%",
    }
  },
  "midnight-blue": {
    light: {
      primary: "230 80% 50%",
      accent: "230 70% 40%",
      "terminal-green": "230 90% 55%",
    },
    dark: {
      primary: "230 90% 60%",
      accent: "230 80% 30%",
      "terminal-green": "230 100% 65%",
    }
  }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved preference or use system preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    
    if (savedTheme) {
      return savedTheme;
    }
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    // Check for saved color scheme or use matrix (retro default)
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme;
    return savedColorScheme || "matrix";
  });

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Save theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Apply color scheme
    const root = window.document.documentElement;
    const colors = COLOR_SCHEMES[colorScheme][theme];
    
    // Apply CSS variables
    Object.entries(colors).forEach(([name, value]) => {
      root.style.setProperty(`--${name}`, value);
    });
    
    // Save color scheme preference
    localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme, theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, toggleTheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
