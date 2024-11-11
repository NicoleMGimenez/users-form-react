import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function UsersTable({datos}) {
  const imageBodyTemplate = (datos) => {
    return <img src={`https://via.placeholder.com/600/${datos.url}`} className="w-6rem shadow-2 border-round" />;
};

  return (
    <div className='tablaContainer'>
      <h1>Tabla de usuarios</h1>
      {
        datos?.length > 0 ? (<>
          <DataTable value={datos} tableStyle={{ minWidth: '50rem' }}>
            <Column field="name" header="Nombre"></Column>
            <Column field="email" header="Email"></Column>
          </DataTable>
        </>
        ) : (<h3>No hay datos</h3>)
      }
    </div>
  )
}
