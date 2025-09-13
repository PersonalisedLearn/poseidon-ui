import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Feed from './components/Feed'
import Profile from './components/Profile'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    type: 'student', // 'student' or 'teacher'
    avatar: 'https://via.placeholder.com/40',
    bio: 'Computer Science Student',
    followers: 150,
    following: 200
  })

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Alice Smith',
        username: 'alicesmith',
        type: 'teacher',
        avatar: 'https://via.placeholder.com/40'
      },
      content: 'Just finished an amazing lecture on React hooks! 🚀',
      timestamp: '2h',
      likes: 24,
      comments: 8,
      isLiked: false,
      media: null
    },
    {
      id: 2,
      user: {
        name: 'Bob Johnson',
        username: 'bobjohnson',
        type: 'student',
        avatar: 'https://via.placeholder.com/40'
      },
      content: 'Working on my final project. The deadline is approaching fast! 😅',
      timestamp: '4h',
      likes: 12,
      comments: 5,
      isLiked: true,
      media: null
    }
  ])

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const handleAddPost = (newPost) => {
    const post = {
      id: Date.now(),
      user: currentUser,
      content: newPost.content,
      timestamp: 'now',
      likes: 0,
      comments: 0,
      isLiked: false,
      media: newPost.media
    }
    setPosts([post, ...posts])
  }

  return (
    <Router>
      <div className="app">
        <Sidebar currentUser={currentUser} />
        <div className="main-content">
          <Header currentUser={currentUser} />
          <Routes>
            <Route 
              path="/" 
              element={
                <Feed 
                  posts={posts} 
                  currentUser={currentUser}
                  onLike={handleLike}
                  onAddPost={handleAddPost}
                />
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Profile 
                  user={currentUser} 
                  posts={posts.filter(post => post.user.id === currentUser.id)}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App