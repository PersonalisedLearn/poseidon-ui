import { useState } from 'react'
import { X, Image, Video, Smile } from 'lucide-react'

const CreatePost = ({ currentUser, onAddPost, onClose }) => {
  const [content, setContent] = useState('')
  const [media, setMedia] = useState(null)
  const [mediaType, setMediaType] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() || media) {
      onAddPost({
        content: content.trim(),
        media: media ? { url: media, type: mediaType } : null
      })
      setContent('')
      setMedia(null)
      setMediaType(null)
      onClose()
    }
  }

  const handleMediaUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setMedia(e.target.result)
        setMediaType(file.type.startsWith('video') ? 'video' : 'image')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="create-post-modal">
      <div className="create-post-content">
        <div className="create-post-header">
          <h3>Create Post</h3>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="post-input-area">
            <img src={currentUser.avatar} alt={currentUser.name} className="create-post-avatar" />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What's happening, ${currentUser.name}?`}
              className="post-textarea"
              rows="4"
            />
          </div>

          {media && (
            <div className="post-media-preview">
              {mediaType === 'image' && (
                <img src={media} alt="Preview" className="media-preview" />
              )}
              {mediaType === 'video' && (
                <video src={media} controls className="media-preview" />
              )}
              <button 
                type="button" 
                onClick={() => setMedia(null)}
                className="remove-media-btn"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="create-post-actions">
            <div className="media-options">
              <label className="media-option">
                <Image size={20} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaUpload}
                  style={{ display: 'none' }}
                />
              </label>
              
              <label className="media-option">
                <Video size={20} />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleMediaUpload}
                  style={{ display: 'none' }}
                />
              </label>
              
              <button type="button" className="media-option">
                <Smile size={20} />
              </button>
            </div>

            <div className="submit-actions">
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={!content.trim() && !media}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
