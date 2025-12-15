import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";


import SignUp from './pages/SignUp';
import Login from './Pages/Login';
import Homee from './pages/Homee';
import Help from './pages/Help';
import UberHeader from './Component/Uberheader';
import DrivePage from './pages/DriverPage';
import FindRides from './pages/FindRides';
import DeliverPage from './pages/DeliverPage';
import Footer from './Component/Footer';
import Ride from './pages/Ride';
import 'leaflet/dist/leaflet.css';

 
createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
    <UberHeader />
      <Routes>
        <Route path="/" element={< SignUp />} />
        <Route path="/login" element={< Login />} />
<Route path="/Homee" element={< Homee />} />
<Route path="/FindRides" element={< FindRides/>} />
<Route path="/drive" element={< DrivePage/>} />
<Route path="/deliver" element={< DeliverPage/>} />

<Route path="/help" element={< Help/>} />
<Route path="/ride" element={< Ride/>} />


      </Routes>
      <Footer />
    </BrowserRouter>
  </>
);
