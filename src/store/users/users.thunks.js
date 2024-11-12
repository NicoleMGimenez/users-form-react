import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/users';

export const getUsersThunk = createAsyncThunk(
  'users/getUsers',
  async () => {    
    try {
      const response = await axios.get(baseURL);      
      return response.data; // Devuelve los datos de la respuesta
    } catch (e) {
      console.error(e);
      throw e; // Lanza el error para que sea manejado en el slice
    }
  }
);
