import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  chatrooms: [],
  messages: {}, // { chatroomId: [messages] }
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChatroom: (state, action) => {
      const newRoom = {
        id: uuidv4(),
        title: action.payload,
        createdAt: new Date().toISOString(),
      };
      state.chatrooms.push(newRoom);
      state.messages[newRoom.id] = [];
    },
    deleteChatroom: (state, action) => {
      const id = action.payload;
      state.chatrooms = state.chatrooms.filter((room) => room.id !== id);
      delete state.messages[id];
    },
    addMessage: (state, action) => {
      const { chatroomId, message } = action.payload;
      state.messages[chatroomId].push(message);
    },
    loadDummyMessages: (state, action) => {
      const { chatroomId, messages } = action.payload;
      state.messages[chatroomId] = [...messages, ...(state.messages[chatroomId] || [])];
    },
  },
});

export const {
  createChatroom,
  deleteChatroom,
  addMessage,
  loadDummyMessages,
} = chatSlice.actions;
export default chatSlice.reducer;
