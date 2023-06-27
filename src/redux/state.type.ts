export interface IDirectMessage {
  id: string;
  type: string;
  subtype: string;
  message: string;
  incoming: boolean;
  outgoing: boolean;
}

export interface IAppState {
  user: any;
  sideBar: {
    open: boolean;
    type: string;
  };
  isLoggedIn: boolean;
  tab: 0 | 1 | 2 | 3;
  snackbar: {
    open: boolean | null;
    severity: string | null;
    message: string | null;
  };
  users: any[];
  friends: any[];
  friendRequests: any[];
  chat_type: string | null;
  room_id: string | null;
  call_logs: any[];
}

export interface IAuthState {
  isLoggedIn: boolean;
  token: string;
  isLoading: boolean;
  user: any;
  user_id: string | null;
  email: string;
  error: any;
}

export interface IConversationState {
  direct_chat: {
    conversations: any[];
    current_conversation: any;
    current_messages: any[];
  };
  group_chat: any;
}

export interface IAudioCallState {
  open_audio_dialog: boolean;
  open_audio_notification_dialog: boolean;
  call_queue: any[]; // can have max 1 call at any point of time
  incoming: boolean;
}

export interface IVideoCallState {
  open_video_dialog: boolean;
  open_video_notification_dialog: boolean;
  call_queue: any[]; // can have max 1 call at any point of time
  incoming: boolean;
}
