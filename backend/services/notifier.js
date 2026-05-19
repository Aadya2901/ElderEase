const twilio = require("twilio");
const nodemailer = require("nodemailer");

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const getMessageContent = (patientName, status) => {
  if (status === "EMERGENCY") {
    return {
      subject: `🚨 EMERGENCY ALERT - ${patientName}`,
      text: `EMERGENCY: ${patientName}'s vitals are critical. Immediate attention required.`
    };
  }
  return {
    subject: `⚠️ WARNING - ${patientName}`,
    text: `WARNING: ${patientName}'s vitals are abnormal. Please check the dashboard.`
  };
};

const notify = async (patientName, status, caregiverPhone, caregiverEmail) => {
  const { subject, text } = getMessageContent(patientName, status);

  // Send SMS
  try {
    await twilioClient.messages.create({
      body: text,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: caregiverPhone
    });
    console.log(`SMS sent to ${caregiverPhone}`);
  } catch (err) {
    console.error("SMS failed:", err.message);
  }

  // Send Email
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: caregiverEmail,
      subject,
      text
    });
    console.log(`Email sent to ${caregiverEmail}`);
  } catch (err) {
    console.error("Email failed:", err.message);
  }
};

module.exports = { notify };