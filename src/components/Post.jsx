import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';

const Post = ({ post, currentUser, onLike }) => {
  const handleLike = () => {
    onLike(post.id);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Generate avatar URL based on username or name
  const getAvatarUrl = (username, name) => {
    const seed = username || name || 'anonymous';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  };

  // Create a default user object if user data is not available
  const user = post.user || {
    name: 'Anonymous',
    username: 'anonymous',
    avatar: getAvatarUrl('anonymous', 'Anonymous')
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          <img 
            src={user.avatar || getAvatarUrl(user.username, user.name)} 
            alt={user.name} 
            className="post-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getAvatarUrl(user.username, user.name);
            }}
          />
          <div className="post-user-info">
            <div className="post-user-name">
              {user.name || 'Anonymous'}
              {user.username && (
                <span className="post-username">@{user.username}</span>
              )}
              <span className="post-timestamp">· {formatTimestamp(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <button className="post-options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {/* Media support can be added later when the API supports it */}
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${post.likedByCurrentUser ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={20} fill={post.likedByCurrentUser ? 'currentColor' : 'none'} />
          <span>{post.likesCount || 0}</span>
        </button>
        
        <button className="action-btn comment-btn">
          <MessageCircle size={20} />
          <span>{post.commentsCount || 0}</span>
        </button>
        
        <button className="action-btn share-btn">
          <Share size={20} />
        </button>
      </div>
    </div>
  );
};

export default Post;
