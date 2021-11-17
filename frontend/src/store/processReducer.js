import { createSlice } from '@reduxjs/toolkit';

export const processSlice = createSlice({
  name: 'process',

  initialState: {
    loading: false,
    response: {},
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setResponse(state, action) {
      state.response = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setResponse } = processSlice.actions;

export default processSlice.reducer;
