export const colors = {
  brand: {
    primary: "#84B179",
    primaryHover: "#6b9962",
    primaryLight: "#E6F4EA",   // softer than before (matches cards)
    secondary: "#A2CB8B",
    secondaryHover: "#84B179",
    secondaryLight: "#F0FAF4",
    gradient: "linear-gradient(135deg, #84B179, #A2CB8B)"
  },

  background: {
    main: "#F9FDFB",          // page bg
    card: "#FFFFFF",          // white cards
    section: "#F3F7F4",       // light gray-green section
    hover: "#EAF4EE"          // hover subtle
  },

  text: {
    primary: "#1f2937",
    secondary: "#6b7280",
    muted: "#9CA3AF",
    white: "#FFFFFF"
  },

  status: {
    success: "#22C55E",        // brighter green (badge text)
    successBg: "#E6F9EF",      // soft green pill bg

    warning: "#F59E0B",
    warningBg: "#FEF3C7",

    danger: "#EF4444",
    dangerBg: "#FEE2E2",

    info: "#3B82F6",
    infoBg: "#EFF6FF"
  },

  metrics: {
    heartRate: "#EF4444",     // red ❤️
    spo2: "#3B82F6",          // blue 💧 (FIXED - was wrong)
    temperature: "#F59E0B",   // yellow 🌡️
    bloodPressure: "#84B179"  // green
  },

  ui: {
    borderLight: "#E5EFE8",   // softer border (less saturated)
    borderMedium: "#C7EABB",

    shadowCard: "0 4px 12px rgba(0,0,0,0.06)",
    shadowHover: "0 10px 25px rgba(0,0,0,0.1)",

    glassGreen: "rgba(132, 177, 121, 0.15)" // top health box bg
  }
};