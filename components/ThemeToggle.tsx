import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { motion } from "framer-motion";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 p-3 z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={resolvedTheme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5" style={{ color: "#e8e8e8" }} />
        ) : (
          <Moon className="w-5 h-5" style={{ color: "#181818" }} />
        )}
      </motion.div>
    </motion.button>
  );
};
