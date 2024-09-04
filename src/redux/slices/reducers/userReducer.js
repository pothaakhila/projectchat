// src/redux/slices/conversation.js
/*import { createSlice } from '@reduxjs/toolkit'; // Import createSlice from @reduxjs/toolkit


const initialState = {
  conversations: [], // Ensure this stores conversations specific to the current user
  // other state variables
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    // other reducers
  },
});

export const { setConversations } = conversationSlice.actions;
export default conversationSlice.reducer;

// Thunk to fetch conversations
export const fetchConversations = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/conversations/${userId}`);
    const data = await response.json();
    dispatch(setConversations(data));
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
  }
};
*/