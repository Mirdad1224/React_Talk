import { customShadows } from "./../theme/shadows";

declare module "@mui/material/styles" {
  interface ThemeOptions extends ThemeOptions {
    customShadows?: customShadows;
  }
  interface Theme {
    customShadows?: customShadows;
  }

  interface TypeBackground {
    paper: string;
    default: string;
    neutral: string;
  }
}

declare module "@mui/material" {
  interface Color {
    0: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
}
