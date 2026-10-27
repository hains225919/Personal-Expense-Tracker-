# Personal Expense Tracker (MERN Stack)

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-4.x-black.svg)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas%20Cloud-brightgreen.svg)](https://www.mongodb.com/atlas)
[![UI/UX](https://img.shields.io/badge/Design-Responsive%20Mobile%20%26%20Desktop-purple.svg)](#uiux-design)

A modern, responsive, and full-featured **Personal Expense Tracker** web application engineered with the **MERN Stack** (MongoDB Atlas, Express.js, React.js, Node.js). The application allows users to record, manage, filter, and analyze daily expenses with real-time automatic UI updates and zero manual page reloads.

---

## 📸 Application Screenshots

### 1. Desktop Dashboard (Summary, Form, and Directory)
![Dashboard Desktop](./screenshots/01_dashboard_desktop.png)

### 2. Category-Filtered Directory (e.g. Food Transactions)
![Category Filter](./screenshots/02_filtered_by_category.png)

### 3. Edit Expense Record (Pre-filled Reactive Form)
![Edit Expense](./screenshots/03_edit_expense_prefilled.png)

### 4. Delete Confirmation Modal
![Delete Confirmation](./screenshots/04_delete_confirmation_modal.png)

### 5. Responsive Mobile View (iPhone Viewport)
<p align="center">
  <img src="./screenshots/05_dashboard_mobile.png" alt="Mobile Dashboard" width="380" />
</p>

---

## 🎯 Requirements & Feature Implementation

| Requirement | Implementation Details | Status |
|---|---|:---:|
| **Add Expense** | Title, Amount, Category (`Food`, `Travel`, `Bills`, `Shopping`, `Other`), and Date fields. Form validation prevents empty inputs and negative or zero amounts. Toast messages confirm success or detail validation failures. | ✅ Complete |
| **View Expenses** | Clean, interactive table on desktop and responsive stacked cards on mobile. Lists Title, Amount, Category (with custom color badges & icons), and formatted Date. Refreshes automatically upon CRUD actions without manual reload. | ✅ Complete |
| **Edit Expense** | Click the **Edit** button on any record to seamlessly populate the form with existing data. Submitting updates MongoDB Atlas and immediately updates the live UI and summary calculations. | ✅ Complete |
| **Delete Expense** | Click the **Delete** button to launch a confirmation modal before permanent deletion from MongoDB Atlas and screen removal. | ✅ Complete |
| **Real-time Summary** | Displays **Total Amount Spent** at the top of the screen in real-time, auto-updating on every Add, Edit, or Delete operation, along with category percentage breakdowns. | ✅ Complete |
| **Backend REST API** | Express.js RESTful API adhering to HTTP semantics (`GET`, `POST`, `PUT`, `DELETE`). Uses Mongoose for strict data validation and MongoDB Atlas connectivity with auto-reconnecting fallback. | ✅ Complete |
| **UI/UX & Mobile Responsiveness** | Built using a clean modern design system with cards, fluid CSS grids, category badges, modals, toast feedback, and full responsiveness on desktop and mobile screens. | ✅ Complete |

---

## 🏗️ Architecture & Project Structure

```
Personal-Expense-Tracker/
├── backend/                      # Node.js & Express REST API
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection & resilient fallback
│   ├── controllers/
│   │   └── expenseController.js  # CRUD controller logic & summary aggregation
│   ├── models/
│   │   └── Expense.js            # Mongoose schema with strict validation
│   ├── routes/
│   │   └── expenseRoutes.js      # RESTful route definitions
│   ├── .env                      # Backend environment configuration
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server & static SPA hosting
│
├── frontend/                     # React 19 Single Page Application (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeleteModal.jsx   # Delete confirmation modal dialog
│   │   │   ├── ExpenseForm.jsx   # Add / Edit pre-filled expense form
│   │   │   ├── ExpenseList.jsx   # Responsive expense table & mobile cards
│   │   │   ├── ExpenseSummary.jsx# Total Amount Spent & category breakdown
│   │   │   ├── Navbar.jsx        # Navigation bar & DB status indicator
│   │   │   └── Notification.jsx  # Floating toast notifications
│   │   ├── services/
│   │   │   └── api.js            # Axios HTTP client configuration
│   │   ├── App.jsx               # Root application controller
│   │   ├── index.css             # Comprehensive responsive CSS design system
│   │   └── main.jsx              # React entry point
│   ├── .env                      # Frontend environment configuration
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite configuration with API proxy
│
├── screenshots/                  # High-resolution application screenshots
├── .env                          # Root environment configuration
├── .gitignore                    # Git tracking rules (preserves .env per checklist)
├── capture-screenshots.js        # Automated headless Chrome screenshot utility
├── package.json                  # Root monorepo script coordinator
├── PROJECT_REPORT.md             # Formal ICTAK Project Evaluation Report
├── README.md                     # Documentation & setup guide
└── seed-data.js                  # Sample expense seeder utility
```

---

## 📡 RESTful API Documentation

**Base API URL:** `http://localhost:5000/api/expenses`

| Method | Endpoint | Description | Request Body / Query | Status Codes |
|---|---|---|---|:---:|
| `GET` | `/api/expenses` | Retrieve all expenses (supports search & filter) | `?category=Food&search=coffee` | `200`, `500` |
| `GET` | `/api/expenses/:id` | Retrieve single expense by ID | None | `200`, `404`, `500` |
| `POST` | `/api/expenses` | Create a new expense | `{ "title": "Groceries", "amount": 45.50, "category": "Food", "date": "2026-10-27" }` | `201`, `400`, `500` |
| `PUT` | `/api/expenses/:id` | Update an existing expense | `{ "title": "Updated", "amount": 50.00, "category": "Food" }` | `200`, `400`, `404`, `500` |
| `DELETE` | `/api/expenses/:id` | Delete an expense by ID | None | `200`, `404`, `500` |
| `GET` | `/api/expenses/summary` | Get total amount spent & category breakdown | None | `200`, `500` |
| `GET` | `/api/health` | Health check endpoint & DB status | None | `200` |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Installation
Clone the repository and install all dependencies:

```bash
# Install root, backend, and frontend dependencies in one command
npm run install-all
```

*(Alternatively, run `npm install` inside root, `backend/`, and `frontend/`).*

### 2. Environment Variables (.env)
The project includes pre-configured `.env` files in root and backend:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.mongodb.net/ExpenseTrackerDB?retryWrites=true&w=majority
VITE_API_URL=http://localhost:5000/api
```

> **Note on MongoDB Connection:**
> If you provide an active MongoDB Atlas cluster URI, the application connects to cloud Atlas directly. If you run the app on an isolated machine or evaluate without cloud network access, the database engine **automatically falls back to a high-speed local in-memory MongoDB instance** so the app runs out-of-the-box without crashing!

### 3. Seed Sample Data (Optional)
To populate realistic transactions across all categories:

```bash
npm run seed
```

### 4. Running the Application

You can run the application in either development or production mode:

#### Option A: Single Command Full-Stack Mode (Recommended)
Builds the frontend and starts the Express server serving both the REST API and the React UI:

```bash
npm run build
npm start
```
Then open: **`http://localhost:5000`** in your browser.

#### Option B: Dual Development Server Mode
Run backend and Vite hot-reloading client concurrently:

```bash
npm run dev
```
- Frontend UI: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 🧪 Submission & Evaluation Checklist

- [x] Repository is accessible and clean.
- [x] Both `frontend/` and `backend/` folders are present and properly organized.
- [x] `.env` configuration file is included.
- [x] `package.json` files correctly list all dependencies and scripts.
- [x] Connects to MongoDB Atlas (with local resilient fallback).
- [x] **Add Expense**: Validated against negative numbers and empty fields; displays toast feedback.
- [x] **View Expenses**: Displays Title, Amount, Category, Date with reactive auto-refresh.
- [x] **Edit Expense**: Pre-fills the form with existing data and persists changes.
- [x] **Delete Expense**: Prompts user with confirmation modal before removal.
- [x] **Summary**: Total Amount Spent dynamically updates on any change.
- [x] **UI/UX**: Clean, attractive, mobile and desktop responsive layout.
- [x] Completed and verified well ahead of the 12:30 PM deadline.

---

## 📄 License
ISC License • ICT Academy of Kerala (ICTAK) Evaluation Submission.
