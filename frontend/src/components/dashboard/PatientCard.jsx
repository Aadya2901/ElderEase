import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

export default function PatientCard({ patient }) {
  const navigate = useNavigate();

  const v = patient.latestVital || {};
  const hr = v.heartRate || 0;
  const spo2 = v.spo2 || 0;
  const temp = v.temp ?? v.temperature ?? "--";

  // status logic
  const isCritical =
    hr < 60 || hr > 100 || spo2 < 95 || temp > 100;

  const isWarning =
    !isCritical && (hr > 90 || spo2 < 97);

  let status = "normal";
  if (isCritical) status = "emergency";
  else if (isWarning) status = "warning";

  return (
    <div className={`patient-row ${status}`}>

      {/* LEFT */}
      <div className="patient-left">
        <h3>{patient.name}</h3>
        <p className="sub">{patient.relation}</p>
      </div>

      {/* CENTER */}
      <div className="patient-vitals">
        <span>
          <FavoriteIcon className={`icon ${status}`} />
          {hr} bpm
        </span>

        <span>
          <OpacityIcon className={`icon ${status}`} />
          {spo2}%
        </span>

        <span>
          <DeviceThermostatIcon className={`icon ${status}`} />
          {temp}°C
        </span>
      </div>

      {/* RIGHT */}
      <div className="status-row">
        <span className={`status-badge ${status}`}>
          {status.toUpperCase()}
        </span>

        <div className="updated">
          Updated: Just now
        </div>
      </div>

      {/* BUTTON */}
      <button
        className="btn"
        onClick={() =>
          navigate(`/patient/${patient.userId}`)
        }
      >
        View Details
      </button>

    </div>
  );
}