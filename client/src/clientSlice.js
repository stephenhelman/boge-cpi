import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "client",
  initialState: { client: {}, bureau: null, source: [], token: null },
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
    setSource: (state, action) => {
      state.source = action.payload;
    },

    reset: (state, action) => {
      state.client = null;
      state.bureau = null;
      state.source = null;
    },
  },
});

export const { setLogistics, setClient, setBureau, setSource, reset } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentClient = (state) => state.client.client;
export const selectCurrentBureau = (state) => state.client.bureau;
export const selectCurrentSource = (state) => state.client.source;
