import { CustomTheme } from "@mui/material";

export default function Skeleton(theme: CustomTheme) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: "wave",
      },

      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
}
