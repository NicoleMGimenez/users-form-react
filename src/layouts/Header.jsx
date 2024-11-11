import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Button } from 'primereact/button';

export default function Header() {
  return (
    <div className='headerContainer'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">Proyecto en React</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/"><Button icon="pi pi-home" rounded text label="Home"/></Link>
              <Link to="/usuarios"><Button icon="pi pi-user" rounded text label="Usuarios"/></Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
