import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Post = ({ post, currentUser, onLike }) => {
  console.log('Post component rendered with post:', post);
  
  if (!post) {
    console.error('Post is undefined or null');
    return null; // or a loading/error state
  }
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

  // Generate avatar URL with cat or dog based on username hash
  const getAvatarUrl = (username, name) => {
    const seed = username || name || 'anonymous';
    const baseUrl = 'https://api.dicebear.com/7.x';
    
    try {
      // Simple hash to determine if we use cat or dog
      const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const isCat = hash % 2 === 0;
      
      const params = new URLSearchParams({
        seed: seed,
        size: 100,
        radius: 25,
        flip: 'true',
        rotate: '0,360',
        // Use different animal types from miniavs
        animal: isCat ? 'cat' : 'dog',
        animalColor: isCat ? '0a5b83' : 'ad3f32',
        backgroundType: 'gradientLinear',
        backgroundColor: isCat ? 'b6e3f4,c0aede' : 'ffd5dc,ffdfbf'
      });
      
      return `${baseUrl}/miniavs/svg?${params.toString()}`;
    } catch (error) {
      console.error('Error generating avatar URL:', error);
      return `${baseUrl}/bottts/svg?seed=error&style=circle&backgroundColor=b6e3f4`;
    }
  };

  // Safely handle user data with defaults
  const user = {
    name: post.user?.name || 'Anonymous',
    username: post.user?.username || 'anonymous',
    gender: (post.user?.gender && ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'].includes(post.user.gender)) 
      ? post.user.gender 
      : 'OTHER',
    avatar: post.user?.avatar
  };
  
  console.log('Processed user data:', user);
  
  // Generate avatar URL if not provided
  if (!user.avatar) {
    user.avatar = getAvatarUrl(user.username, user.name, user.gender);
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          <img 
            src={user.avatar}
            alt={user.name}
            className="post-avatar"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              // Try with a simpler avatar if the current one fails
              const fallbackUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(user.username || 'user')}&radius=50&backgroundColor=b6e3f4`;
              e.target.src = fallbackUrl;
            }}
            loading="lazy"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              backgroundColor: '#f0f0f0'
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
