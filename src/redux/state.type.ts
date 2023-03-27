export interface IAppState {
  sideBar: {
    open: boolean;
    type: string;
  };
  isLoggedIn: boolean;
  tab: 0 | 1 | 2 | 3;
  snackbar: {
    open: boolean | null;
    severity: any;
    message: string | null;
  };
  users: any[];
  friends: any[];
  friendRequests: any[];
  chat_type: string | null;
  room_id: string | null;
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
