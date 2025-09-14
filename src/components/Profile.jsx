import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Link as LinkIcon, Edit } from 'lucide-react';
import axios from 'axios';
import Post from './Post';
import { API_BASE_URL } from '../config';
import { useUser } from '../context/UserContext';
import { getUserAvatar } from '../services/avatarService';

const Profile = () => {
  const { user: currentUser } = useUser();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  
  // Use the avatar service for avatar generation

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        if (!currentUser) {
          navigate('/login');
          return;
        }
        
        // Fetch user data using the username
        const userResponse = await axios.get(`${API_BASE_URL}/users/username/${currentUser.username}`);
        setUser(userResponse.data);
        
        // Fetch all posts and filter by current user
        console.log('Fetching posts for user:', currentUser);
        const postsResponse = await axios.get(`${API_BASE_URL}/posts`);
        console.log('All posts:', postsResponse.data);
        
        // Filter posts by the current user's username or userId
        const userPosts = postsResponse.data.filter(post => {
          const matchesUsername = post.user?.username === currentUser.username;
          const matchesUserId = post.userId === currentUser.id || post.user?.id === currentUser.id;
          console.log(`Post ${post.id}:`, { 
            postUsername: post.user?.username, 
            currentUsername: currentUser.username,
            matchesUsername,
            matchesUserId
          });
          return matchesUsername || matchesUserId;
        });
        
        console.log('Filtered user posts:', userPosts);
        setPosts(userPosts);
        
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500">
        <div className="text-center p-4">
          <p className="text-xl font-bold mb-2">Error loading profile</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
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
              src={getUserAvatar({
                username: user.username,
                name: `${user.firstName} ${user.lastName || ''}`,
                gender: user.gender,
                avatar: user.avatar,
                firstName: user.firstName,
                lastName: user.lastName
              })} 
              alt={`${user.firstName} ${user.lastName || ''}`} 
              className="profile-avatar" 
              onError={(e) => {
                e.target.onerror = null;
                // Fallback to a default avatar if there's an error
                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.firstName || 'user')}&backgroundColor=b6e3f4&radius=25`;
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
