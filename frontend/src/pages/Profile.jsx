import { useState, useEffect } from "react";
import { colors } from "../styles/colors";
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

    useEffect(() => {
      const savedProfile = localStorage.getItem("profile");
      const savedThresholds = localStorage.getItem("thresholds");

      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedThresholds) setThresholds(JSON.parse(savedThresholds));
    }, []);

  return (
    <div style={{ 
      padding: "30px",
      background: colors.background.section,
      minHeight: "100vh"
    }}>

      <h2>👤 Profile</h2>

      <div style={{
        marginTop: "6px",
        fontSize: "14px",
        color: colors.text.secondary
      }}>
        Role: <strong>{localStorage.getItem("role") || "Patient"}</strong>
      </div>

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
            alert("Profile saved successfully!");
          }}

          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            background: colors.status.success,
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          💾 Save Changes
        </button>
      </div>

    </div>
  );
}