import { createSlice } from '@reduxjs/toolkit';
import { getUsersThunk, createUserThunk, deleteUserThunk, updateUserThunk } from './users.thunks';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtencion
      .addCase(getUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Creacion
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        const newUser = action.payload;
        state.loading = false;
        state.users = [...state.users, newUser];
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Eliminar
      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        const removeUserId = action.payload;
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== removeUserId);
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Actualizar
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
          //console.log(updatedUser)
        }
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default usersSlice.reducer;
