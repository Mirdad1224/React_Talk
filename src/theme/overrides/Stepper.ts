import { CustomTheme } from "@mui/material";

export default function Stepper(theme: CustomTheme) {
  return {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider,
        },
      },
    },
  };
}
