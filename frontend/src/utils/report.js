import jsPDF from "jspdf";

export const downloadReport = ({
  userName,
  heartRate,
  spo2,
  temperature,
  riskLevel,
  aiData
}) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("ElderEase Health Report", 20, 20);

  doc.setFontSize(12);

  doc.text(`Patient: ${userName || "Margaret Johnson"}`, 20, 40);
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 50);

  doc.text("Vitals:", 20, 70);
  doc.text(`Heart Rate: ${heartRate} bpm`, 20, 80);
  doc.text(`SpO2: ${spo2}%`, 20, 90);
  doc.text(`Temperature: ${temperature}°C`, 20, 100);

  doc.text(`Risk Level: ${riskLevel}`, 20, 120);

  doc.text("AI Insights:", 20, 140);

  aiData?.actions?.forEach((a, i) => {
    doc.text(`- ${a}`, 20, 150 + i * 10);
  });

  doc.save("ElderEase_Report.pdf");
};