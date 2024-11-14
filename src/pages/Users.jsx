import React from 'react'
import '../App.css'
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import UsersTable from "../components/UsersTable";
import { useSelector, useDispatch } from 'react-redux';
import { getUsersThunk } from '../store/users/users.thunks';
import { Messages } from 'primereact/messages';
import { useEffect, useRef } from 'react';
import { useMountEffect } from 'primereact/hooks';

export default function Users() {

  //cartel aviso
  const msgs = useRef(null);
  useMountEffect(() => {
    if (msgs.current) {
      msgs.current.clear();
      msgs.current.show({ id: '1', sticky: true, severity: 'info', summary: 'Info', detail: 'No hay usuarios disponibles, haz click para cargarlos.', closable: false });
    }
  });

  // Carga de datos desde el estado de redux
  const users = useSelector((state) => state?.users?.users);
  const loading = useSelector((state) => state?.users?.loading);

  const dispatch = useDispatch(); //Ejecuta el thunk

  const loadData = () => {
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
                  <>
                    <div className="card flex justify-content-center">
                      <Messages ref={msgs} />
                    </div>
                    <Button rounded className='mb-5' label={'Cargar lista de usuarios'} onClick={loadData} style={{backgroundColor:'#350182', borderColor:'black'}} ></Button>
                  </>
                )
              }
            </>
          )
        }
      </div>
    </>
  )
}
