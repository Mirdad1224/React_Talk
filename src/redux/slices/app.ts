import {
  AnyAction,
  Dispatch,
  ThunkDispatch,
  createSlice,
} from "@reduxjs/toolkit";
import { IAppState } from "./../state.type";
import { AppDispatch, RootState } from "./../store";
import axios from "../../utils/axios";
import { v4 } from "uuid";
import S3 from "../../utils/s3";
import { S3_BUCKET_NAME } from "../../config";

const initialState: IAppState = {
  user: {},
  sideBar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  isLoggedIn: true,
  tab: 0, // [0, 1, 2, 3]
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
  users: [], // all users of app who are not friends and not requested yet
  friends: [], // all friends
  friendRequests: [], // all friend requests
  chat_type: null,
  room_id: null,
  call_logs: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchCallLogs(state, action) {
      state.call_logs = action.payload.call_logs;
    },
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    // Toggle Sidebar
    toggleSideBar(state) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    updateTab(state, action) {
      state.tab = action.payload.tab;
    },

    openSnackBar(state, action) {
      console.log(action.payload);
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state) {
      console.log("This is getting executed");
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.requests;
    },
    selectConversation(state, action) {
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const closeSnackBar =
  () => async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.closeSnackBar());
  };

export const showSnackbar =
  ({ severity, message }: { severity: any; message: string }) =>
  async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };

export function ToggleSidebar() {
  return async (
    dispatch: ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>,
    getState: RootState
  ) => {
    dispatch(slice.actions.toggleSideBar());
  };
}
export function UpdateSidebarType(type: string) {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.updateSideBarType({ type }));
  };
}
export function UpdateTab(tab: number) {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.updateTab({ tab }));
  };
}

export function FetchUsers() {
  return async (dispatch: AppDispatch, getState: RootState) => {
    await axios
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function FetchFriends() {
  return async (dispatch: AppDispatch, getState: RootState) => {
    await axios
      .get(
        "/user/get-friends",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function FetchFriendRequests() {
  return async (dispatch: AppDispatch, getState: RootState) => {
    await axios
      .get(
        "/user/get-requests",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.updateFriendRequests({ requests: response.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const SelectConversation = ({ room_id }: { room_id: number }) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.selectConversation({ room_id }));
  };
};

export const FetchCallLogs = () => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    axios
      .get("/user/get-call-logs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.fetchCallLogs({ call_logs: response.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const FetchUserProfile = () => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    axios
      .get("/user/get-me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.fetchUser({ user: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const UpdateUserProfile = (formValues: any) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    const file = formValues.avatar;

    const key = v4();

    try {
      S3.getSignedUrl(
        "putObject",
        { Bucket: S3_BUCKET_NAME, Key: key, ContentType: `image/${file.type}` },
        async (_err, presignedURL) => {
          await fetch(presignedURL, {
            method: "PUT",

            body: file,

            headers: {
              "Content-Type": file.type,
            },
          });
        }
      );
    } catch (error) {
      console.log(error);
    }

    axios
      .patch(
        "/user/update-me",
        { ...formValues, avatar: key },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateUser({ user: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
