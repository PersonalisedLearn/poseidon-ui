import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { userService } from '../services/api';
import './Settings.css';

const Settings = () => {
  const { user, logout } = useUser();
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  
  const handleDeleteAccount = async () => {
    setError('');
    
    if (deleteConfirm !== 'delete my account') {
      setError('Please type "delete my account" to confirm');
      return;
    }
    
    if (window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.')) {
      setIsDeleting(true);
      try {
        await userService.deleteUser(user.id);
        logout();
      } catch (error) {
        console.error('Failed to delete account:', error);
        setError(error.message || 'Failed to delete account. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      
      <div className="settings-section">
        <h3>Profile</h3>
        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">Username:</span>
            <span className="info-value">{user?.username}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email || 'Not provided'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Account Type:</span>
            <span className="info-value capitalize">{user?.type || 'Standard'}</span>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Permanent Deletion</h3>
        <div className="danger-zone">
          <p>This will permanently delete your account and all associated data. This action cannot be undone.</p>
          
          <div className="delete-confirm">
            <p>To confirm, please type <strong>delete my account</strong> below:</p>
            <input
              type="text"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Type 'delete my account' to confirm"
              className="delete-confirm-input"
              disabled={isDeleting}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          
          <button 
            onClick={handleDeleteAccount}
            className="delete-account-btn"
            disabled={isDeleting || deleteConfirm !== 'delete my account'}
            aria-label="Delete account"
          >
            {isDeleting ? 'Deleting...' : 'Permanently Delete My Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
