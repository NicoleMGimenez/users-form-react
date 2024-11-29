import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://api.coingecko.com/api/v3/coins';

export const getCryptoData = createAsyncThunk(
  'cryptos/getCryptos',
  async () => {
    try {
      const response = await axios.get(baseURL + "/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 200,
          page: 1
        }
      });
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error(error);
      throw error; // Lanza el error para que sea manejado en el slice
    }
  }
);

export const dateCryptoData = createAsyncThunk(
  'cryptos/getDateCryptoData',
  async ({ coinId, date }) => {
    try {
      const response = await axios.get(baseURL + `/${coinId}/history?date=${date}`);
      return response.data.market_data.current_price; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error(error);
      throw error; // Lanza el error para que sea manejado en el slice
    }
  }
);

export const historyCryptoData = createAsyncThunk(
  'cryptos/getHistoryCryptoData',
  async ({ coinId, days }) => {
    try {
      const response = await axios.get(baseURL + `/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`);
      return response.data.prices; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error(error);
      throw error; // Lanza el error para que sea manejado en el slice
    }
  }
)