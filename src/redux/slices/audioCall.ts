import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket";
import axios from "../../utils/axios";
import { AppDispatch, RootState } from "../store";
import { IAudioCallState } from "../state.type";

const initialState: IAudioCallState = {
  open_audio_dialog: false,
  open_audio_notification_dialog: false,
  call_queue: [], // can have max 1 call at any point of time
  incoming: false,
};

const slice = createSlice({
  name: "audioCall",
  initialState,
  reducers: {
    pushToAudioCallQueue(state, action) {
      // check audio_call_queue in redux store

      if (state.call_queue.length === 0) {
        state.call_queue.push(action.payload.call);
        if (action.payload.incoming) {
          state.open_audio_notification_dialog = true; // this will open up the call dialog
          state.incoming = true;
        } else {
          state.open_audio_dialog = true;
          state.incoming = false;
        }
      } else {
        // if queue is not empty then emit user_is_busy => in turn server will send this event to sender of call
        socket.emit("user_is_busy_audio_call", { ...action.payload });
      }

      // Ideally queue should be managed on server side
    },
    resetAudioCallQueue(state, action) {
      state.call_queue = [];
      state.open_audio_notification_dialog = false;
      state.incoming = false;
    },
    closeNotificationDialog(state, action) {
      state.open_audio_notification_dialog = false;
    },
    updateCallDialog(state, action) {
      state.open_audio_dialog = action.payload.state;
      state.open_audio_notification_dialog = false;
    },
  },
});

// Reducer
export default slice.reducer;

export const StartAudioCall = (id: any) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.resetAudioCallQueue(null));
    axios
      .post(
        "/user/start-audio-call",
        { id },
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
          slice.actions.pushToAudioCallQueue({
            call: response.data.data,
            incoming: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const PushToAudioCallQueue = (call: any) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.pushToAudioCallQueue({ call, incoming: true }));
  };
};

export const ResetAudioCallQueue = () => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.resetAudioCallQueue(null));
  };
};

export const CloseAudioNotificationDialog = () => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.closeNotificationDialog(null));
  };
};

export const UpdateAudioCallDialog = ({ state }: { state: any }) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    dispatch(slice.actions.updateCallDialog({ state }));
  };
};
