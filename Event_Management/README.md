# 🌍 Event Management System: Mastering Multi-Timezone Scheduling

## 🚀 Project Overview

This is a full-stack Event Management System built with the **MERN** stack (MongoDB, Express, React, Node.js). The primary design goal is to provide a clean, user-friendly interface for creating and viewing events across multiple global time zones, ensuring every user sees event times accurately converted to their local preference.

The system enforces strict scheduling rules and handles complex date/time conversions on the fly, making it an ideal solution for globally distributed teams or applications.

---

### 🌐 Live Demo


* **Live Frontend Application:** [Demo Link](https://ems-frontend-gamma-seven.vercel.app/)
* **Deployed Backend API:** 
    * **GET All Events:** `/api/events`
    * **GET Events by Profile:** `/api/events/profile/:profileId`
    * **GET All Profiles:** `/api/profiles`
    * **POST Create Event:** `/api/events`
    * **PUT/PATCH Update Event:** `/api/events/:id`
    * **DELETE Event:** `/api/events/:id`

---
## ✨ Key Features

The application includes the following features:

### Timezone & Profile Management
* **User-Centric Timezone View:** All events are dynamically displayed according to the currently selected user's timezone.
* **Profile Creation:** The administrator (or user) can create multiple user profiles by entering a name.


### Event Creation & Scheduling
* **Multi-Profile Assignment:** Events can be created and assigned to one or more user profiles simultaneously.
* **Detailed Scheduling:** Events include fields for:
    * Profiles (one or more users)
    * Timezone (the native timezone of the event)
    * Start Date + Time 
    * End Date + Time 
* **Validation Rules:**
    * The end date/time cannot be in the past relative to the selected start date/time (ensuring events do not overlap backwards).
    * Start and end times must respect the selected timezone of the user(s) during display and updating.

### Event Viewing & Maintenance
* **Comprehensive Event View:** Users can view all events assigned to them in the right-hand panel.
* **Actionable Event Cards:** Each event card includes **Edit** and **View Logs** buttons for quick access to modification and auditing.
* **Auditing Timestamps:** Each event stores `createdAt` and `updatedAt` timestamps, displayed relative to the viewing user's timezone.
* **Event Updating:** Users are granted the functionality to update all events assigned to them, with updates reflecting correctly across all associated profiles' timezones.

---

## 💻 Technical Stack

The project utilizes a modular MERN architecture:

### Frontend (React)
* **Framework:** **React**
* **State Management:** **Zustand** for lightweight and efficient global state management (Profiles, Events).
* **Styling:** Modular CSS for clean, responsive design.
* **Date/Time Handling:** `moment-timezone` for client-side display conversion.

### Backend (Node.js/Express)
* **Server:** **Node.js** with **Express**
* **Database:** **MongoDB** (via Mongoose ODM)
* **Core Logic:** Enforces event validation rules and handles the conversion of all event times to **UTC** (Universal Time Coordinated) before database storage, ensuring a single source of truth for time data.

---

## ⚙️ Installation and Setup

### Prerequisites

* Node.js (v14+)
* MongoDB Instance (Local or cloud-hosted via MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/susovan777/Project_Backend.git
cd Event_Management
```
### 2. Backend Setup (`./backend`)
* #### 1. Navigate to the backend directory:
    ```bash
    cd backend
* #### 2. Install dependencies:
    ```bash
    npm install
* #### 3. Create a .env file in the ./backend folder and add your MongoDB connection string:
    ```
    MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
    PORT=5000
* #### 4. Start the server:
    ```bash
    npm run dev

The API should now be running on http://localhost:5000.

### 3. Frontend Setup (`./frontend`)
* #### Navigate to the frontend directory:
    ```Bash
    cd ../frontend
* #### 4. Install dependencies (including react-icons for the UI):
    ```Bash
    npm install
    npm install react-icons
* #### 5. Start the React development server:
    ```Bash
    npm run dev
The application will open in your browser at http://localhost:5173.

---
## 💡 Technical Nuances: Timezone Logic

The application's robustness lies in its handling of time across the stack:

1. **Storage Standard**: When an event is created, the backend uses the provided native timezone to calculate the equivalent time in UTC and stores both the startDateTime and endDateTime in this universal format.

2. **Display Standard**: The frontend fetches the UTC times. It then uses the currentViewTimezone (selected by the user in the Profile Picker) and the moment-timezone library to dynamically convert the UTC time back into the user's local time for display.

3. **Auditing**: createdAt and updatedAt timestamps are also stored in UTC and converted dynamically, ensuring the user sees when an event was last modified in their own local time.