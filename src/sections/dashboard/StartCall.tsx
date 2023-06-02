import React, { JSXElementConstructor, ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import { TransitionProps } from "@mui/material/transitions";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/search";
import { CallElement } from "../../components/CallElement";
import { CallList } from "../../data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" ref={ref} {...props}>
      <></>
    </Slide>
  );
});

const StartCall = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={
        Transition as JSXElementConstructor<
          TransitionProps & { children: ReactElement<any, any> }
        >
      }
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle>{"Start New Conversation"}</DialogTitle>
      <Stack p={2} sx={{ width: "100%" }}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}>
            {CallList.map((el, idx) => {
              return <CallElement key={idx} {...el} />;
            })}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
