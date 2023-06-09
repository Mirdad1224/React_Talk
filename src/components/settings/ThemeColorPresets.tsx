import { ReactNode, useMemo } from "react";
import {
  alpha,
  ThemeProvider,
  createTheme,
  useTheme,
  CustomThemeOptions,
} from "@mui/material/styles";
import useSettings from "../../hooks/useSettings";
import componentsOverride from "../../theme/overrides";

export default function ThemeColorPresets({
  children,
}: {
  children: ReactNode;
}) {
  const defaultTheme: CustomThemeOptions = useTheme();

  const { setColor } = useSettings();

  const themeOptions: CustomThemeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette!,
        primary: setColor,
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`,
      },
    }),
    [setColor, defaultTheme]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
