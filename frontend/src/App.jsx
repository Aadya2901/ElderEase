import PatientDashboard from "./pages/PatientDashboard";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/caregiver" element={<CaregiverDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
