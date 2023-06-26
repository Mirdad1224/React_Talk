import { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import SideNav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchUserProfile,
  SelectConversation,
  showSnackbar,
} from "../../redux/slices/app";
import { socket, connectSocket } from "../../socket";
import {
  UpdateDirectConversation,
  AddDirectConversation,
  AddDirectMessage,
} from "../../redux/slices/conversation";
import AudioCallNotification from "../../sections/dashboard/audio/CallNotification";
import VideoCallNotification from "../../sections/dashboard/video/VideoNotification";
import {
  PushToAudioCallQueue,
  UpdateAudioCallDialog,
} from "../../redux/slices/audioCall";
import AudioCallDialog from "../../sections/dashboard/audio/CallDialog";
import VideoCallDialog from "../../sections/dashboard/video/VideoDialog";
import {
  PushToVideoCallQueue,
  UpdateVideoCallDialog,
} from "../../redux/slices/videoCall";
import { RootState } from "../../redux/store";
import { AnyAction } from "@reduxjs/toolkit";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();
  const { user_id } = useSelector((state: RootState) => state.auth);
  const { open_audio_notification_dialog, open_audio_dialog } = useSelector(
    (state: RootState) => state.audioCall
  );
  const { open_video_notification_dialog, open_video_dialog } = useSelector(
    (state: RootState) => state.videoCall
  );
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { conversations, current_conversation } = useSelector(
    (state: RootState) => state.conversation.direct_chat
  );

  useEffect(() => {
    dispatch(FetchUserProfile() as unknown as AnyAction);
  }, [dispatch]);

  const handleCloseAudioDialog = () => {
    dispatch(UpdateAudioCallDialog({ state: false }) as unknown as AnyAction);
  };
  const handleCloseVideoDialog = () => {
    dispatch(UpdateVideoCallDialog({ state: false }) as unknown as AnyAction);
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location.hash = "#loaded";
          window.location.reload();
        }
      };

      // window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("audio_call_notification", (data) => {
        // TODO => dispatch an action to add this in call_queue
        dispatch(PushToAudioCallQueue(data) as unknown as AnyAction);
      });

      socket.on("video_call_notification", (data) => {
        // TODO => dispatch an action to add this in call_queue
        dispatch(PushToVideoCallQueue(data) as unknown as AnyAction);
      });

      socket.on("new_message", (data) => {
        const message = data.message;
        console.log(current_conversation, data);
        // check if msg we got is from currently selected conversation
        if (current_conversation.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            }) as unknown as AnyAction
          );
        }
      });

      socket.on("start_chat", (data) => {
        console.log(data);
        // add / update to conversation list
        const existing_conversation = conversations.find(
          (el: any) => el.id === data._id
        );
        if (existing_conversation) {
          // update direct conversation
          dispatch(
            UpdateDirectConversation({
              conversation: data,
            }) as unknown as AnyAction
          );
        } else {
          // add direct conversation
          dispatch(
            AddDirectConversation({
              conversation: data,
            }) as unknown as AnyAction
          );
        }
        dispatch(
          SelectConversation({ room_id: data._id }) as unknown as AnyAction
        );
      });

      socket.on("new_friend_request", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "New friend request received",
          }) as unknown as AnyAction
        );
      });

      socket.on("request_accepted", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "Friend Request Accepted",
          }) as unknown as AnyAction
        );
      });

      socket.on("request_sent", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: data.message,
          }) as unknown as AnyAction
        );
      });
    }

    // Remove event listener on component unmount
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("start_chat");
      socket?.off("new_message");
      socket?.off("audio_call_notification");
    };
    //eslint-disable-next-line
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Stack direction="row">
        {isDesktop && (
          // SideBar
          <SideNav />
        )}

        <Outlet />
      </Stack>
      {open_audio_notification_dialog && (
        <AudioCallNotification
          open={open_audio_notification_dialog}
          handleClose={handleCloseAudioDialog}
        />
      )}
      {open_audio_dialog && (
        <AudioCallDialog
          open={open_audio_dialog}
          handleClose={handleCloseAudioDialog}
        />
      )}
      {open_video_notification_dialog && (
        <VideoCallNotification
          open={open_video_notification_dialog}
          handleClose={handleCloseVideoDialog}
        />
      )}
      {open_video_dialog && (
        <VideoCallDialog
          open={open_video_dialog}
          handleClose={handleCloseVideoDialog}
        />
      )}
    </>
  );
};

export default DashboardLayout;
