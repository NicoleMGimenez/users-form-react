import React from 'react';
import { InputText } from "primereact/inputtext";
import usuario from '../assets/usuario.png'


export const InfoUser = ({ user }) => {
  console.log(user);
  return (
    <>
      <h3>Información sobre {user.name}</h3>
      <div className="grid">
        <div className="col-12 md:col-4">
          <div className="card flex justify-content-center">
            <div className="flex flex-column gap-2">
              <img src={usuario} alt="" style={{ height: '20vh', alignItems: 'center' }} />
            </div>
          </div>
        </div>
        <div className="col-12 md:col-8">
          <div className="field">
            <label className="font-semibold">Nombre de usuario</label><br />
            <InputText id="username" value={user.username} readOnly type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </div>
          <div className="field">
            <label className="font-semibold">Correo electronico</label><br />
            <InputText id="username" value={user.email} readOnly type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </div>
        </div>

        <div className="col-12">
          <div className="field">
            <label className="font-semibold">Nombre completo</label><br />
            <InputText id="username" value={user.name} readOnly type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </div>
          <div className="field">
            <label className="font-semibold">Ciudad de residencia</label><br />
            <InputText id="username" value={user.address.city} readOnly type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </div>
          <div className="field">
            <label className="font-semibold">Número de contacto</label><br />
            <InputText id="username" value={user.phone} readOnly type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
          </div>
        </div>
      </div>
    </>
  )
}
