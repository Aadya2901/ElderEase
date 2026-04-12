export default function ProfileInfoCard({ profile, setProfile }) {
  return (
    <div style={card}>
      <h3>Edit Profile</h3>

      <input
        value={profile.name}
        onChange={(e) =>
          setProfile({ ...profile, name: e.target.value })
        }
        placeholder="Name"
        style={input}
      />

      <input
        value={profile.age}
        onChange={(e) =>
          setProfile({ ...profile, age: e.target.value })
        }
        placeholder="Age"
        style={input}
      />

      <input
        value={profile.phone}
        onChange={(e) =>
          setProfile({ ...profile, phone: e.target.value })
        }
        placeholder="Phone"
        style={input}
      />

      <input
        value={profile.emergency}
        onChange={(e) =>
          setProfile({ ...profile, emergency: e.target.value })
        }
        placeholder="Emergency Contact"
        style={input}
      />
    </div>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  marginTop: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};

const field = {
  marginBottom: "14px"
};

const label = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#6b7280",
  display: "block",
  marginBottom: "4px"
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none"
};