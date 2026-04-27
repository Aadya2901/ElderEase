// hooks/useVitals.js

import { useEffect, useState } from "react";
import api from "../services/api";

export default function useVitals(patientId) {
  const [history, setHistory] = useState([]);
  const [latest, setLatest] = useState({});

  const fetchVitals = async () => {
    try {
      const res = await api.get(`/caregiver/patient/${patientId}/history`);
      
      const data = res.data || [];

      setHistory(data);

      const last = data[data.length - 1] || {};
      setLatest({
        heartRate: last.heartRate || 0,
        spo2: last.spo2 || 0,
        temperature: last.temp ?? last.temperature ?? 0
      });

    } catch (err) {
      console.log("Vitals error:", err);
    }
  };

  useEffect(() => {
    fetchVitals();
    const timer = setInterval(fetchVitals, 5000);
    return () => clearInterval(timer);
  }, [patientId]);

  return { history, latest };
}