import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createUserThunk } from '../store/users/users.thunks';
import { Button } from "primereact/button";

export const AddUserForm = () => {
    const dispatch = useDispatch();

    // Funcion para agregar el usuario a la tabla
    const addUser = () => {
        const userData = { name: 'Nuevo usuario', email: 'Hola@gmail.com', address: { city: 'Jujuy' } };
        dispatch(createUserThunk(userData));
    }

    return (
        <div className="grid">
            <div className="col-12">
                <Button className='w-full' label="Cargar" severity="info" onClick={addUser} />
            </div>
        </div>
    )
}