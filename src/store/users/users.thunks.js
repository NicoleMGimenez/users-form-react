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

export const createUserThunk = createAsyncThunk(
  'users/createUser',
  async (body) => {    
    try {
      console.log(body);
      
      return body; // Devuelve los datos de la respuesta
    } catch (e) {
      console.error(e);
      throw e; // Lanza el error para que sea manejado en el slice
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  'users/deleteUser',
  async (id) => {    
    try {
      console.log(id);
      
      return id; // Devuelve los datos de la respuesta
    } catch (e) {
      console.error(e);
      throw e; // Lanza el error para que sea manejado en el slice
    }
  }
);


