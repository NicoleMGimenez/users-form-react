import { createSlice } from '@reduxjs/toolkit';
import { getCryptoData } from './crypto.thunks';
import { dateCryptoData } from './crypto.thunks';
import { historyCryptoData } from './crypto.thunks';

const initialState = {
  cryptos: [],
  cryptosLabels: [],
  loading: false,
  error: null,
  dateCryptoData: null,
  historyCryptoData: []
}

const cryptosSlice = createSlice({
  name: 'cryptos',
  initialState,
  reducers: {
    resetHistoryCryptoData: (state) => {
      state.historyCryptoData = initialState.historyCryptoData;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptos = action.payload;
        state.cryptosLabels = action.payload.map((moneda) => moneda.id)
      })
      .addCase(getCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //obtener el historial de una moneda en un rango de días
      .addCase(historyCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(historyCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.historyCryptoData = [...state.historyCryptoData, action.payload];
      })
      .addCase(historyCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //obtener el precio de una moneda en una fecha especifica
      .addCase(dateCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dateCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.dateCryptoData = action.payload;
      })
      .addCase(dateCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { resetHistoryCryptoData } = cryptosSlice.actions;

export default cryptosSlice.reducer;

