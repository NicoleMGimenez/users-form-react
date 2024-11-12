import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/users.slice'; // Asegúrate de ajustar la ruta correctamente

const store = configureStore({
  reducer: {
    users: usersReducer, // Define el reducer dentro de un objeto
  },
});

export default store;
