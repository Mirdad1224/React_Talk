import { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { AnyAction } from "@reduxjs/toolkit";
import useResponsive from "../../hooks/useResponsive";
import SideNav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation, showSnackbar } from "../../redux/slices/app";
import { socket, connectSocket } from "../../socket";
import {
  UpdateDirectConversation,
  AddDirectConversation,
  AddDirectMessage,
} from "../../redux/slices/conversation";
import { RootState } from "../../redux/store";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { conversations, current_conversation } = useSelector(
    (state: RootState) => state.conversation.direct_chat
  );
  const dispatch = useDispatch();

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location.hash = "#loaded";
          window.location.reload();
        }
      };

      //window.onload();

      if (!socket) {
        connectSocket(user_id!);
      }

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

      socket.on("open_chat", (data) => {
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
      socket?.off("open_chat");
      socket?.off("start_chat");
      socket?.off("new_message");
    };
  }, [isLoggedIn, user_id, dispatch, conversations, current_conversation]);

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
    </>
  );
};

export default DashboardLayout;
