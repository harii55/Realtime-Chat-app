import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,


  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  //user id to know which user chat to open
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    console.log("ok here");
    try {
      console.log(`Calling: /messages/${userId}`);

      const res = await axiosInstance.get(`/messages/${userId}`);
      console.log("Fetched messages done:", res.data);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  //open the window and subscribe to the socket(get all the msgs)
  subscribeToMessages: () => {
    const { selectedUser } = get();
    console.log("Selected user:", selectedUser);
    if (!selectedUser) return;


    //getting the socket from the auth store
    const { socket } = useAuthStore.getState();

    socket.on("newMessage", (message) => {
      set({ messages: [...get().messages, message] });
    });

  },

  //close the window and unsubscribe from the socket
  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },

  //function to open a chat of a person that u just selected from ur sidebar
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));