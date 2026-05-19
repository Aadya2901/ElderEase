import { useState } from "react";
import { colors } from "../styles/colors";
import api from "../services/api";

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
    caregiverPhone: "",
    caregiverEmail: ""
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (role === "patient" && (!form.caregiverPhone || !form.caregiverEmail)) {
      alert("Please enter caregiver phone and email");
      return;
    }

    try {
      const res = await api.post("/users/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role,
        age: form.age,
        gender: form.gender,
        caregiverPhone: form.caregiverPhone,
        caregiverEmail: form.caregiverEmail
      });

      if (res.data.success) {
        alert("Signup successful!");
        window.location.href = "/login";
      }

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
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

                    <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "10px", marginBottom: "0" }}>
            Caregiver Phone (include country code)
          </p>
          <input placeholder="+91XXXXXXXXXX" style={{...input, marginTop: "4px"}}
            onChange={(e) => handleChange("caregiverPhone", e.target.value)} />

            <input placeholder="Caregiver Email" style={input}
              onChange={(e) => handleChange("caregiverEmail", e.target.value)} />
          </>
        )}

        {/* SIGNUP BUTTON */}
        <button onClick={handleSignup} style={btn}>
          Sign Up
        </button>

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