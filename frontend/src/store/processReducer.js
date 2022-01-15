import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const startProcessingThunk = createAsyncThunk(
  'process/startProcessing',
  async (posts) => {
    return axios.post('/predict-emotion', {texts: posts}).then(res => res.data);
  }
);

export const processSlice = createSlice({
  name: 'process',

  initialState: {
    loading: false,
    response: {},
    resultPage: false,
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setResponse(state, action) {
      state.response = action.payload;
    },

    setResultPage(state, action) {
      state.resultPage = action.payload;
    },
  }, // reducers

  extraReducers(builder) {
    builder.addCase(startProcessingThunk.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setResponse,
  setResultPage
} = processSlice.actions;

export default processSlice.reducer;
