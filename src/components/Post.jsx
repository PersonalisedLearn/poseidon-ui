import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react'

const Post = ({ post, currentUser, onLike }) => {
  const handleLike = () => {
    onLike(post.id)
  }

  const formatTimestamp = (timestamp) => {
    return timestamp
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-user">
          <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
          <div className="post-user-info">
            <div className="post-user-name">
              {post.user.name}
              <span className="post-username">@{post.user.username}</span>
              <span className="post-timestamp">· {formatTimestamp(post.timestamp)}</span>
            </div>
            <div className={`user-type-badge ${post.user.type}`}>
              {post.user.type === 'student' ? '🎓 Student' : '👨‍🏫 Teacher'}
            </div>
          </div>
        </div>
        <button className="post-options">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.media && (
          <div className="post-media">
            {post.media.type === 'image' && (
              <img src={post.media.url} alt="Post media" className="post-image" />
            )}
            {post.media.type === 'video' && (
              <video controls className="post-video">
                <source src={post.media.url} type="video/mp4" />
              </video>
            )}
          </div>
        )}
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn like-btn ${post.isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={20} fill={post.isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes}</span>
        </button>
        
        <button className="action-btn comment-btn">
          <MessageCircle size={20} />
          <span>{post.comments}</span>
        </button>
        
        <button className="action-btn share-btn">
          <Share size={20} />
        </button>
      </div>
    </div>
  )
}

export default Post
