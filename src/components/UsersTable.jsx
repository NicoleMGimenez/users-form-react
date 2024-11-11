import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AddUserForm } from './AddUserForm';
import { UpdateUserForm } from './UpdateUserForm';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

export default function UsersTable({ datos }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const imageBodyTemplate = (rowData) => {
    return <img src={`https://via.placeholder.com/600/${rowData.url}`} className="w-6rem shadow-2 border-round" />;
  };

  const deleteUser = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Está seguro de eliminar este usuario?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No'
    });
  };

  const actionsTemplate = (rowData) => {
    const user = rowData;
    return (
      <>
        {/* Boton editar */}
        <Button
          onClick={() => {console.log(rowData),
            setSelectedUser(rowData), setShowUpdateForm(true)}
          }
          severity="help"
          icon="pi pi-pencil"
          className='m-2'>
        </Button>

        {/* Boton eliminar */}
        <Button
          onClick={(event) => deleteUser(event)}
          severity="danger"
          icon="pi pi-times"
          className='m-2'>
        </Button>
      </>
    );
  }

  return (
    <div className='tablaContainer'>
      <DataTable
        value={datos}
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        header={
          <>
            <Button label='Agregar usuario' icon="pi pi-plus" severity='success' onClick={() => setShowAddForm(true)}></Button>
          </>
        }
      >
        <Column field="name" header="Nombre"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="acciones" header="Acciones" body={actionsTemplate}></Column>
      </DataTable>

      <ConfirmPopup />

      <Dialog header="Agregar usuario" visible={showAddForm} style={{ width: '60vw' }} onHide={() => { if (!showAddForm) return; setShowAddForm(false); }} draggable={false}>
        <AddUserForm></AddUserForm>
      </Dialog>

      <Dialog header="Editar usuario" visible={showUpdateForm} style={{ width: '60vw' }} onHide={() => { if (!showUpdateForm) return; setShowUpdateForm(false); }} draggable={false}>
        <UpdateUserForm user={selectedUser} ></UpdateUserForm>
      </Dialog>
    </div>
  )
}