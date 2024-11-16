import { createSlice } from '@reduxjs/toolkit';
import { getCryptoData } from './crypto.thunks';

const cryptosSlice = createSlice({
  name: 'cryptos',
  initialState: {
    cryptos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptos = action.payload;
      })
      .addCase(getCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default cryptosSlice.reducer;
