{/* ❤️ VITALS */}
<div style={{
  display: "grid",
  gridTemplateColumns: isMobile
    ? "1fr"
    : "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
  marginTop: "20px"
}}>

  {/* ❤️ Heart Rate */}
  <VitalCard
    title="Heart Rate"
    value={heartRate}
    unit="bpm"
    icon={
      <FavoriteIcon
        style={{
          fontSize: "28px",
          color: heartRate > thresholds.heartRate
            ? colors.status.danger 
            : colors.status.success
        }}
      />
    }
    style={{
  border:
    heartRate > thresholds.heartRate
      ? `2px solid ${colors.status.danger}`
      : `1px solid ${colors.ui.borderLight}`,

  background:
    heartRate > thresholds.heartRate
      ? colors.status.dangerBg
      : colors.background.card
}}
  />

  {/* 🔵 SpO2 */}
  <VitalCard
    title="SpO2"
    value={spo2}
    unit="%"
    icon={
      <OpacityIcon
        style={{
          fontSize: "28px",
          color: spo2 < thresholds.spo2
            ? colors.status.warning
            : colors.status.success
        }}
      />
    }
    style={{
      border:
        spo2 < thresholds.spo2
          ? `2px solid ${colors.status.warning}`
          : `1px solid ${colors.ui.borderLight}`,

      background:
        spo2 < thresholds.spo2
          ? colors.status.warningBg
          : colors.background.card
    }}
  />

  {/* 🌡 Temperature */}
  <VitalCard
    title="Temperature"
    value={temperature}
    unit="°C"
    icon={
      <ThermostatIcon
        style={{
          fontSize: "28px",
          color:
            temperature > thresholds.temperature
              ? colors.status.danger
              : colors.status.success
        }}
      />
    }
    style={{
      border:
        temperature > thresholds.temperature
          ? `2px solid ${colors.status.danger}`
          : `1px solid ${colors.ui.borderLight}`,

      background:
        temperature > thresholds.temperature
          ? colors.status.dangerBg
          : colors.background.card
    }}
  />
</div>