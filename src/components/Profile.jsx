import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Link as LinkIcon, Edit } from 'lucide-react';
import axios from 'axios';
import Post from './Post';

const API_BASE_URL = 'http://localhost:8080/api';

const Profile = () => {
  const { username } = useParams();
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  
  // Generate a consistent avatar based on username
  const getAvatarUrl = (username) => {
    const seed = username || 'default';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // Fetch user data
        const userResponse = await axios.get(`${API_BASE_URL}/users/username/${username || 'demo'}`);
        setUser(userResponse.data);
        
        // Fetch user's posts
        const postsResponse = await axios.get(`${API_BASE_URL}/posts/user/${userResponse.data.id}`);
        setPosts(postsResponse.data || []);
        
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div className="not-found">User not found</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-banner">
          <div className="banner-placeholder"></div>
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar-section">
            <img 
              src={user.avatar || getAvatarUrl(user.username || user.firstName)} 
              alt={`${user.firstName} ${user.lastName || ''}`} 
              className="profile-avatar" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getAvatarUrl(user.username || user.firstName);
              }}
            />
          </div>
          
          <div className="profile-details">
            <div className="profile-name-row">
              <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
              {user.username && <p className="profile-username">@{user.username}</p>}
            </div>
            
            {user.bio && <p className="profile-bio">{user.bio}</p>}
            
            <div className="profile-meta">
              {user.dateOfBirth && (
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Born {formatDate(user.dateOfBirth)}</span>
                </div>
              )}
              
              {user.gender && (
                <div className="meta-item">
                  <span>•</span>
                  <span>{user.gender.charAt(0) + user.gender.slice(1).toLowerCase()}</span>
                </div>
              )}
              
              {user.createdAt && (
                <div className="meta-item">
                  <span>•</span>
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              )}
            </div>
            
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{user.followingCount || 0}</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat">
                <span className="stat-number">{user.followersCount || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`tab ${activeTab === 'replies' ? 'active' : ''}`}
            onClick={() => setActiveTab('replies')}
          >
            Replies
          </button>
          <button 
            className={`tab ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            Media
          </button>
          <button 
            className={`tab ${activeTab === 'likes' ? 'active' : ''}`}
            onClick={() => setActiveTab('likes')}
          >
            Likes
          </button>
        </div>
        
        <div className="profile-posts">
          {activeTab === 'posts' && (
            posts.length > 0 ? (
              posts.map(post => (
                <Post 
                  key={post.id} 
                  post={post} 
                  currentUser={currentUser}
                  onLike={() => {}} // Handle likes in profile context
                />
              ))
            ) : (
              <div className="no-posts">
                <h3>No posts yet</h3>
                <p>When you post something, it will show up here.</p>
              </div>
            )
          )}
          
          {activeTab === 'replies' && (
            <div className="tab-content">
              <p>Replies will appear here</p>
            </div>
          )}
          
          {activeTab === 'media' && (
            <div className="tab-content">
              <p>Media will appear here</p>
            </div>
          )}
          
          {activeTab === 'likes' && (
            <div className="tab-content">
              <p>Liked posts will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
