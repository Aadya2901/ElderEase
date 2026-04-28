# 💖 ElderEase – Intelligent Senior Health Monitoring System

> A caregiver-first platform for real-time vitals monitoring, AI-powered risk detection, and rapid crisis response.

![Version](https://img.shields.io/badge/version-v1.1-blue)
![Architecture](https://img.shields.io/badge/architecture-modular-success)
![Phase](https://img.shields.io/badge/phase-2-orange)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)
![FOSS](https://img.shields.io/badge/FOSS-compliant-brightgreen)

---

## 📄 Abstract

ElderEase is an intelligent IoT-based health monitoring system designed to provide real-time tracking and proactive care for elderly individuals.

Phase 1 establishes a rule-based monitoring architecture using Node-RED, enabling structured health data simulation, validation, classification, and logging.

The system follows an event-driven, flow-based design and is built entirely using open-source technologies to ensure FOSS compliance.

---

## 🎯 Problem Statement

Elderly individuals living independently face significant health risks such as:

- Sudden heart rate spikes  
- Low oxygen saturation  
- Fever episodes  
- Lack of continuous monitoring  

Most existing systems are reactive and hardware-dependent. ElderEase aims to create a scalable monitoring architecture starting with a simulated real-time pipeline.

---

## 🔗 Live Links

- 🌐 **Frontend**: https://elder-ease-care-hub.web.app/  
- ⚙️ **Backend API**: https://elderease-24ia.onrender.com  
- 📡 **IoT Simulation**: https://elderease-node-red.onrender.com  
- 💻 **Repository**: https://github.com/Aadya2901/ElderEase  

---

## 📌 Overview

ElderEase is a real-time elderly health monitoring system built for the **Google Solution Challenge** under the theme **Rapid Crisis Response**.

It enables caregivers to:
- Monitor patients continuously  
- Detect risks early using AI  
- Respond before emergencies escalate  

---

## 🎯 Problem

- Elderly individuals living alone lack continuous monitoring  
- No real-time visibility for caregivers  
- Existing systems are reactive rather than preventive  
- Delayed response increases health risks  

---

## 💡 Solution

ElderEase provides a real-time monitoring and intelligent alert system that bridges the gap between early detection and timely caregiver response.

---

## 🚀 Features

### 🏥 Caregiver Dashboard
- Real-time monitoring of multiple patients  
- Status indicators: NORMAL / WARNING / EMERGENCY  
- Live vitals (Heart Rate, SpO2, Temperature)  
- Quick navigation to patient details  

### 📊 Real-Time Monitoring
- Updates every 3–5 seconds  
- IoT simulation using Node-RED  
- Automatic threshold-based alerts  

### 🧠 AI Risk Analysis
- Risk levels: LOW / MEDIUM / HIGH  
- Clinical explanations & possible causes  
- Actionable recommendations  
- Trend-based risk detection  
- Fallback logic for reliability  

### 🚨 Emergency System
- Instant alerts on abnormal vitals  
- Fall detection simulation  
- Emergency guidance interface  
- Alert history tracking  

### 📈 Health Reports
- Historical trend visualization  
- Average vitals summary  
- Alert analytics  
- Downloadable PDF reports  

### ⚙️ Custom Thresholds
- Patient-specific monitoring limits  
- Personalized healthcare tracking  

---

## 🛠️ Tech Stack

| Layer    | Technology                    |
|----------|-----------------------------|
| Frontend | React 19, Recharts, MUI Icons |
| Backend  | Node.js, Express              |
| Database | MongoDB (Mongoose)            |
| IoT      | Node-RED                      |
| AI       | Rule-based + Gemini API       |
| Auth     | Firebase Authentication       |
| Hosting  | Firebase (GCP), Render        |
| Reports  | jsPDF                         |

---

## 🏗️ Architecture

IoT Sensors (Node-RED)
↓
HTTP API (Express Backend)
↓
MongoDB Database
↓
AI Analysis Layer
↓
React Frontend
↓
Caregiver Dashboard


---

## 👥 Team – CleverCubed

- Aadya Patel – Frontend + AI/ML  
- Ananya Mishra – Database + Monitoring  
- Anish Kushwaha – Backend + APIs  

---

## ⚙️ Setup

### Prerequisites
- Node.js ≥ 20  
- MongoDB URI  
- Firebase project  

### Backend
``bash
cd backend
npm install
cp .env.example .env
# Add MONGO_URI
npm run dev

### Frontend
cd frontend
npm install
# Add VITE_API_URL
npm run dev

 ### Node Red
 cd node-red
# Import flow.json
# Configure backend API URL


# 🔮 Future Enhancements
-ESP32 hardware integration
-SMS/WhatsApp alerts (Twilio)
-Family access portal
-Predictive ML models
-Hospital EMR integration

# 📄 License

This project is licensed under the MIT License.

# 💬 Final Note

Because every heartbeat deserves timely care. ❤️
