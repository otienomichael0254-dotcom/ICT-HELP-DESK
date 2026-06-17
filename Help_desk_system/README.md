# MNTRH Help Desk System

A browser-only help desk system built with vanilla JavaScript and Firebase.

## Features

- **User Authentication** - Secure login and registration with Firebase Auth
- **Ticket Management** - Create, view, and manage support tickets
- **Priority System** - Tickets support low, medium, high, and urgent priority levels
- **Status Tracking** - Track ticket status (open, pending, resolved)
- **User Management** - Admin users can manage system users
- **Dashboard** - Overview of ticket statistics
- **Real-time Updates** - Firestore integration for real-time data sync

## Project Structure

```
Help_desk_system/
├── index.html              # Main HTML file
├── package.json            # Project metadata and dependencies
├── README.md              # This file
├── css/
│   └── styles.css         # Application styling
├── js/
│   ├── config.js          # Firebase configuration
│   ├── app.js             # Main application logic
│   ├── auth.js            # Authentication functions
│   ├── tickets.js         # Ticket management
│   ├── users.js           # User management
│   └── ui.js              # UI navigation
└── assets/                # Images and media files
```

## Setup Instructions

### Prerequisites
- A Firebase project (create one at [firebase.google.com](https://firebase.google.com))
- A modern web browser
- Python 3 (for local development server)

### 1. Firebase Configuration

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable Firebase Authentication (Email/Password)
3. Create a Firestore database in test mode
4. Get your Firebase config credentials

### 2. Update Configuration

Edit `js/config.js` and replace the placeholder credentials:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 3. Set Up Firestore Database Rules

Go to Firestore Database > Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /tickets/{ticketId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Start Development Server

From the project directory:

```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx http-server
```

Then open http://localhost:8000 in your browser.

## Usage

### Creating an Account
1. Click "Sign up" on the login page
2. Enter your name, email, and password
3. Click "Sign Up"

### Creating a Ticket
1. Log in to your account
2. Click "Tickets" in the navigation menu
3. Click "New Ticket"
4. Fill in the title, description, and priority
5. Click "Create Ticket"

### Managing Tickets
- **View Dashboard** - See ticket statistics
- **View Tickets** - Browse all your tickets
- **Update Status** - Click "Update" on any ticket to change its status
- **Admin Panel** - Admins can manage users and all tickets

## Database Schema

### Users Collection
```javascript
{
  uid: string,
  name: string,
  email: string,
  role: "user" | "admin" | "support",
  createdAt: timestamp,
  avatar: string,
  status: "active" | "inactive"
}
```

### Tickets Collection
```javascript
{
  title: string,
  description: string,
  priority: "low" | "medium" | "high" | "urgent",
  status: "open" | "pending" | "resolved",
  userId: string,
  userName: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  assignedTo: string (optional),
  comments: array,
  attachments: array
}
```

## Features Roadmap

- [ ] Email notifications
- [ ] File attachments
- [ ] Comments and replies
- [ ] Ticket categories
- [ ] SLA tracking
- [ ] Knowledge base
- [ ] Live chat support
- [ ] Mobile responsive design (enhanced)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Security Notes

- Never commit your Firebase credentials
- Use environment variables for production
- Enable reCAPTCHA for production deployments
- Regularly review and update Firestore security rules

## Troubleshooting

### Login issues
- Check Firebase credentials in `config.js`
- Verify Firebase Authentication is enabled
- Check browser console for error messages

### Tickets not loading
- Ensure Firestore database is created
- Check Firestore security rules
- Verify user has proper permissions

### CORS issues
- Use the provided local server
- For production, configure CORS in Firebase

## Support

For issues and questions:
1. Check the browser console for error messages
2. Review Firebase console logs
3. Verify all configuration settings

## License

MIT License - feel free to use this project for your own help desk system.
