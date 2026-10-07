# 🏛️ QueueLess Kacheri / NagrikSeva AI
> **Atmiya Hackathon 2026 • Government of Gujarat DPI Super-App**  
> *"Skip The Queue, Not Your Work"* (કચેરીની લાંબી લાઈનો અને ધક્કામાંથી મુક્તિ)

---

## 🌟 Overview
**QueueLess Kacheri (NagrikSeva AI)** is a Digital Public Infrastructure (DPI) web application engineered for all **33 Districts, 250+ Talukas, and Jan Seva Kendras** of Gujarat. It eliminates physical queues, paper rejections, and bureaucratic delays through AI-assisted document validation, capped slot booking, and real-time crowd radars.

---

## 🚀 Key Modules & Features

### 1. 🌾 39 Official Gujarat Schemes Catalog
Comprehensive digitized service directory across 4 departments:
- **ખેતીવાડી (Agriculture & Farming - 12 Schemes):** i-Khedut Tractor, Tools, Drip Irrigation, Tarpaulin, Seeds, Godown, PM-KISAN, MKSY, Deshi Gay Sahay, Smartphone Sahay.
- **આરોગ્ય & સુરક્ષા (Healthcare & Social Security - 9 Schemes):** PM-JAY Ayushman Bharat (₹10 Lakh), MA Vatsalya, Ganga Swarupa, PMSBY, Matrushakti (MMY), Chiranjeevi, Poshan Sudha, Janani Suraksha, Niradhar Vrudh Pension.
- **શિક્ષણ & સ્કોલરશિપ (Education & Study - 8 Schemes):** Namo Lakshmi (Class 9-12), MYSY, Namo Saraswati Vigyan Sadhana, Digital Gujarat Pre & Post Matric, CMSS, Saraswati Cycle, Foreign Study Loan (₹15 Lakh).
- **આવાસ & સામાજિક કલ્યાણ (Housing & Welfare - 10 Schemes):** PMAY-Gramin, PMAY-Urban, Dr. Ambedkar Awas, Pandit Deendayal Awas, Manav Garima, Vahli Dikri, Kunwarbai Mameru, Sant Surdas Divyang, Income Certificate (3-Year Validity), Caste Certificate.

### 2. 📷 AI CamScanner Viewfinder & 3-Year Expiry OCR
- **Live Camera Scan:** Green framing overlay with laser scan beam.
- **RTS 3-Year Legal Expiry Rule:** Income certificates issued before 2023 are automatically flagged as expired under Gujarat Public Service Guarantee (GRTSA 2013).
- **Bilingual Audio & Haptics:** Audio guidance in Gujarati (*"આવક પ્રમાણપત્ર માન્ય છે"* / *"દાખલો ૩ વર્ષથી જૂનો છે, નવો કઢાવો"*).

### 3. ☁️ Google Drive & Folder Direct Upload Studio
- Dedicated cloud upload mode (camera viewfinder automatically hides).
- Direct file upload (`.pdf`, `.jpg`, `.png`).
- **Upload Entire Folder (`webkitdirectory`)** for batch documents.
- 1-Click Interactive Google Drive / DigiLocker cloud browser with ready-to-test sample certificates.

### 4. 🔒 2FA Civic Login Validation Before Token Collection
- Enforces user authentication before issuing or collecting any official token.
- Seamless 2FA Civic Login (Mobile OTP + Aadhaar 4-digits).
- **1-Click Hackathon Judge Demo Login:**
  - 👤 **નાગરિક લૉગિન (Nagrik Login):** Mohanbhai Patel, Rajkot Rural (Token `#A-42`)
  - 🏛️ **કચેરી લૉગિન (Kacheri Login):** Counter 1, Gondal Mamlatdar (Token `#A-40`)

### 5. 📱 PWA & Offline Zero-Dependency File
- **Standalone `preview.html`:** Complete self-contained version with zero external build requirements. Runs straight in any browser.
- PWA offline install banner for seamless mobile access.

---

## 💻 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with Official GoG/GoI Palette (`#003366`, `#005A9C`, `#FF9933`, `#138808`, `#F5F7FA`)
- **Icons:** Lucide React & FontAwesome 6
- **APIs:** HTML5 MediaDevices (Camera), Web Speech API (Gujarati voice synthesis), Web Vibration API (Haptics)

---

## 🛠️ How to Run Locally

```bash
# 1. Navigate to the project directory
cd QueueLess-Kacheri

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
http://localhost:3000
```

Or simply open `preview.html` directly in Google Chrome / Edge without any server setup!
