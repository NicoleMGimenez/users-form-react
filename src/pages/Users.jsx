import React from 'react'
import '../App.css'
import { useState, useEffect } from "react"; //hooks
import { useFetch } from '../useFetch';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import UsersTable from "../components/UsersTable";
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk } from '../store/users/users.thunks';

export default function Users() {

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
