import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCryptoData } from '../store/cryptos/crypto.thunks';
import { CryptosTable } from '../components/CryptosTable';
import { BarChart } from '../components/BarChart';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';



export const Cryptos = () => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const cryptos = useSelector((state) => state?.cryptos?.cryptos);
  const loading = useSelector((state) => state?.cryptos?.loading);

  // useEffect(() => {
  //   if (firstLoad) {
  //     dispatch(getCryptoData());
  //     setFirstLoad(false);
  //   } 
  // }, [])

  useEffect(() => {
    dispatch(getCryptoData());
  }, [dispatch])

  return (
    <>
      <div className="cryptosContenedor">
        <CryptosTable datos={cryptos}></CryptosTable>
        <br />
        <BarChart datos={cryptos}></BarChart>
      </div>
    </>
  )
}
