import React from 'react';
import ReactPlayer from 'react-player';
import videoRincones from '../assets/videos/videoRincones.mp4';
import videoCanela from '../assets/videos/videoCanela.mp4';
import videoAV from '../assets/videos/videoAV.mp4';

export const Other = () => {
  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-12 lg:col-4">
          <div className="text-center p-3 border-round-sm font-bold" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
            <span style={{textDecoration: 'underline'}} >Sistema de check-in</span>
            <div>
              <ReactPlayer
                url={videoRincones}
                className='react-player'
                playing
                width='100%'
                height='50vh'
                controls
                loop
                muted
                playbackRate={1.75}
              />
            </div>
            <p>Sistema de check-in para un hotel en Tilcara-Jujuy. Cuenta con un formulario para registrarse, canva para firmar
              y un CRUD para empleados y visitantes.</p>
            <a href="https://github.com/JMReader/RinconesDeJujuy.git" style={{color:'whitesmoke'}} ><span>Link a repositorio en GitHub</span></a>
          </div>
        </div>
        <div className="col-12 md:col-12 lg:col-4">
          <div className="text-center p-3 border-round-sm font-bold" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
            <span style={{textDecoration: 'underline'}}>Página web</span>
            <ReactPlayer
                url={videoCanela}
                className='react-player'
                playing
                width='100%'
                height='50vh'
                controls
                loop
                muted
                playbackRate={1.75}
              />
            <p>Página web para una empresa de trekking en Jujuy, se solicito reestrucutrar la pagina respetando un poco del
              diseño anterior. Pueden filtrarse los circuitos por diferentes campos. Cada circuito cuenta con su respectiva información y galería de fotos.
            </p>
            <a href="https://www.canelatrekandtrip.tur.ar/" style={{color:'whitesmoke'}} ><span>Link a la página</span></a>
          </div>
        </div>
        <div className="col-12 md:col-12 lg:col-4">
          <div className="text-center p-3 border-round-sm font-bold" style={{ borderWidth: 'thin', borderStyle: 'solid' }}>
            <span style={{textDecoration: 'underline'}}>Landing page</span>
            <ReactPlayer
                url={videoAV}
                className='react-player'
                playing
                width='100%'
                height='50vh'
                controls
                loop
                muted
                playbackRate={1.75}
              />
            <p>Landing para una empresa de servicios pesados, un enfoque pensado en el diseño y simplicidad para los posibles clientes.</p>
            <a href="https://www.avserviciospesados.com/" style={{color:'whitesmoke'}} ><span>Link a la página</span></a>
          </div>
        </div>
      </div>
      <h6>Disclaimer: Los videos utilizados fueron el proyecto entregado al cliente, el uso o funcionamiento actual depende del mismo.</h6>
    </>
  )
}
