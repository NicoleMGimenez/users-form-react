import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function Header() {
  return (
    <div className='headerContainer'>
      <Link to="/"><Button icon="pi pi-home" rounded outlined label="Home" style={{ margin: '5px' }} /></Link>
      <Link to="/usuarios"><Button icon="pi pi-user" rounded outlined label="Usuarios" style={{ margin: '5px' }} /></Link>
      <Link to="/cryptos"><Button icon="pi pi-bitcoin" rounded outlined label="Cryptos" style={{ margin: '5px' }} /></Link>
      <Outlet />
    </div>
  )
}
