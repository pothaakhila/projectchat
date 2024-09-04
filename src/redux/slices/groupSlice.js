import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [], // Array to store groups
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const { addGroup, setGroups } = groupSlice.actions;
export default groupSlice.reducer;
