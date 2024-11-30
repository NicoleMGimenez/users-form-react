import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const CryptosTable = ({ datos }) => {
  const logoBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img alt="logo" src={rowData.image} style={{ width: '24px' }} />
        <span>{rowData.name}</span>
      </div>
    );
  };

  const priceTemplate = (rowData, columnField) => {
    return (
      <div>
        <span>$USD {rowData[columnField]}</span>
      </div>);
  };

  return (
    <>
      <div className='tablaCryptosContainer'>
        <DataTable value={datos} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
          <Column field="name" header="Nombre" style={{ width: '150px' }} body={logoBodyTemplate} ></Column>
          <Column field="current_price" header="Precio actual" style={{ width: '150px' }} body={(rowData) => priceTemplate(rowData, 'current_price')}></Column>
          <Column field="ath" header="Precio historico más alto" style={{ width: '150px' }} body={(rowData) => priceTemplate(rowData, 'ath')}></Column>
          <Column field="atl" header="Precio historico más bajo" style={{ width: '150px' }} body={(rowData) => priceTemplate(rowData, 'atl')}></Column>
        </DataTable>
      </div>
    </>
  )
}
