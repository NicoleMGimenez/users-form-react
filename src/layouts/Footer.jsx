import React from 'react'
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export default function Footer() {
  return (
    <div className="footerContainer text-center">
      {/* <p>© Gimenez, Nicole Magali - 2024</p> */}
      <Button rounded text label="© Gimenez, Nicole Magali - 2024" tooltip="Conoce más sobre mi" tooltipOptions={{ position: 'top' }} style={{ margin: '5px' }} />
    </div>
  )
}
