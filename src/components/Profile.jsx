import { Calendar, MapPin, Link as LinkIcon } from 'lucide-react'
import Post from './Post'

const Profile = ({ user, posts }) => {
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-banner">
          <div className="banner-placeholder"></div>
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar-section">
            <img src={user.avatar} alt={user.name} className="profile-avatar" />
          </div>
          
          <div className="profile-details">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-username">@{user.username}</p>
            <p className="profile-bio">{user.bio}</p>
            
            <div className="profile-meta">
              <div className="meta-item">
                <Calendar size={16} />
                <span>Joined January 2024</span>
              </div>
              <div className="meta-item">
                <MapPin size={16} />
                <span>New York, NY</span>
              </div>
              <div className="meta-item">
                <LinkIcon size={16} />
                <a href="#" className="profile-link">example.com</a>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{user.following}</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat">
                <span className="stat-number">{user.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
            </div>
            
            <div className={`profile-type ${user.type}`}>
              {user.type === 'student' ? '🎓 Student' : '👨‍🏫 Teacher'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-tabs">
          <button className="tab active">Posts</button>
          <button className="tab">Replies</button>
          <button className="tab">Media</button>
          <button className="tab">Likes</button>
        </div>
        
        <div className="profile-posts">
          {posts.length > 0 ? (
            posts.map(post => (
              <Post 
                key={post.id} 
                post={post} 
                currentUser={user}
                onLike={() => {}} // Handle likes in profile context
              />
            ))
          ) : (
            <div className="no-posts">
              <h3>No posts yet</h3>
              <p>When you post something, it will show up here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
