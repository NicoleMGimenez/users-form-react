import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://api.coingecko.com/api/v3/coins/markets';

export const getCryptoData = createAsyncThunk(
  'cryptos/getCryptos',
  async () => {
    try {
      const response = await axios.get(baseURL, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
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
