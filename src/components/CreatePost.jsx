import { useState } from 'react';
import { X, Image, Video, Smile } from 'lucide-react';

const CreatePost = ({ currentUser, onAddPost, onClose }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const success = await onAddPost(content);
      if (success) {
        setContent('');
        onClose();
      } else {
        setError('Failed to create post. Please try again.');
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError('An error occurred while creating the post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-modal">
      <div className="create-post-content">
        <div className="create-post-header">
          <h3>Create Post</h3>
          <button 
            type="button"
            onClick={onClose} 
            className="close-btn"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="post-input-area">
            <img 
              src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'U')}&background=random`} 
              alt={currentUser?.name || 'User'} 
              className="create-post-avatar" 
            />
            <div className="post-textarea-container">
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (error) setError('');
                }}
                placeholder="What's on your mind?"
                className="post-textarea"
                rows="4"
                disabled={isSubmitting}
              />
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>

          <div className="create-post-actions">
            <div className="media-options">
              <button 
                type="button" 
                className="media-option"
                disabled={isSubmitting}
                title="Coming soon"
              >
                <Image size={20} />
              </button>
              
              <button 
                type="button" 
                className="media-option"
                disabled={isSubmitting}
                title="Coming soon"
              >
                <Video size={20} />
              </button>
              
              <button 
                type="button" 
                className="media-option"
                disabled={isSubmitting}
                title="Coming soon"
              >
                <Smile size={20} />
              </button>
            </div>

            <div className="submit-actions">
              <button 
                type="button" 
                onClick={onClose} 
                className="cancel-btn"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`post-submit-btn ${(!content.trim() || isSubmitting) ? 'disabled' : ''}`}
                disabled={!content.trim() || isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
