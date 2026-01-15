# Rewardly – Employee Service (Frontend | Angular)

Rewardly Employee Service (Frontend) is an **Angular-based web application** developed as part of the **Rewardly platform** to manage employee-related data and operations.
This project serves as the **frontend implementation** for the Employee Service backend and demonstrates **real-world Angular development practices** used in enterprise and corporate environments.

---

## 📌 Project Overview

The application provides a user interface for interacting with backend REST APIs related to **employee management**.  
It is designed with a **clean structure**, **modular components**, and **service-based architecture** to ensure maintainability and ease of extension.

At present:
- **Employee Service integration is implemented**
- **Bonus Service integration is partially implemented and work-in-progress**

---

## ✨ Implemented Features

- User login and basic authentication flow
- Employee listing screen
- View employee details
- API integration using Angular services
- Modular component-based UI
- Routing between screens
- Responsive layout for standard screen sizes

---

## 🚧 Work in Progress

- Bonus Service UI and integration
- Advanced validation and UI enhancements
- Improved error handling and user feedback
- UI refinements and optimizations

> These items are intentionally left in progress to reflect an active development state.

---

## 🧱 Technology Stack

| Layer | Technology |
|------|-----------|
| Frontend Framework | Angular |
| Language | TypeScript |
| UI | HTML5, CSS3 |
| API Communication | REST APIs |
| State Handling | Angular Services, RxJS |
| Build & Tooling | Angular CLI, npm |

---

## 🗂️ Project Structure (High Level)

src/
├── app/
│ ├── components/ # UI components
│ ├── services/ # REST API integration
│ ├── models/ # Data models
│ ├── auth/ # Authentication-related logic
│ ├── shared/ # Common utilities/components
│ └── app.module.ts
├── assets/
├── environments/
└── index.html

## 🔄 Backend Integration

This frontend currently integrates with:

- **Employee Service (Backend)** – Implemented
- **Bonus Service (Backend)** – Work-in-progress


---

## 🚀 How to Run the Application (Local Setup)

### Prerequisites

- Node.js (v14 or later)
- npm
- Angular CLI
- Backend services running and reachable

---

### Steps

```bash
# Clone the repository
git clone https://github.com/amolgadkari90/Rewardly-Employee-Service-Frontend-v2.git

# Navigate to the project directory
cd Rewardly-Employee-Service-Frontend-v2

# Install dependencies
npm install

# Run the application
ng serve


📐 Development Practices Followed

Angular style guidelines
Component-based design
Separation of UI and service logic
Readable and maintainable code
Clear folder organization
