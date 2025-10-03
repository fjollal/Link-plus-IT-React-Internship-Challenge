
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import useUserData from './hooks/useUserData';
import './App.css';


const AppContent = () => {
  useUserData(); 
  
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/user/:id" element={<UserDetails />} />
    </Routes>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
