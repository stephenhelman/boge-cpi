import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "client",
  initialState: { client: null, bureau: null },
  reducers: {
    setLogistics: (state, action) => {
      const { client, bureau } = action.payload;
      state.client = client;
      state.bureau = bureau;
    },
    setClient: (state, action) => {
      state.client = action.payload;
    },
    setBureau: (state, action) => {
      state.bureau = action.payload;
    },
    reset: (state, action) => {
      state.client = null;
      state.bureau = null;
    },
  },
});

export const { setLogistics, setClient, setBureau, reset } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentClient = (state) => state.client.client;
export const selectCurrentBureau = (state) => state.client.bureau;
