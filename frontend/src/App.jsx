import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import PatientDetail from "./pages/PatientDetail";
import Reports from "./pages/Reports";

function App(){

 return(
  <BrowserRouter>

   <Navbar />

   <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/patient/:id" element={<PatientDetail />} />
    <Route path="/reports/:id" element={<Reports />} />
   </Routes>

  </BrowserRouter>
 );
}

export default App;