# 🌱 AgriSmart: Smallholder & First-Time Farmer Platform

> **Target User:** Smallholder and first-time farmers who struggle with **scattered advice**, **language barriers**, and **high input costs**.

---

## 🎯 How the Solution Addresses the Problem Statement

| Problem Pillar | AgriSmart Solution |
| :--- | :--- |
| **1. Scattered Advice** | **Unified Crop Lifecycle Advisory & Crop Doctor**: Single, verified step-by-step calendars (from soil prep, sowing, vegetative growth, flowering, to harvest) and symptom diagnostic system so first-time farmers avoid fragmented, contradictory advice. |
| **2. Language Barriers** | **7-Language Instant Switcher & Voice Audio Narration**: Accessible in **English, हिन्दी (Hindi), Español (Spanish), Kiswahili (Swahili), ਪੰਜਾਬੀ (Punjabi), मराठी (Marathi), and বাংলা (Bengali)**. Every card has a `🔊 Read Aloud` button (Web Speech API) so illiterate or low-literacy farmers can listen to advice in their spoken language. |
| **3. High Input Costs** | **Cost Reduction Toolkit (60%–90% Savings)**: <br>• **Input & Seed Calculator**: Computes exact seed rate and fertilizer amounts to stop over-buying.<br>• **DIY Bio-Inputs**: Step-by-step recipes for Jeevamrutha, NSKE Neem extract, and Buttermilk spray at pennies per liter.<br>• **Equipment Sharing Board**: Rent/share tractors and sprayers by the hour from neighbor farmers.<br>• **Collective Bulk Buying Pool**: Smallholders band together to unlock wholesale discounts (25%–40%).<br>• **Smart Spray Weather Advisor**: Alerts farmers when rain or wind will wash away sprays, preventing wasted money. |

---

## 🌐 Live Host Availability

The backend is running and available on:
- **Local Host URL:** [http://localhost:5000](http://localhost:5000) or [http://127.0.0.1:5000](http://127.0.0.1:5000)
- **Health Check API:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Health Check Response:
```json
{
  "database": "healthy",
  "host_available": true,
  "service": "AgriSmart Smallholder Farmer Hub Backend",
  "status": "online",
  "version": "1.0.0"
}
```

---

## 🛠️ Tech Stack & Architecture

- **Backend:** Python 3.15 + Flask REST API
- **Database:** SQLite (`agri_smart.db`) with relational schemas and seeded agricultural data
- **Frontend:** Vanilla HTML5, CSS3 (Modern Responsive Grid, High-Contrast rural design), JavaScript (ES6+)
- **Accessibility & Voice:** HTML5 Web Speech Synthesis API (`window.speechSynthesis`)
- **Hosting:** Multi-interface binding (`0.0.0.0:5000`) accessible via desktop browser or local network.

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Verifies backend and host status |
| `GET` | `/api/crops` | Returns all crop lifecycles and stage-by-stage guides |
| `GET` | `/api/diagnose?crop=...&symptom=...` | Diagnoses symptoms and provides low-cost remedies |
| `POST` | `/api/calculator/inputs` | Computes exact seed rate, chemical vs organic cost, and net savings |
| `GET` | `/api/recipes` | Returns DIY organic bio-fertilizer and bio-pesticide recipes |
| `GET` | `/api/equipment` | Lists equipment available for rental / sharing |
| `POST` | `/api/equipment` | Creates a new machine listing for neighbors |
| `GET` | `/api/bulk-orders` | Displays active group buying circles |
| `POST` | `/api/bulk-orders/<id>/commit` | Farmers commit units to order pool to unlock wholesale prices |
| `GET` | `/api/weather-advisory` | Returns weather conditions and spray safety assessment |

---

## 🚀 Running the Project Manually

```bash
cd C:\Users\HP\.gemini\antigravity\scratch\agri-smart
python app.py
```
Open your browser at **`http://localhost:5000`**.
