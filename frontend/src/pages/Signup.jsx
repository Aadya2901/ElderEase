import { useState } from "react";
import { colors } from "../styles/colors";

export default function Signup() {

  const [role, setRole] = useState("patient");

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    emergency: "",
    relationship: ""
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("role", role);
    localStorage.setItem("profile", JSON.stringify(form));

    alert("Signup successful!");

    window.location.href = "/login";
  };

  return (
    <div style={container}>

      <div style={card}>

        <h2 style={{ marginBottom: "10px" }}>Create Account</h2>

        {/* ROLE SELECT */}
        <div style={{ marginBottom: "15px" }}>
          <label style={label}>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={input}
          >
            <option value="patient">Patient</option>
            <option value="caregiver">Caregiver</option>
          </select>
        </div>

        {/* COMMON FIELDS */}
        <input placeholder="Full Name" style={input}
          onChange={(e) => handleChange("name", e.target.value)} />

        <input placeholder="Email" style={input}
          onChange={(e) => handleChange("email", e.target.value)} />

        <input placeholder="Phone" style={input}
          onChange={(e) => handleChange("phone", e.target.value)} />

        <input type="password" placeholder="Password" style={input}
          onChange={(e) => handleChange("password", e.target.value)} />

        <input type="password" placeholder="Confirm Password" style={input}
          onChange={(e) => handleChange("confirmPassword", e.target.value)} />

        {/* PATIENT ONLY */}
        {role === "patient" && (
          <>
            <input placeholder="Age" style={input}
              onChange={(e) => handleChange("age", e.target.value)} />

            <input placeholder="Gender" style={input}
              onChange={(e) => handleChange("gender", e.target.value)} />

            <input placeholder="Emergency Contact" style={input}
              onChange={(e) => handleChange("emergency", e.target.value)} />
          </>
        )}

        {/* CAREGIVER ONLY */}
        {role === "caregiver" && (
          <input placeholder="Relationship" style={input}
            onChange={(e) => handleChange("relationship", e.target.value)} />
        )}

        {/* SIGNUP BUTTON */}
        <button
          onClick={handleSignup}
          style={btn}
        >
          Sign Up
        </button>

        {/* LOGIN */}
        <p style={{ marginTop: "10px", fontSize: "14px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={() => window.location.href = "/login"}
            style={{ color: colors.brand.primary, cursor: "pointer" }}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

// 🔥 STYLES

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "#f9fafb"
};

const card = {
  width: "350px",
  padding: "20px",
  borderRadius: "14px",
  background: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const label = {
  fontSize: "13px",
  fontWeight: "600"
};

const btn = {
  width: "100%",
  marginTop: "15px",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: colors.brand.primary,
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};