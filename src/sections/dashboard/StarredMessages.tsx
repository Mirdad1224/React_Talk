import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowLeft } from "phosphor-react";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import useResponsive from "../../hooks/useResponsive";
import { UpdateSidebarType } from "../../redux/slices/app";
import { Conversation } from "../../pages/dashboard/Conversation";

const StarredMessages = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const isDesktop = useResponsive("up", "md");

  const isMobile = useResponsive("between", "md", "xs", "sm");

  return (
    <Box sx={{ width: !isDesktop ? "100vw" : 320, maxHeight: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            backgroundColor: (theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background) as string,
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT") as unknown as AnyAction);
              }}
            >
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",
          }}
          spacing={3}
        >
          <Conversation isMobile={Boolean(isMobile)} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
