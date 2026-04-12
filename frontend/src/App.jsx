import Profile from "./pages/Profile";
import PatientDashboard from "./pages/PatientDashboard";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/caregiver" element={<CaregiverDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
