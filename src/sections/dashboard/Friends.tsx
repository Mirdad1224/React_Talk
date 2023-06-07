import React, { JSXElementConstructor, ReactElement, useEffect } from "react";
import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { TransitionProps } from "@mui/material/transitions";
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";
import {
  FriendElement,
  FriendRequestElement,
  UserElement,
} from "../../components/UserElement";
import { RootState } from "../../redux/store";

interface FriendsProps {
  open: boolean;
  handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" ref={ref} {...props}>
      <></>
    </Slide>
  );
});

const UsersList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(FetchUsers() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <>
      {users.map((el: any, idx: number) => {
        return <UserElement key={idx} {...el} />;
      })}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(FetchFriends() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <>
      {friends.map((el: any, idx: number) => {
        return <FriendElement key={idx} {...el} />;
      })}
    </>
  );
};

const RequestsList = () => {
  const dispatch = useDispatch();

  const { friendRequests } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(FetchFriendRequests() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <>
      {friendRequests.map((el: any, idx: number) => {
        return <FriendRequestElement key={idx} {...el.sender} id={el._id} />;
      })}
    </>
  );
};

const Friends = ({ open, handleClose }: FriendsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

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
      {/* <DialogTitle>{"Friends"}</DialogTitle> */}
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}>
            {(() => {
              switch (value) {
                case 0: // display all users in this list
                  return <UsersList />;

                case 1: // display friends in this list
                  return <FriendsList />;

                case 2: // display request in this list
                  return <RequestsList />;

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
