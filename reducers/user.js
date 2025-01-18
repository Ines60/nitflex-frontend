import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    pseudo: "",
    avatar: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.pseudo = action.payload.pseudo;
      state.value.avatar = action.payload.avatar;
    },
    updateProfile: (state, action) => {
      state.value.pseudo = action.payload.pseudo;
      state.value.avatar = action.payload.avatar;
    },
  },
});

export const { login, updateProfile } = userSlice.actions;
export default userSlice.reducer;
