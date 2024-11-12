import React from 'react'
import '../App.css'
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import UsersTable from "../components/UsersTable";
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk } from '../store/users/users.thunks';

export default function Users() {

  // Carga de datos desde el estado de redux
  const users = useSelector((state) => state?.users?.users); 
  const loading = useSelector((state) => state?.users?.loading);   
  
  const dispatch = useDispatch(); 

  const loadData = async () => {
    dispatch(getUsersThunk());     
  };  

  return (
    <>
      <div className='usuariosContenedor'>
        {
          users?.length > 0 ? (
            <UsersTable datos={users}></UsersTable>
          ) : (
            <>
              {
                loading ? (
                  <ProgressSpinner></ProgressSpinner>
                ) : (
                  <Button className='mb-5' label={'Cargar lista de usuarios'} severity='danger' onClick={loadData}></Button>
                )
              }
            </>
          )
        }
      </div>
    </>
  )
}
