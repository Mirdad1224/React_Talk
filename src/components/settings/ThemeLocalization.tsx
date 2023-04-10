import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import useLocales from "../../hooks/useLocales";

export default function ThemeLocalization({
  children,
}: {
  children: ReactNode;
}) {
  const defaultTheme = useTheme();

  const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, currentLang.systemValue);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
