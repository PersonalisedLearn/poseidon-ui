import { Search, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { getUserAvatar } from '../services/avatarService';
import { useState } from 'react';
import CreatePost from './CreatePost';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleAddPost = async (content) => {
    if (!user?.username) {
      console.error('No username available for the current user');
      return false;
    }

    console.log('Creating post with content:', content);
    
    try {
      const newPost = {
        content,
        userName: user.username,
        media: null
      };
      
      await axios.post(`${API_BASE_URL}/posts`, newPost);
      setShowCreatePost(false);
      window.location.reload();
      return true;
    } catch (err) {
      console.error('Error creating post:', {
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data
        } : 'No response from server',
        request: err.request,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          data: err.config?.data,
          headers: err.config?.headers
        }
      });
      
      // Return a more detailed error message
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with error status:', err.response.status);
        console.error('Error details:', err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', err.message);
      }
      
      return false;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search Poseidon..." 
            className="search-input"
          />
        </div>

 

        <button 
          className="create-post-btn"
          onClick={() => setShowCreatePost(true)}
        >
          Create Post
        </button>

        {showCreatePost && (
          <CreatePost 
            onAddPost={handleAddPost}
            onClose={() => setShowCreatePost(false)}
          />
        )}

        
        {user && (
          <div className="user-section">
            <div className="user-info">
              <img 
                src={getUserAvatar({
                  username: user.username,
                  name: user.name,
                  gender: user.gender,
                  avatar: user.avatar,
                  firstName: user.firstName
                })}
                alt={user.name || user.username}
                className="user-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  // Fallback to a default avatar if there's an error
                  e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4&radius=25';
                }}
              />
              <span className="username">{user.name || user.username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="logout-button"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
