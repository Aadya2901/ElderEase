import { useState } from "react";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import ThresholdCard from "../components/profile/ThresholdCard";

export default function Profile() {

  const [profile, setProfile] = useState({
    name: "Margaret Johnson",
    age: 68,
    gender: "Female",
    phone: "9876543210",
    emergency: "Son - 9876543211"
  });

  const [thresholds, setThresholds] = useState({
    heartRate: 110,
    spo2: 92,
    temperature: 38
  });

  return (
    <div style={{ padding: "30px" }}>

      <h2>👤 Profile</h2>

      <ProfileInfoCard
        profile={profile}
        setProfile={setProfile}
      />

      <ThresholdCard
        thresholds={thresholds}
        setThresholds={setThresholds}
      />

      {/* 💾 SAVE BUTTON */}
      <div style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <button
          onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
          onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
          onClick={() => {
            localStorage.setItem("profile", JSON.stringify(profile));
            localStorage.setItem("thresholds", JSON.stringify(thresholds));
            alert("Saved!");
          }}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: "#22c55e",
            color: "white",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          💾 Save Changes
        </button>
      </div>

    </div>
  );
}