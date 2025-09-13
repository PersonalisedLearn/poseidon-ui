import { useState } from 'react'
import Post from './Post'
import CreatePost from './CreatePost'

const Feed = ({ posts, currentUser, onLike, onAddPost }) => {
  const [showCreatePost, setShowCreatePost] = useState(false)

  return (
    <div className="feed">
      <div className="feed-header">
        <h2>Home</h2>
        <button 
          className="create-post-btn"
          onClick={() => setShowCreatePost(true)}
        >
          Create Post
        </button>
      </div>

      {showCreatePost && (
        <CreatePost 
          currentUser={currentUser}
          onAddPost={onAddPost}
          onClose={() => setShowCreatePost(false)}
        />
      )}

      <div className="posts-container">
        {posts.map(post => (
          <Post 
            key={post.id} 
            post={post} 
            currentUser={currentUser}
            onLike={onLike}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed
