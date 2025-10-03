# LinkPlus - User Management App

A React application demonstrating components, state management, routing, forms, and data fetching. Built with modern React hooks and best practices.

## Features

### Core Features
- **List Users**: Fetch and display users from JSONPlaceholder API
- **Search**: Client-side search by name, email, or company
- **User Details**: Navigate to detailed user information page
- **Add User**: Form with validation to add new users locally
- **Sorting**: Sort users by name, email, company, or ID

### Technical Features
- **React Hooks**: Uses useState, useEffect, useContext, and useRef
- **Context API**: Global state management for users
- **React Router**: Client-side routing between pages
- **Form Validation**: Required field validation with error messages
- **Responsive Design**: Mobile-friendly interface
- **Loading States**: Proper loading and error handling

## Tech Stack

- **React 19.2.0** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with responsive design
- **Context API** - State management

## Project Structure

```
src/
├── components/
│   ├── UserList.js          # Main user listing component
│   ├── UserList.css         # User list styles
│   ├── UserCard.js          # Individual user card component
│   ├── UserCard.css         # User card styles
│   ├── UserDetails.js       # User details page component
│   ├── UserDetails.css      # User details styles
│   ├── AddUserForm.js       # Add user form component
│   └── AddUserForm.css      # Add user form styles
├── context/
│   └── UserContext.js       # Global state management
├── hooks/
│   └── useUserData.js       # Custom hook for data fetching
├── App.js                   # Main app component with routing
├── App.css                  # Global styles
└── index.js                 # App entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

## Usage

### Viewing Users
- The main page displays all users in a responsive grid
- Each user card shows name, email, company, and website
- Click "View Details" to see full user information

### Searching Users
- Use the search bar to filter users by name, email, or company
- Search is case-insensitive and updates in real-time
- Clear search to see all users again

### Sorting Users
- Use the dropdown to select sort criteria (name, email, company, ID)
- Click the sort button to toggle between ascending/descending order

### Adding Users
- Click "Add New User" button to open the form
- Fill in required fields (name and email)
- Optional fields include username, phone, website, company, and address
- Form includes validation with error messages
- New users are added to the top of the list

### User Details
- Click any user card to view detailed information
- Details page shows contact info, address, and company details
- Use the back button to return to the user list

## API Integration

The app fetches user data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users), a fake REST API for testing and prototyping.

## State Management

The app uses React Context API for global state management:
- User data storage and updates
- Loading and error states
- Actions for adding, updating, and deleting users

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Future Enhancements

- Redux integration for more complex state management
- Update and delete user functionality
- Pagination for large user lists
- User authentication
- Data persistence with local storage
- Unit and integration tests# Linkplus-IT-React-Internship-Challenge
# Linkplus-IT-React-Internship-Challenge
# Link-plus-IT-React-Internship-Challenge
# Link-plus-IT-React-Internship-Challenge
