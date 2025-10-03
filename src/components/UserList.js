import React, { useState, useRef, useEffect } from 'react';
import { useUsers } from '../context/UserContext';
import UserCard from './UserCard';
import AddUserForm from './AddUserForm';
import './UserList.css';

const UserList = () => {
  const { users, loading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddForm, setShowAddForm] = useState(false);
  const searchInputRef = useRef(null);

 
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);


  const filteredAndSortedUsers = users
    .filter(user => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company.name.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'company':
          aValue = a.company.name.toLowerCase();
          bValue = b.company.name.toLowerCase();
          break;
        case 'id':
          aValue = a.id;
          bValue = b.id;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderToggle = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <div className="error-message">
          <h2>Error loading users</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>Users Directory</h1>
        <button 
          className="add-user-btn"
          onClick={() => setShowAddForm(true)}
        >
          + Add New User
        </button>
      </div>

      <div className="search-and-sort">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={clearSearch}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="search-results-count">
              {filteredAndSortedUsers.length} user{filteredAndSortedUsers.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        <div className="sort-container">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
            <option value="id">ID</option>
          </select>
          <button
            className="sort-order-btn"
            onClick={handleSortOrderToggle}
            title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="users-grid">
        {filteredAndSortedUsers.length === 0 ? (
          <div className="no-results">
            <h3>No users found</h3>
            <p>
              {searchTerm 
                ? `No users match "${searchTerm}". Try a different search term.`
                : 'No users available.'
              }
            </p>
            {searchTerm && (
              <button onClick={clearSearch} className="clear-search-link">
                Clear search
              </button>
            )}
          </div>
        ) : (
          filteredAndSortedUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </div>

      {showAddForm && (
        <AddUserForm onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
};

export default UserList;

