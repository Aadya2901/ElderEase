// Stores the last known status for each patient
// Key: userId, Value: "NORMAL" | "WARNING" | "EMERGENCY"
const lastStatus = {};

const hasStatusChanged = (userId, newStatus) => {
  const previous = lastStatus[userId];
  lastStatus[userId] = newStatus;
  return previous !== newStatus;
};

const getLastStatus = (userId) => {
  return lastStatus[userId] || "NORMAL";
};

module.exports = { hasStatusChanged, getLastStatus };