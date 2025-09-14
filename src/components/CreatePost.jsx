import { useState, useRef, useEffect } from 'react';
import { X, Image, Video, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

const CreatePost = ({ currentUser, onAddPost, onClose }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const textareaRef = useRef(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emojiData) => {
    const { selectionStart, selectionEnd } = textareaRef.current;
    const newText = 
      content.substring(0, selectionStart) + 
      emojiData.emoji + 
      content.substring(selectionEnd);
    
    setContent(newText);
    
    // Move cursor after the inserted emoji
    setTimeout(() => {
      const newCursorPos = selectionStart + emojiData.emoji.length;
      textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      textareaRef.current.focus();
    }, 0);
  };

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
                ref={textareaRef}
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
              
              <div className="emoji-picker-container" ref={emojiPickerRef}>
                <button 
                  type="button" 
                  className={`media-option ${showEmojiPicker ? 'active' : ''}`}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  disabled={isSubmitting}
                  title="Add emoji"
                >
                  <Smile size={20} />
                </button>
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <EmojiPicker 
                      onEmojiClick={handleEmojiClick}
                      autoFocusSearch={false}
                      width={320}
                      height={400}
                      skinTonePosition="search"
                      searchPlaceHolder="Search emojis..."
                      previewConfig={{
                        showPreview: false
                      }}
                      theme="dark"
                    />
                  </div>
                )}
              </div>
            </div>
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
        </form>
      </div>
    </div>
  );
};

const styles = `
  .emoji-picker-container {
    position: relative;
    display: inline-block;
  }
  
  .emoji-picker {
    position: fixed;
    bottom: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    border: 1px solid #2f3336;
    max-height: 90vh;
    max-width: 90vw;
  }
  
  .emoji-picker .EmojiPickerReact {
    --epr-bg-color: #000000;
    --epr-category-label-bg-color: #000000;
    --epr-text-color: #ffffff;
    --epr-hover-bg-color: #1d1f23;
    --epr-active-skin-tone-bg-color: #1d9bf0;
    --epr-search-input-bg-color: #202327;
    --epr-search-input-text-color: #ffffff;
    --epr-search-input-placeholder-color: #6e767d;
    --epr-search-border-color: #2f3336;
    --epr-category-icon-active-color: #1d9bf0;
    --epr-picker-border-color: #2f3336;
    --epr-horizontal-padding: 12px;
    --epr-category-navigation-button-size: 24px;
  }
  
  .emoji-picker .EmojiPickerReact .epr-emoji-category-label {
    background: #000000;
    color: #ffffff;
    font-weight: 600;
    padding: 12px 16px 4px;
  }
  
  .emoji-picker .EmojiPickerReact .epr-emoji-category-content {
    margin: 0 8px;
  }
  
  .emoji-picker .EmojiPickerReact .epr-emoji {
    transition: transform 0.1s ease;
  }
  
  .emoji-picker .EmojiPickerReact .epr-emoji:hover {
    transform: scale(1.2);
    background-color: #1d1f23;
    border-radius: 8px;
  }
  
  .emoji-picker .EmojiPickerReact .epr-search-container {
    margin: 12px 16px;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .emoji-picker .EmojiPickerReact .epr-search {
    border: 1px solid #2f3336;
    background-color: #202327;
    color: #ffffff;
    padding: 10px 16px;
  }
  
  .emoji-picker .EmojiPickerReact .epr-search:focus {
    border-color: #1d9bf0;
    box-shadow: 0 0 0 1px #1d9bf0;
  }
  
  .emoji-picker .EmojiPickerReact .epr-emoji-category {
    border-bottom: 1px solid #2f3336;
  }
  
  .media-option.active {
    color: #1d9bf0;
    background-color: rgba(29, 155, 240, 0.1);
  }
  
  .submit-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 16px;
    border-top: 1px solid #2f3336;
    margin-top: 12px;
  }
  
  .cancel-btn, .post-submit-btn {
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .cancel-btn {
    background: transparent;
    border: 1px solid #2f3336;
    color: #e7e9ea;
  }
  
  .cancel-btn:hover:not(:disabled) {
    background-color: rgba(239, 243, 244, 0.1);
  }
  
  .cancel-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .post-submit-btn {
    background-color: #1d9bf0;
    color: white;
    border: none;
  }
  
  .post-submit-btn:not(:disabled):hover {
    background-color: #1a8cd8;
  }
  
  .post-submit-btn:disabled {
    background-color: #1a8cd8;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Add styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default CreatePost;
