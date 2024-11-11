import React from 'react'
import '../App.css'
import { useState, useEffect } from "react"; //hooks
import { useFetch } from '../useFetch';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import UsersTable from "../components/UsersTable";

export default function Users() {
  //const { data, loading, error, handleCancelRequest } = useFetch("https://jsonplaceholder.typicode.com/users");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("se ejecuta el useEffect")
    console.log(data)
  }, [data]) //variable que controla cuando cambia los datos


  const loadData = async () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData([...json]))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className='usuariosContenedor'>
        {
          data?.length > 0 ? (
            <UsersTable datos={data}></UsersTable>
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
