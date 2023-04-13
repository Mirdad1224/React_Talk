import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

//   icon: [element, string],
//   sx: object,

export default function Iconify({ icon, sx, ...other }: any) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}
