import React from 'react'
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Outlet, Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footerContainer text-center">
      {/* <p>© Gimenez, Nicole Magali - 2024</p> */}
      <Link to="/others"><Button rounded text label="© Gimenez, Nicole Magali - 2024" tooltip="Conoce más sobre mi trabajo" tooltipOptions={{ position: 'top' }} style={{ margin: '5px' }} /></Link>
      <Outlet />
    </div>
  )
}
