# ICT Academy of Kerala (ICTAK) - Submission Kit
## Personal Expense Tracker (MERN Stack Architecture)

---

### 📋 Overview of Required Submissions

Based on the ICTAK evaluation portal, you have two active submission tasks:

```
┌────────────────────────────────────────────────────────┐
│ 1. Software Requirements Specification (SRS) Submission│
│    - Status: Ready to Submit                           │
│    - File: SOFTWARE_REQUIREMENTS_SPECIFICATION.md      │
└────────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ 2. Final Project Submission                            │
│    - Status: Ready to Submit                           │
│    - Required:                                         │
│      1. Project Report (ICTAK_INTERNSHIP_FINAL_REPORT) │
│      2. Public GitHub Repository Link                  │
│      3. Hosted Project Link (Render / Vercel)          │
│      4. Client-side Screenshots (5 Views Included)     │
└────────────────────────────────────────────────────────┘
```

---

## 📝 SUBMISSION 1: Software Requirements Specification Submission

### What to Submit:
Upload or paste your official **Software Requirements Specification (SRS)** document.

### Document Path:
- [SOFTWARE_REQUIREMENTS_SPECIFICATION.md](file:///C:/Users/ASUS/OneDrive/Desktop/final%20project/SOFTWARE_REQUIREMENTS_SPECIFICATION.md)

### Submission Text / Note to Reviewer:
```text
Software Requirements Specification (SRS) - Personal Expense Tracker

Project: Personal Expense Tracker Web Application (MERN Stack Architecture)
Course: Full Stack Application Development with ReactJS
Intern / Student Name: Hains
Roll No: 225919
Institution: Sahrdaya College of Engineering & Technology, Thrissur (Autonomous) / ICTAK
Document Version: 1.0.0 (conforming to IEEE 830 standards)

The complete SRS document has been uploaded as SOFTWARE_REQUIREMENTS_SPECIFICATION.pdf (or .md) and is also accessible in the official GitHub repository at:
https://github.com/hains225919/Personal-Expense-Tracker-/blob/main/SOFTWARE_REQUIREMENTS_SPECIFICATION.md

Key Specifications Covered:
- 1. Introduction (Purpose, Scope, Conventions, References)
- 2. Overall Description (Product Perspective, User Roles, Operating Environment, Constraints)
- 3. Functional Requirements (FR1 to FR5: Create, Read/Filter, Update, Delete with Modal Safeguard, Dynamic Total Calculation)
- 4. External Interface Requirements (UI modules, REST API contract, Mongoose ODM, MongoDB Atlas)
- 5. Non-Functional Requirements (Performance, Security, Fault-tolerant Hybrid DB Architecture, Usability & WCAG compliance)
- 6. Database Schema Specification (Expense Mongoose Schema with Compound Indexes & Data Dictionary)
- 7. Acceptance Criteria & Verification Matrix
```

---

## 🚀 SUBMISSION 2: Final Project Submission

### 1. GitHub Repository Link:
```text
https://github.com/hains225919/Personal-Expense-Tracker-.git
```
*(Verified: Public repository, clean commit history, fully synchronized)*

### 2. Hosted Project Link:
You can deploy the application in 2 minutes for free using **Render** or **Vercel**:

#### Option A: 1-Click Deploy on Render (Recommended - Free Web Service)
1. Go to [https://dashboard.render.com/](https://dashboard.render.com/) and sign in with GitHub.
2. Click **New +** > **Web Service**.
3. Select your repository: `hains225919/Personal-Expense-Tracker-`.
4. Configure settings:
   - **Name:** `personal-expense-tracker`
   - **Environment:** `Node`
   - **Build Command:** `npm run install-all && npm run build`
   - **Start Command:** `npm start`
5. Click **Deploy Web Service**.
6. Render will assign you a live HTTPS URL, e.g.:
   `https://personal-expense-tracker-mern.onrender.com`

#### Option B: Deploy Frontend on Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new) and import `hains225919/Personal-Expense-Tracker-`.
2. Set **Root Directory** to `frontend`.
3. Build command: `npm run build`, Output directory: `dist`.
4. Click **Deploy**. Vercel will provide:
   `https://personal-expense-tracker-hains.vercel.app`

### 3. Client-Side Views & Screenshots:
All screenshots are saved in `./screenshots/` and embedded directly in the report:

1. **Dashboard Desktop View:**  
   `screenshots/01_dashboard_desktop.png`  
   *Summary cards, active total spent calculation, input form, category filter bar, and transaction table.*

2. **Filtered by Category View:**  
   `screenshots/02_filtered_by_category.png`  
   *Real-time category filtering and reactive subtotal updates.*

3. **Edit Expense Pre-filled View:**  
   `screenshots/03_edit_expense_prefilled.png`  
   *Pre-filled form controls and cancel/update button toggling.*

4. **Delete Confirmation Modal View:**  
   `screenshots/04_delete_confirmation_modal.png`  
   *Interactive safety modal dialog preventing accidental data loss.*

5. **Mobile Viewport View:**  
   `screenshots/05_dashboard_mobile.png`  
   *Responsive touch-optimized card layout on mobile screens.*

### 4. Project Documentation / Report:
The complete Summer Internship Report conforming to the official ICTAK outline is saved at:
- [ICTAK_INTERNSHIP_FINAL_REPORT.md](file:///C:/Users/ASUS/OneDrive/Desktop/final%20project/ICTAK_INTERNSHIP_FINAL_REPORT.md)

---

## 🖨️ How to Export to PDF for Submission (Optional)

If your LMS requires `.pdf` file uploads instead of markdown text:

### Method 1: Via Google Chrome or Edge
1. Open the `.md` file in VS Code or GitHub in your browser.
2. If viewing on GitHub (`https://github.com/hains225919/Personal-Expense-Tracker-/blob/main/SOFTWARE_REQUIREMENTS_SPECIFICATION.md`):
   - Right-click anywhere on the rendered page and select **Print...** (or press `Ctrl + P`).
   - Destination: **Save as PDF**.
   - Margins: **Default**; Options: check **Background graphics**.
   - Click **Save**.

### Method 2: Via VS Code Markdown PDF Extension
1. In VS Code, install the extension **Markdown PDF** (`yzane.markdown-pdf`).
2. Right-click inside `SOFTWARE_REQUIREMENTS_SPECIFICATION.md` or `ICTAK_INTERNSHIP_FINAL_REPORT.md`.
3. Select **Markdown PDF: Export (pdf)**.
