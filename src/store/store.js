import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/users.slice'; // Asegúrate de ajustar la ruta correctamente
import cryptosReducer from './cryptos/crypto.slice';

const store = configureStore({
  reducer: {
    users: usersReducer, // Define el reducer dentro de un objeto
    cryptos: cryptosReducer
  },
});

export default store;
