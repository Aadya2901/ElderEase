import { useState, useEffect } from "react";

export default function CaregiverDashboard() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Margaret Johnson",
      heartRate: 120,
      spo2: 89,
      temperature: 38.5
    },
    {
      id: 2,
      name: "Robert Fox",
      heartRate: 78,
      spo2: 96,
      temperature: 36.7
    }
  ]);

  useEffect(() => {
  const interval = setInterval(() => {
    setPatients(prev =>
      prev.map(p => ({
        ...p,
        heartRate: Math.floor(70 + Math.random() * 60),
        spo2: Math.floor(85 + Math.random() * 12),
        temperature: parseFloat((36 + Math.random() * 2).toFixed(1))
      }))
    );
  }, 4000);

    return () => clearInterval(interval);
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ 
      padding: isMobile ? "20px" : "30px",
      background: "#f3f4f6",
      minHeight: "100vh" 
    }}>
      
      <h1 style={{
        fontSize: isMobile ? "24px" : "28px",
        margin: 0
      }}>
        Caregiver Dashboard
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        
        {patients.map((p) => (
          <PatientCard key={p.id} patient={p} />
        ))}

      </div>
    </div>
  );
}

function PatientCard({ patient }) {

  const risk =
    patient.heartRate > 110 || patient.spo2 < 92 || patient.temperature > 38
      ? "HIGH"
      : "NORMAL";

  return (
    <div
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
        border: risk === "HIGH" ? "2px solid #ef4444" : "1px solid #e5e7eb",
        transition: "0.2s ease"
      }}
    >

      {/* NAME */}
      <h3>{patient.name}</h3>

      {/* STATUS */}
      <div style={{
        marginTop: "8px",
        padding: "6px 12px",
        borderRadius: "999px",
        display: "inline-block",
        background: risk === "HIGH" ? "#fee2e2" : "#dcfce7",
        color: risk === "HIGH" ? "#991b1b" : "#065f46",
        fontWeight: "600"
      }}>
        {risk === "HIGH" ? "EMERGENCY" : "NORMAL"}
      </div>

      {risk === "HIGH" && (
        <div style={{
          marginTop: "10px",
          color: "#ef4444",
          fontWeight: "600"
        }}>
          🚨 Immediate attention required
        </div>
      )}

      {/* VITALS */}
      <div style={{ marginTop: "15px" }}>
        ❤️ HR: {patient.heartRate} bpm <br />
        🔵 SpO2: {patient.spo2}% <br />
        🌡 Temp: {patient.temperature}°C
      </div>

      {/* BUTTON */}
      <button
        onClick={() => {
          localStorage.setItem("selectedPatient", JSON.stringify(patient));
          window.location.href = "/dashboard";
        }}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          borderRadius: "10px",
          border: "none",
          background: "#3b82f6",
          color: "white",
          cursor: "pointer"
        }}
      >
        View Details
      </button>

    </div>
  );
}