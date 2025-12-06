# Event Management System

A full-stack MERN application for managing events across multiple users and timezones. Create, view, and update events with automatic timezone conversion and comprehensive change tracking.

![Event Management System](https://img.shields.io/badge/Status-Complete-success)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![Timezone Support](https://img.shields.io/badge/Timezone-Enabled-green)

**Live Frontend Application:** [Demo Link](https://ems-frontend-gamma-seven.vercel.app/)

## 🌟 Features

### Core Features

- **Multi-Profile Management**: Create and manage multiple user profiles
- **Event Creation**: Create events and assign them to one or multiple profiles
- **Timezone Support**: Full timezone conversion using Day.js
  - Select timezone when creating/editing events
  - View events in any timezone
  - Automatic conversion across all timezones
- **Event Management**:
  - View all events or filter by profile
  - Edit existing events
  - Update event details with validation
- **Real-time Updates**: Event list updates immediately after create/edit operations

### Bonus Features

- **Update History Tracking**: Complete audit log of all event changes
  - Tracks what changed (title, profiles, dates)
  - Shows before/after values
  - Timestamps in user's selected timezone
  - Visual timeline display

### Validation

- End date/time must be after start date/time
- Required field validation
- Timezone-aware date validation
- Profile assignment validation

## 🛠️ Tech Stack

### Frontend

- **React** (18.2.0) - UI library
- **Zustand** (4.4.7) - State management
- **Day.js** (1.11.10) - Timezone handling
- **Axios** (1.6.2) - HTTP client
- **CSS Modules** - Scoped styling
- **Vite** - Build tool

### Backend

- **Node.js** - Runtime environment
- **Express.js** (4.18.2) - Web framework
- **MongoDB** - Database
- **Mongoose** (8.0.3) - ODM
- **Day.js** (1.11.10) - Server-side timezone handling
- **CORS** (2.8.5) - Cross-origin resource sharing
- **ES Modules** - Modern JavaScript syntax

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v5 or higher)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/susovan777/Project_MERN/tree/main/Event_Management
cd Event_Management
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/event-management
# PORT=5000
# NODE_ENV=development

# Start MongoDB (if not already running)
mongod

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
event-management-system/
├── backend/
│   ├── models/
│   │   ├── Profile.js           # Profile schema
│   │   └── Event.js              # Event schema with update history
│   ├── controllers/
│   │   ├── profileController.js  # Profile business logic
│   │   └── eventController.js    # Event business logic
│   ├── routes/
│   │   ├── profiles.js           # Profile routes
│   │   └── events.js             # Event routes
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── server.js                 # Server entry point
│   ├── app.js                    # Express app configuration
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProfileSelector/
    │   │   │   ├── ProfileSelector.jsx
    │   │   │   └── ProfileSelector.module.css
    │   │   ├── EventForm/
    │   │   │   ├── EventForm.jsx
    │   │   │   └── EventForm.module.css
    │   │   ├── EventList/
    │   │   │   ├── EventList.jsx
    │   │   │   └── EventList.module.css
    │   │   ├── EventCard/
    │   │   │   ├── EventCard.jsx
    │   │   │   └── EventCard.module.css
    │   │   ├── EditEventModal/
    │   │   │   ├── EditEventModal.jsx
    │   │   │   └── EditEventModal.module.css
    │   │   └── UpdateHistoryModal/
    │   │       ├── UpdateHistoryModal.jsx
    │   │       └── UpdateHistoryModal.module.css
    │   ├── services/
    │   │   ├── api.js                # Axios configuration
    │   │   ├── profileApi.js         # Profile API calls
    │   │   └── eventApi.js           # Event API calls
    │   ├── store/
    │   │   └── eventStore.js         # Zustand store
    │   ├── utils/
    │   │   └── timezones.js          # Timezone utilities
    │   ├── App.jsx                   # Main app component
    │   ├── App.module.css
    │   ├── index.css                 # Global styles
    │   └── main.jsx                  # React entry point
    └── package.json
```

## 🎯 Usage Guide

### Creating Profiles

1. Click the profile dropdown (top-right corner)
2. Click "Add Profile"
3. Enter profile name and select timezone
4. Click "Add"

### Creating Events

1. Select profiles (one or multiple)
2. Choose event timezone
3. Pick start date and time
4. Pick end date and time
5. Click "Create Event"

### Viewing Events

- **View All Events**: Select "View All Events" from profile dropdown
- **Filter by Profile**: Select a specific profile from dropdown

### Editing Events

1. Click "Edit" button on any event card
2. Modify desired fields
3. Click "Update Event"

### Viewing Update History

1. Click "View Logs" button on any event card
2. See complete change history with timestamps
3. All dates displayed in your selected timezone

### Changing Timezone View

1. Use "View in Timezone" dropdown in Events section
2. All event dates/times automatically convert

## 🔧 API Endpoints

### Profiles

```
GET    /api/profiles           # Get all profiles
POST   /api/profiles           # Create new profile
GET    /api/profiles/:id       # Get single profile
PUT    /api/profiles/:id       # Update profile
```

### Events

```
GET    /api/events                      # Get all events
POST   /api/events                      # Create new event
GET    /api/events/profile/:profileId   # Get events by profile
GET    /api/events/:id                  # Get single event
PUT    /api/events/:id                  # Update event
DELETE /api/events/:id                  # Delete event
```

### Query Parameters

- `timezone` - Timezone for date conversion (e.g., `?timezone=America/New_York`)

## 🕐 Timezone Handling

### Storage Strategy

- All dates stored in **UTC** in MongoDB
- Frontend sends dates with timezone context
- Backend converts to UTC before storage
- Display dates converted to user's selected timezone

### Supported Timezones

- Eastern Time (ET)
- Central Time (CT)
- Mountain Time (MT)
- Pacific Time (PT)
- India (IST)
- London (GMT/BST)
- Paris/Berlin (CET)
- Dubai (GST)
- China (CST)
- Japan (JST)
- Sydney (AEDT)
- New Zealand (NZDT)
- And more...

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modal Dialogs**: Smooth animations and backdrop
- **Loading States**: Visual feedback during operations
- **Empty States**: Helpful messages when no data
- **Form Validation**: Real-time validation with error messages
- **Keyboard Navigation**: Accessible keyboard controls
- **Visual Timeline**: Update history displayed as timeline

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if MongoDB is running
mongosh

# If not, start MongoDB
mongod

# Check if port 5000 is available
lsof -i :5000

# Kill process if needed
kill -9 <PID>
```

### Frontend won't start

```bash
# Check if port 5173 is available
lsof -i :5173

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Events not displaying

- Ensure backend is running
- Check browser console for errors
- Verify MongoDB connection
- Check that profiles exist before creating events

### Timezone conversion issues

- Verify Day.js plugins are loaded
- Check that timezone is being sent in API calls
- Ensure backend has Day.js with timezone plugin

## 🔐 Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/event-management
PORT=5000
NODE_ENV=development
```

### Frontend

No environment variables required for local development.

For production, update API base URL in `src/config/endpoint.js`:

```javascript
const config = {
  endpoint: "http://localhost:5000" || <API_BASE_URL>,
};
```

## 📝 Data Models

### Profile Schema

```javascript
{
  name: String (required, unique),
  timezone: String (required, default: 'Asia/Kolkata'),
  createdAt: Date,
  updatedAt: Date
}
```

### Event Schema

```javascript
{
  title: String (required, max: 100),
  profiles: [ObjectId] (required, ref: 'Profile'),
  startDate: Date (required, stored in UTC),
  endDate: Date (required, stored in UTC),
  timezone: String (required),
  updateHistory: [{
    field: String,
    oldValue: Mixed,
    newValue: Mixed,
    updatedAt: Date,
    timezone: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Backend Deployment (Example: Render/Railway)

1. Push code to GitHub
2. Create new web service
3. Set environment variables
4. Deploy from repository

### Frontend Deployment (Example: Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update API URL in environment variables

### Database (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in backend

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as part of MERN Stack Developer assignment for SkaiLama.

## 🙏 Acknowledgments

- Day.js for excellent timezone handling
- Zustand for simple state management
- MongoDB for flexible data storage
- React community for best practices

## 📞 Support

For issues or questions:

- Create an issue in the repository
- Check existing issues for solutions
- Review the troubleshooting section

---

**Built with ❤️ using MERN Stack**

_Last Updated: December 2024_
