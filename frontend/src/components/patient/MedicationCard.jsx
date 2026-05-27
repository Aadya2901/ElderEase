import { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import { colors } from "../../styles/colors";

export default function MedicationCard() {

  const [meds, setMeds] = useState([
    { name: "Paracetamol", time: "9:00 AM", status: "taken" },
    { name: "BP Tablet", time: "8:00 PM", status: "missed" }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMed, setNewMed] = useState({ name: "", time: "" });

  // 🔁 Toggle status
  const toggleStatus = (index) => {
    const updated = [...meds];
    updated[index].status =
      updated[index].status === "taken" ? "pending" : "taken";
    setMeds(updated);
  };

  // ➕ Add medication
  const addMedication = () => {
    if (!newMed.name || !newMed.time) return;

    setMeds([
      ...meds,
      { ...newMed, status: "pending" }
    ]);

    setNewMed({ name: "", time: "" });
    setShowForm(false);
  };

  const getStatusStyle = (status) => {
    if (status === "taken") {
      return {
        color: colors.status.success,
        bg: colors.status.successBg,
        icon: <CheckCircleIcon style={{ color: colors.status.success }} />,
        text: "Taken"
      };
    }
    if (status === "missed") {
      return {
        color: colors.status.danger,
        bg: colors.status.dangerBg,
        icon: <WarningIcon style={{ color: colors.status.danger }} />,
        text: "Missed"
      };
    }
    return {
      color: colors.status.warning,
      bg: colors.status.warningBg,
      icon: <AccessTimeIcon style={{ color: colors.status.warning }} />,
      text: "Pending"
    };
  };

  return (
    <div style={{
      marginTop: "20px",
      background: colors.background.card,
      border: `1px solid ${colors.ui.borderLight}`,
      boxShadow: colors.ui.shadowCard,
      borderRadius: "14px",
      padding: "18px"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px"
      }}>
        <h3 style={{ margin: 0 }}>💊 Medication Reminder</h3>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "6px 10px",
            borderRadius: "8px",
            border: "none",
            background: colors.brand.primary,
            color: "white",
            cursor: "pointer",
            fontSize: "12px"
          }}
        >
          <AddIcon style={{ fontSize: "16px" }} />
          Add
        </button>
      </div>

      {/* ➕ ADD FORM */}
      {showForm && (
        <div style={{
          marginBottom: "12px",
          display: "flex",
          gap: "10px"
        }}>
          <input
            placeholder="Medicine name"
            value={newMed.name}
            onChange={(e) =>
              setNewMed({ ...newMed, name: e.target.value })
            }
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "8px",
              border: `1px solid ${colors.ui.borderLight}`
            }}
          />

          <input
            type="time"
            value={newMed.time}
            onChange={(e) =>
              setNewMed({ ...newMed, time: e.target.value })
            }
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: `1px solid ${colors.ui.borderLight}`
            }}
          />

          <button
            onClick={addMedication}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              background: colors.status.success,
              color: "white",
              cursor: "pointer"
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* LIST */}
      {meds.map((med, i) => {
        const statusStyle = getStatusStyle(med.status);

        return (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px",
              background: statusStyle.bg
            }}
          >

            {/* LEFT */}
            <div>
              <div style={{ fontWeight: "600" }}>{med.name}</div>
              <div style={{
                fontSize: "12px",
                color: colors.text.secondary
              }}>
                {med.time}
              </div>
            </div>

            {/* RIGHT */}
            <div
              onClick={() => toggleStatus(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                fontWeight: "500",
                color: statusStyle.color
              }}
            >
              {statusStyle.icon}
              {statusStyle.text}
            </div>

          </div>
        );
      })}

    </div>
  );
}