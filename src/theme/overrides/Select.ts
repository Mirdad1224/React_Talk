import { CustomTheme } from "@mui/material";
import { InputSelectIcon } from "./CustomIcons";

export default function Select(theme: CustomTheme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
    },
  };
}
