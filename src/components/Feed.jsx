import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import Post from './Post';
import CreatePost from './CreatePost';
import { API_BASE_URL } from '../config';

const Feed = () => {
  const { user: currentUser } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Include the current user's username in the request if logged in
      const params = currentUser?.username ? { username: currentUser.username } : {};
      const response = await axios.get(`${API_BASE_URL}/posts`, { params });
      
      // Map the response data to the expected format
      const updatedPosts = response.data?.map(post => ({
        ...post,
        // The server will now handle setting likedByCurrentUser based on the username
        likedByCurrentUser: post.liked || false
      })) || [];
      
      setPosts(updatedPosts);
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
    if (!currentUser?.username) {
      console.error('No username available for the current user');
      return false;
    }

    try {
      const newPost = {
        content,
        userName: currentUser.username,
        // Include media if needed
        media: null
      };
      
      await axios.post(`${API_BASE_URL}/posts`, newPost);
      await fetchPosts(); // Refresh the feed
      return true;
    } catch (err) {
      console.error('Error creating post:', err);
      return false;
    }
  };

  // Handle post like toggle
  const handleLike = async (postId) => {
    if (!currentUser?.username) {
      // If no user is logged in, show a login prompt
      console.log('Please log in to like posts');
      return false;
    }
    
    try {
      // Optimistic UI update
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const isLiked = !post.liked;
            return {
              ...post,
              liked: isLiked,
              likes: isLiked ? (post.likes || 0) + 1 : Math.max(0, (post.likes || 1) - 1)
            };
          }
          return post;
        })
      );
      
      // Send the like request
      const response = await axios.post(
        `${API_BASE_URL}/posts/${postId}/like?username=${encodeURIComponent(currentUser.username)}`
      );
      
      // Update the specific post with the response data
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId ? { ...post, ...response.data } : post
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error toggling like:', err);
      // Revert optimistic update on error
      await fetchPosts();
      return false;
    }
  };

  // Initial data fetch and refetch when current user changes
  useEffect(() => {
    fetchPosts();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
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
