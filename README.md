# Travel Planner - Frontend (Final Project)

This is the frontend application for the Travel Planner project, built as part of the **Adnexio Software Engineering Final Project**. It provides a user-friendly interface to manage travel itineraries and track savings goals.

---

## 📺 Project Demonstration
Click the link below to watch the full walkthrough of the application, features, and technical implementation:

**[Watch the Presentation Video on YouTube](https://youtu.be/8FNqd_3UPyw)**

---

## 🔗 Full-Stack Components
To fulfill the project requirements, please refer to the backend repository below for the API code and database schema:
* **Backend Repository:** https://github.com/salehuddin-rusly/travel-planner-backend
* **Backend API (Live):** https://travel-planner-api-ao35.onrender.com

---

## 🚀 Live Links
* **Live Website:** https://travel-planner-frontend-2z3i.onrender.com
* **Backend API:** https://travel-planner-api-ao35.onrender.com

## ☁️ Deployment Environment
The entire application is hosted on **Render** using a distributed architecture to ensure stability and performance:

| Service | Type | Runtime | Region |
| :--- | :--- | :--- | :--- |
| **Frontend** | Static Site | Static | Global (CDN) |
| **Backend API** | Web Service | Node.js | Singapore (Asia-Southeast) |
| **Database** | Managed DB | PostgreSQL 15 | Singapore (Asia-Southeast) |

> ⚠️ **Note on Performance:** This project is hosted on Render's Free Tier. If the site has been inactive, the backend API may take **50-60 seconds** to "spin up" from a cold start. If you see a "waking up" alert, please wait a minute and refresh the page.

---

## ✨ Key Features
* **Full CRUD Management:** Add, edit, and delete trips with real-time updates.
* **Advanced Search & Sorting:** Search destinations and sort trips by date or budget (High-to-Low / Low-to-High).
* **Dynamic Status Badges:** Automatic categorization for Upcoming, Ongoing, and Completed trips based on the current date.
* **Tabung (Savings Tracker):** Visual progress bar for individual trip savings goals utilizing LocalStorage for persistence.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Custom Glassmorphism Design), Vanilla JavaScript (ES6+).
* **Backend Connection:** Fetch API communicating with a Node.js/Express.js REST API.
* **Database:** Persistent storage using a managed PostgreSQL instance on Render.

## 💻 How to Run Locally
1. Clone this repository.
2. Open `index.html` using a live server (e.g., VS Code Live Server).
3. Ensure the backend API is reachable at the configured `API_URL`.

## 👤 Developer Information
* **Name:** Salehuddin Al-Ayyubi (Hud)
* **Program:** Adnexio Software Engineering Conversion Bootcamp
* **Submission Deadline:** May 9, 2026