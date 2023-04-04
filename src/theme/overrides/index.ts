import { ThemeOptions } from "@mui/material/styles/createTheme";
import Accordion from "./Accordion";

export default function ComponentsOverrides(theme: ThemeOptions) {
  return Object.assign(Accordion(theme));
}
