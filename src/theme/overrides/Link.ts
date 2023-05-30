import { CustomTheme } from "@mui/material";

export default function Link(theme: CustomTheme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
  };
}
