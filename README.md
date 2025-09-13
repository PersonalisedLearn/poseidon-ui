# Poseidon - Social Media Platform

A Twitter/X-like social media platform built with React and Vite, designed for students and teachers.

## Features

### User System
- **Two user types**: Students and Teachers
- **User profiles** with avatars, bios, and stats
- **User type badges** to distinguish between students and teachers

### Post System
- **Create posts** with text, images, and videos
- **Media upload** support for images and videos
- **Post interactions** with likes and comments
- **Real-time updates** for post interactions

### UI/UX
- **Twitter/X-inspired design** with minimalist dark theme
- **Responsive layout** that works on desktop and mobile
- **Dark black and white color scheme**
- **Smooth animations** and hover effects

### Navigation
- **Sidebar navigation** with main sections
- **Profile pages** for individual users
- **Home feed** showing all posts
- **Search functionality** (UI ready)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **CSS3** - Styling with custom dark theme

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx      # Navigation sidebar
│   ├── Header.jsx       # Top header with search
│   ├── Feed.jsx         # Main feed component
│   ├── Post.jsx         # Individual post component
│   ├── CreatePost.jsx   # Post creation modal
│   └── Profile.jsx      # User profile page
├── App.jsx              # Main app component
├── App.css              # Main styles
└── main.jsx             # App entry point
```

## Features in Detail

### User Types
- **Students**: Blue badge with 🎓 emoji
- **Teachers**: Orange badge with 👨‍🏫 emoji

### Post Features
- Text posts with emoji support
- Image upload and display
- Video upload and playback
- Like functionality with heart animation
- Comment system (UI ready)
- Share functionality (UI ready)

### Responsive Design
- Desktop: Full sidebar navigation
- Tablet: Collapsed sidebar with icons only
- Mobile: Hidden sidebar, mobile-optimized layout

## Future Enhancements

- Real-time messaging system
- Notification system
- Advanced search and filtering
- Post bookmarks
- User following system
- Real-time updates with WebSocket
- Backend integration
- User authentication
- Data persistence

## Contributing

This is a demo project showcasing modern React development practices and Twitter/X-inspired UI design.