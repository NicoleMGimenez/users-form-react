import imagen from '../assets/2.png';
import { Button } from 'primereact/button';
import Steps from '../components/Steps';
{/* <div>
        <img src={imagen} alt="" style={{height:'30vh'}}/>
      </div> */}
{/* <h1 class="animate__animated animate__heartBeat animate__delay-2s animate__repeat-3"
        style={{ fontSize: '10vh', color: 'aliceblue' }} >Bienvenido "usuario"!</h1> */}
export const Home = () => {
  return (
    <>
      <div className='homeContainer'>
        <div class="typewriter">
          <h1>Bienvenido "usuario"!</h1>
        </div>
        {/* <div className="botones">
        <Button label="Ver usuarios" severity="warning" outlined />
        <Button label="Cargar usuarios" severity="warning" outlined />
      </div> */}
      </div>
    </>

  )
}
