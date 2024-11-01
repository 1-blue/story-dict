"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "#ui/components";

interface IProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onClick"> {}

const ThemeToggle: React.FC<IProps> = (props) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="default"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      {...props}
    >
      <SunIcon className="transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export { ThemeToggle };
