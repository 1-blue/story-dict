"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

interface IProps extends ThemeProviderProps {}

const ThemeProvider: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return children;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export { ThemeProvider };
