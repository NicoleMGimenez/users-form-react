import "./App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Home } from "./pages/Home";
import Users from "./pages/Users";

function App() {
  return (
    <>
      <div className="appContainer">
        <PrimeReactProvider>
          <Header />
          <div className="routeContainer">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="usuarios" element={<Users />} />
            </Routes>
          </div>

        </PrimeReactProvider>
      </div>
      {/* <div className="footerContainer">
        <Footer />
      </div> */}
    </>
  );
}
export default App

