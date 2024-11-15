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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename="/users-form-react">
      <div className="appContainer">
        <PrimeReactProvider>
          <Header />
          <div className="routeContainer">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/usuarios" element={<Users />} />
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