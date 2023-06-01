import { Stack, Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatHeader, ChatFooter } from "../../components/chat";
import useResponsive from "../../hooks/useResponsive";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "../../sections/dashboard/Conversation";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../redux/slices/conversation";
import { socket } from "../../socket";
import { RootState } from "../../redux/store";
import { IConversation } from "../../types/conversation";
import { IChatElement } from "../../types/chat";

const Conversation = ({
  isMobile,
  menu,
}: {
  isMobile: boolean;
  menu?: boolean;
}) => {
  const dispatch = useDispatch();

  const { conversations, current_messages } = useSelector(
    (state: RootState) => state.conversation.direct_chat
  );
  const { room_id } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    const current = conversations.find(
      (el: IConversation) => el.id === room_id
    );

    socket.emit(
      "get_messages",
      { conversation_id: current.id },
      (data: any) => {
        // data => list of messages
        console.log(data, "List of messages");
        dispatch(
          FetchCurrentMessages({ messages: data }) as unknown as AnyAction
        );
      }
    );

    dispatch(SetCurrentConversation(current) as unknown as AnyAction);
  }, [dispatch, conversations, room_id]);
  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {current_messages.map((el: IChatElement, idx: number) => {
          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline el={el} />
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg el={el} menu={menu} />
                  );

                case "doc":
                  return (
                    // Doc Message
                    <DocMsg el={el} menu={menu} />
                  );
                case "Link":
                  return (
                    //  Link Message
                    <LinkMsg el={el} menu={menu} />
                  );

                case "reply":
                  return (
                    //  ReplyMessage
                    <ReplyMsg el={el} menu={menu} />
                  );

                default:
                  return (
                    // Text Message
                    <TextMsg el={el} menu={menu} />
                  );
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const messageListRef = useRef<HTMLDivElement>(null);

  const { current_messages } = useSelector(
    (state: RootState) => state.conversation.direct_chat
  );

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [current_messages]);

  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={isMobile ? "100vw" : "auto"}
    >
      {/*  */}
      <ChatHeader />
      <Box
        ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflow: "scroll",

          backgroundColor: (theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background) as string,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <SimpleBarStyle clickOnTrack={false}>
          <Conversation menu={true} isMobile={isMobile!} />
        </SimpleBarStyle>
      </Box>
      <ChatFooter />
    </Stack>
  );
};

export default ChatComponent;

export { Conversation };
