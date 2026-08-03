# 🏨 HostelOS - Frontend

HostelOS is a modern Hostel Management System frontend built using React.js and Tailwind CSS. It provides a seamless user interface for managing students, room allocations, and maintenance complaints.

---

## ✨ Features

* 📊 **Dashboard Overview:** Real-time stats for room occupancy, pending complaints, and student records.
* 👨‍🎓 **Student Management:** View, search, and manage student details.
* 🚪 **Room Allocation:** Monitor bed availability and room status.
* 🛠️ **Complaint Tracking:** Log and update maintenance tickets.

---

## 🛠️ Tech Stack

* **Framework:** React.js (Vite / CRA)
* **Styling:** Tailwind CSS / CSS Modules
* **HTTP Client:** Axios / Fetch API
* **Routing:** React Router DOM

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** installed on your system.

### 2. Installation
Clone the repository and install dependencies:

\`\`\`bash
git clone <YOUR_FRONTEND_GITHUB_REPO_URL>
cd frontend
npm install
\`\`\`

### 3. Environment Setup
Create a `.env` file in the root of the `frontend` folder:

\`\`\`env
VITE_API_BASE_URL=http://localhost:5000/api
\`\`\`

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

---

## 📁 Directory Structure

\`\`\`text
frontend/
├── src/
│   ├── assets/        # Static images & icons
│   ├── components/    # Reusable UI components
│   ├── pages/         # Dashboard, Rooms, Complaints pages
│   ├── services/      # API calls (Axios setup)
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env.example
├── package.json
└── README.md
\`\`\`