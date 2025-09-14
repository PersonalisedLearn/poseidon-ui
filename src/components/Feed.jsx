import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import CreatePost from './CreatePost';

const API_BASE_URL = 'http://localhost:8080/api';

const Feed = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/posts`);
      setPosts(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle post creation
  const handleAddPost = async (content) => {
    try {
      const newPost = {
        content,
        userId: currentUser?.id || 'anonymous',
      };
      
      await axios.post(`${API_BASE_URL}/posts`, newPost);
      await fetchPosts(); // Refresh the feed
      return true;
    } catch (err) {
      console.error('Error creating post:', err);
      return false;
    }
  };

  // Handle post like
  const handleLike = async (postId) => {
    try {
      await axios.post(`${API_BASE_URL}/posts/${postId}/like`);
      await fetchPosts(); // Refresh the feed
      return true;
    } catch (err) {
      console.error('Error liking post:', err);
      return false;
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
          onAddPost={handleAddPost}
          onClose={() => setShowCreatePost(false)}
        />
      )}

      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="no-posts">No posts yet. Be the first to post!</div>
        ) : (
          posts.map(post => (
            <Post 
              key={post.id} 
              post={post} 
              currentUser={currentUser}
              onLike={() => handleLike(post.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
