import "./App.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.min.css';
import 'animate.css';

import { PrimeReactProvider } from 'primereact/api';
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Home } from "./pages/Home";
import Users from "./pages/Users";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Cryptos } from "./pages/Cryptos";

function App() {
  return (
    <Router>
      <div className="appContainer">
        <PrimeReactProvider>
          <Header />
          <div className="routeContainer">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/usuarios" element={<Users />} />
              <Route path="/cryptos" element={<Cryptos />} />
            </Routes>
          </div>
          <div className="footerContainer">
            <Footer />
          </div>
        </PrimeReactProvider>
      </div>
    </Router>
  );
}

export default App;
