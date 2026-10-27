# ICT ACADEMY OF KERALA (ICTAK)
## Full Stack Development Project Report
### Personal Expense Tracker (MERN Stack Architecture)

---

```
                       ___ ____ _____  _    _  __
                      |_ _/ ___|_   _|/ \  | |/ /
                       | | |     | | / _ \ | ' / 
                       | | |___  | |/ ___ \| . \ 
                      |___\____| |_/_/   \_\_|\_\
                 ICT ACADEMY OF KERALA - BUILDING TALENT
```

| Project Information | Details |
|---|---|
| **Project Title** | Personal Expense Tracker Web Application |
| **Technology Stack** | MERN Stack (MongoDB Atlas, Express.js, React.js, Node.js) |
| **Organization** | ICT Academy of Kerala (ICTAK) |
| **Domain** | Full Stack Application Development & Cloud Database Integration |
| **Intern / Student Name** | Student Intern |
| **Evaluation Date** | October 2026 |
| **Submission Deadline** | 12:30 PM IST |
| **Project Repository** | Personal-Expense-Tracker (Monorepo with Frontend & Backend) |

---

## 1. Executive Summary

The **Personal Expense Tracker** is a comprehensive, production-grade 3-tier web application developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The system is designed to provide users with an efficient, intuitive, and responsive platform to track, manage, categorize, and analyze daily financial expenditures.

All transaction data is persisted in a **MongoDB Atlas Cloud Database** (leveraging Mongoose Object Data Modeling) and managed via a fully compliant RESTful API backend. On the client side, a modern Single Page Application (SPA) built with **React 19** offers a clean, fluid user interface that automatically updates key metrics—notably the **Total Amount Spent** and category breakdowns—reactively upon any Create, Read, Update, or Delete (CRUD) operation without requiring manual browser refreshes.

### Key Deliverables Achieved
1. **Full CRUD Operations**: End-to-end implementation of Add, View, Edit, and Delete workflows across frontend and backend.
2. **Strict Validation Engine**: Both client-side and server-side validation rejecting invalid data such as blank titles, empty fields, and negative/zero amounts.
3. **Reactive State & Total Tracking**: Dynamic calculation of Total Amount Spent prominently rendered at the top of the interface, recalculating automatically after any database modification.
4. **Pre-filled Edit Workflow**: Smooth state transition when selecting an expense for modification, pre-populating all form fields with existing values.
5. **Interactive Confirmation Safeguard**: Modal dialog requiring user verification before permanently deleting any expense record from the database.
6. **Responsive UI/UX**: Mobile-first fluid CSS architecture incorporating category color badges, status pills, floating toast notifications, and responsive desktop/mobile presentations.
7. **Hybrid Database Resiliency**: Configured for MongoDB Atlas Cloud deployment with built-in automated in-memory fallback for zero-dependency local evaluation.

---

## 2. Problem Statement & Scope

### 2.1 Problem Description
Manual personal financial tracking often relies on disorganized spreadsheets or physical logs, which are prone to calculation errors, lack data validation, and fail to provide immediate visual feedback on spending habits. Users require a streamlined web application that allows daily expenses to be logged quickly, categorized cleanly, updated when corrections are needed, and summarized automatically.

### 2.2 Technical Scope & Requirements Matrix

| Requirement ID | Specification | Implementation Strategy |
|:---:|---|---|
| **REQ-01** | **Add Expense Form** | Form with Title, Amount, Category (`Food`, `Travel`, `Bills`, `Shopping`, `Other`), and Date. Rejects empty or negative amounts. Displays toast notifications upon success or error. |
| **REQ-02** | **View Expenses Directory** | Clean table (desktop) and stacked cards (mobile) listing Title, Amount, Category, and Date. Auto-refreshes on every mutation without page reloads. |
| **REQ-03** | **Edit Expense Record** | Dedicated edit action that pre-fills the form with existing data and persists updates to MongoDB Atlas. |
| **REQ-04** | **Delete Expense Record** | Delete action protected by an interactive confirmation modal before removing records from MongoDB Atlas and UI. |
| **REQ-05** | **Dynamic Total Summary** | Real-time calculation and display of the Total Amount Spent at the top of the dashboard. |
| **REQ-06** | **Backend REST API** | Node.js and Express.js REST API providing `GET`, `POST`, `PUT`, `DELETE` endpoints and Mongoose ODM integration. |
| **REQ-07** | **Responsive UI/UX** | Mobile and desktop optimized interface carrying clean typography, card layouts, category icons, and high visual appeal. |

---

## 3. System Architecture & Component Design

The application follows the classic **MERN 3-Tier Layered Architecture**:

```
+-------------------------------------------------------------+
|                  Client / Presentation Tier                 |
|                   React 19 SPA (Vite)                       |
|   Navbar | ExpenseSummary | ExpenseForm | ExpenseList | ... |
+------------------------------+------------------------------+
                               | Axios HTTP (JSON)
                               v
+-------------------------------------------------------------+
|                   Application / API Tier                    |
|                    Node.js & Express.js                     |
|  CORS | Morgan | JSON Body Parser | Expense Routes & Ctrl   |
+------------------------------+------------------------------+
                               | Mongoose ODM
                               v
+-------------------------------------------------------------+
|                      Data Storage Tier                      |
|                  MongoDB Atlas Cloud Cluster                |
|           (with Resilient Local In-Memory Fallback)         |
+-------------------------------------------------------------+
```

### 3.1 Project Structure

```
Personal-Expense-Tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic & fallback
│   ├── controllers/
│   │   └── expenseController.js  # CRUD & Summary handlers
│   ├── models/
│   │   └── Expense.js            # Mongoose schema with validations
│   ├── routes/
│   │   └── expenseRoutes.js      # Express REST router
│   ├── .env                      # Backend environment variables
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server & static SPA host
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DeleteModal.jsx   # Delete confirmation modal
│   │   │   ├── ExpenseForm.jsx   # Add / Edit pre-filled form
│   │   │   ├── ExpenseList.jsx   # Responsive expense directory table
│   │   │   ├── ExpenseSummary.jsx# Total Amount Spent & category stats
│   │   │   ├── Navbar.jsx        # Top brand bar & live connection badge
│   │   │   └── Notification.jsx  # Dismissible toast feedback
│   │   ├── services/
│   │   │   └── api.js            # Axios client with base URL configuration
│   │   ├── App.jsx               # Main state container & coordinator
│   │   ├── index.css             # Fluid responsive design system
│   │   └── main.jsx              # React DOM initialization
│   ├── .env                      # Frontend environment variables
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite configuration with proxy
│
├── screenshots/                  # High-res verification captures
├── .env                          # Root environment variables
├── .gitignore                    # Git tracking rules
├── capture-screenshots.js        # Automated headless Chrome capture tool
├── package.json                  # Monorepo coordinator scripts
├── README.md                     # Setup instructions & API guide
└── seed-data.js                  # Database seeder utility
```

---

## 4. Backend Engineering & RESTful API

### 4.1 Mongoose Data Model (`Expense.js`)
The `Expense` schema enforces strong typing and validation at the database layer:

```javascript
const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an expense title'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an expense amount'],
      min: [0.01, 'Amount must be greater than zero']
    },
    category: {
      type: String,
      required: [true, 'Please select an expense category'],
      enum: {
        values: ['Food', 'Travel', 'Bills', 'Shopping', 'Other'],
        message: '{VALUE} is not a valid category'
      },
      default: 'Other'
    },
    date: {
      type: Date,
      required: [true, 'Please provide a valid date'],
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);
```

### 4.2 RESTful API Endpoints Matrix

| Endpoint | Method | Functionality | Input | Success Status | Error Status |
|---|---|---|---|:---:|:---:|
| `/api/expenses` | `GET` | Retrieve all expenses (supports category & search query filters) | Query parameters (optional) | `200 OK` | `500 Server Error` |
| `/api/expenses/:id` | `GET` | Retrieve a single expense by ID | URL parameter `:id` | `200 OK` | `404 Not Found` |
| `/api/expenses` | `POST` | Create a new expense with validation | JSON body `{ title, amount, category, date }` | `201 Created` | `400 Bad Request` |
| `/api/expenses/:id` | `PUT` | Update an existing expense record | JSON body with fields to modify | `200 OK` | `400 / 404` |
| `/api/expenses/:id` | `DELETE` | Permanently remove an expense record | URL parameter `:id` | `200 OK` | `404 Not Found` |
| `/api/expenses/summary` | `GET` | Calculate total amount spent and category breakdown | None | `200 OK` | `500 Server Error` |
| `/api/health` | `GET` | Health check endpoint returning DB state | None | `200 OK` | - |

### 4.3 Validation & Error Handling
- **Negative & Zero Amount Prevention**: The controller explicitly checks:
  ```javascript
  if (amount === undefined || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Expense amount must be a positive number greater than 0'
    });
  }
  ```
- **Empty Title Rejection**: Returns `400 Bad Request` if title is omitted or consists solely of whitespace.
- **Categorical Integrity**: Strict enum enforcement limits categories to `Food`, `Travel`, `Bills`, `Shopping`, and `Other`.

---

## 5. Frontend Engineering & User Experience

### 5.1 React 19 Component Architecture
The presentation layer is structured into modular components:

1. **`Navbar`**: Displays the application branding, real-time database connection status badge, and current transaction count.
2. **`ExpenseSummary`**: The hero section at the top of the page showing:
   - **Total Amount Spent**: Highlighted in a bold card with formatted currency.
   - **Transaction Count Badge**: Live count of recorded expenses.
   - **Category Distribution**: Visual progress bars and percentage distribution for each category.
3. **`ExpenseForm`**: Dual-purpose reactive form:
   - **Add Mode**: Allows entering Title, Amount, Category, and Date with inline error validation and loading indicators.
   - **Edit Mode**: Activated when clicking the Edit button on any record; pre-fills all input fields, updates header to "Edit Expense Record", and provides "Save Changes" and "Cancel" buttons.
4. **`ExpenseList`**:
   - **Interactive Search & Category Filters**: Filters by category pill (`All`, `Food`, `Travel`, `Bills`, `Shopping`, `Other`) and search term.
   - **Desktop Table View**: Clean tabular display with distinct category color badges and formatted dates.
   - **Mobile Cards Stack**: Responsive card layout optimized for touch screens.
5. **`DeleteModal`**: Confirmation modal preventing accidental data loss by prompting the user to confirm deletion.
6. **`Notification`**: Toast feedback system auto-dismissing after 4 seconds to inform users of operation outcomes.

### 5.2 Automatic UI Refresh Without Page Reload
Every mutation in the application (`handleAddExpense`, `handleUpdateExpense`, `handleConfirmDelete`) executes an asynchronous API call, awaits confirmation, and immediately re-triggers `loadData()`. This re-fetches both the expense list and aggregate summary in parallel:

```javascript
const loadData = useCallback(async () => {
  try {
    setLoading(true);
    const [expensesRes, summaryRes] = await Promise.all([
      getExpenses(),
      getSummary()
    ]);
    if (expensesRes.success) setExpenses(expensesRes.data || []);
    if (summaryRes.success) setSummary(summaryRes.data || null);
  } finally {
    setLoading(false);
  }
}, []);
```
This guarantees that **the total amount spent and directory table update immediately** on-screen without requiring a manual page refresh.

---

## 6. Verification & Test Results

| Test ID | Test Scenario | Expected Outcome | Actual Result | Status |
|:---:|---|---|---|:---:|
| **TC-01** | Connect to database on startup | Connects to MongoDB Atlas or initializes local in-memory fallback | Connected successfully on port 5000 | **PASS** |
| **TC-02** | Add valid expense via form | Expense stored in DB, returns 201, shows success toast, total recalculates | Created and displayed with instant total update | **PASS** |
| **TC-03** | Submit negative amount (`-15.00`) | Client shows inline error; server rejects with `400 Bad Request` | Rejected; message displayed to user | **PASS** |
| **TC-04** | Submit empty title | Form flags title as required; request blocked | Flagged; submission prevented | **PASS** |
| **TC-05** | View all expenses | Renders Title, Amount, Category badge, and formatted Date | All columns displayed accurately | **PASS** |
| **TC-06** | Edit expense record | Form pre-populates with existing data; saving updates DB and UI | Pre-filled cleanly; updated in DB and on screen | **PASS** |
| **TC-07** | Delete expense record | Modal prompts for confirmation; confirming deletes record and updates total | Modal verified; record removed from DB and UI | **PASS** |
| **TC-08** | Verify Total Amount Spent | Sum of all amounts calculated accurately | Displays exact aggregate sum with dollar formatting | **PASS** |
| **TC-09** | Category filter | Clicking category pill filters directory list to matching records | Filter applied correctly | **PASS** |
| **TC-10** | Mobile viewport rendering | UI adapts cleanly to 390x844 viewport without horizontal overflow | Responsive stacked cards rendered cleanly | **PASS** |

---

## 7. Visual Interface Gallery

### 7.1 Desktop Dashboard (Full View)
![Desktop Dashboard](./screenshots/01_dashboard_desktop.png)

### 7.2 Category-Filtered View (Food Category)
![Filtered Directory](./screenshots/02_filtered_by_category.png)

### 7.3 Edit Expense Form (Pre-filled State)
![Edit Mode](./screenshots/03_edit_expense_prefilled.png)

### 7.4 Delete Confirmation Modal
![Delete Modal](./screenshots/04_delete_confirmation_modal.png)

### 7.5 Mobile View (iPhone 14 Layout)
![Mobile View](./screenshots/05_dashboard_mobile.png)

---

## 8. Submission Checklist Verification

- [x] **Repository is public / accessible to evaluators.**
- [x] **Both `frontend/` and `backend/` folders are included and organized.**
- [x] **The `.env` configuration file is included.**
- [x] **`package.json` files list all runtime and build dependencies.**
- [x] **The project connects to MongoDB Atlas and runs reliably after fresh clone and `npm install`.**
- [x] **Add, View, Edit, and Delete work end-to-end, and the Total updates correctly.**
- [x] **The UI is responsive across mobile and desktop viewports.**
- [x] **Final implementation and verification completed well before the 12:30 PM deadline.**

---

## 9. Conclusion

The **Personal Expense Tracker** successfully fulfills every architectural, functional, and user-experience criterion stipulated in the project problem statement. Through clean modular engineering, comprehensive validation rules, reactive state synchronization, and a mobile-responsive UI design, this MERN stack solution provides a complete personal finance management application ready for formal evaluation.
