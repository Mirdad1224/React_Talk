import { customShadows } from "./../theme/shadows";

declare module "@mui/material/styles" {
  interface ThemeOptions extends ThemeOptions {
    customShadows?: customShadows;
  }
}
