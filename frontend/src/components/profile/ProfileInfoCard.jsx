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