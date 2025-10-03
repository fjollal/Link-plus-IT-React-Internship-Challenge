import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3 className="user-name">{user.name}</h3>
        <span className="user-id">#{user.id}</span>
      </div>
      <div className="user-card-body">
        <p className="user-email">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="user-company">
          <strong>Company:</strong> {user.company.name}
        </p>
        <p className="user-website">
          <strong>Website:</strong> {user.website}
        </p>
      </div>
      <div className="user-card-footer">
        <Link to={`/user/${user.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UserCard;

