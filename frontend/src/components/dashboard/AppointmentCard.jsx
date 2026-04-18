import { useState } from "react";
import { colors } from "../../styles/colors";

export default function AppointmentCard() {

  const [appointments, setAppointments] = useState([
    { title: "Doctor Visit", date: "2026-04-15", done: false }
  ]);

  const [newAppt, setNewAppt] = useState("");

  const addAppointment = () => {
    if (!newAppt) return;

    setAppointments([
      ...appointments,
      {
        title: newAppt,
        date: new Date().toISOString().slice(0, 10),
        done: false
      }
    ]);

    setNewAppt("");
  };

  const toggleDone = (index) => {
    const updated = [...appointments];
    updated[index].done = !updated[index].done;
    setAppointments(updated);
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div style={card}>

      <h3>📅 Appointment Reminder</h3>

      {/* ➕ ADD */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          value={newAppt}
          onChange={(e) => setNewAppt(e.target.value)}
          placeholder="Add appointment..."
          style={input}
        />

        <button onClick={addAppointment} style={btn}>
          Add
        </button>
      </div>

      {/* 📋 LIST */}
      {appointments.map((appt, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px",
            borderBottom: "1px solid #eee",
            opacity: appt.done ? 0.5 : 1,

            background: appt.date === today ? "#fef3c7" : "transparent"
          }}
        >
          <span>
            {appt.title} ({appt.date})
          </span>

          <button onClick={() => toggleDone(i)} style={smallBtn}>
            {appt.done ? "Undo" : "Done"}
          </button>
        </div>
      ))}

    </div>
  );
}

// 🔥 STYLES

const card = {
  marginTop: "20px",
  padding: "16px",
  borderRadius: "14px",
  background: "white",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const input = {
  flex: 1,
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const btn = {
  padding: "8px 12px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const smallBtn = {
  padding: "4px 8px",
  background: "#22c55e",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};