import { CustomTheme } from "@mui/material";

export default function Badge(theme: CustomTheme) {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          width: 10,
          height: 10,
          borderRadius: "50%",
        },
      },
    },
  };
}
