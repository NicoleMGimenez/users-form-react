import React from 'react'
import '../App.css'
import { useState, useEffect } from "react"; //hooks
import { useFetch } from '../useFetch';
import { Button } from 'primereact/button';
import UsersTable from "../components/UsersTable";

export default function Usuarios() {
  //const { data, loading, error, handleCancelRequest } = useFetch("https://jsonplaceholder.typicode.com/users");
  const validar = false;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("se ejecuta el useEffect")
    console.log(data)
  }, [data]) //variable que controla cuando cambia los datos


  const loadData = async () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData([...json]))
      .finally(() => setLoading(false));
    console.log(data);
  };
  return (
    <>
      <div className='usuariosContenedor'>
        {
          data?.length > 0 ? (null):(<Button className='mb-5' label={'Cargar datos'} severity='danger' onClick={loadData}></Button>)
        }
        <UsersTable datos={data}></UsersTable>
      </div>
    </>
  )
}
