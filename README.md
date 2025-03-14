# WatchTrack

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-%2361DAFB?logo=react&logoColor=white)](https://www.mongodb.com/mern-stack)
[![Deployed with Netlify](https://img.shields.io/badge/Deployed%20with-Netlify-%2300C7B7?logo=netlify)](https://www.netlify.com)
[![TMDB API](https://img.shields.io/badge/Powered%20by-TMDB%20API-%2301D277?logo=themoviedatabase)](https://www.themoviedb.org)

WatchTrack is your go-to app for organizing and tracking your favorite movies and TV shows. Easily search, save, and manage your watchlist while accessing real-time ratings and details from the TMDB database. Whether you're planning your next binge-watch or keeping track of classics, WatchTrack has you covered!

![WatchTrack Demo](https://github.com/VK-IH25/WatchTrack/blob/main/WatchTrack-client/demo-watchtrack.png)

## Features

🎬 **Content Discovery**

- Browse trending/popular movies & TV shows
- Detailed media pages with trailers and info
- Genre-based exploration
- Advanced search functionality

🔐 **User Authentication**

- Secure JWT-based authentication
- Signup/Login with email/password
- User profile management

📝 **Watchlist Management**

- Create personalized watchlists
- Add/remove movies & TV shows
- Edit watchlist details
- Public/private watchlist visibility

💬 **Social Features**

- Add comments to media pages
- View community comments

✨ **UI Features**

- Responsive design with mobile support
- Interactive notifications system
- Clean modern UI with Mantine components
- Sidebar navigation
- 404 error handling

## Tech Stack

**Frontend**

- React.js
- React Router
- Mantine UI Library
- Axios (API calls)
- React Context API

**Backend**

- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- TMDB API Integration

**Deployment**

- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```
WatchTrack/
├── WatchTrack-client/ # Frontend
│ ├── src/
│ │ ├── auth/ # Authentication components
│ │ ├── components/ # Reusable components
| | ├── context/ # User context
│ │ ├── pages/ # Application pages
│ │ ├── styles/ # Styles
│ │ └── App.jsx # Main application router
│
└── WatchTrack-backend/ # Backend
├── models/ # MongoDB models
│ ├── User.model.js
│ ├── Watchlist.model.js
│ └── Comment.js
├── routes/ # API endpoints
│ ├── auth.routes.js
│ ├── comments.routes.js
│ ├── index.routes.js
| ├── tmdb.routes.js
| └── watchlist.routes.js
└── app.js # App configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- TMDB API key

### Installation

1. **Clone repository**

```bash
git clone https://github.com/VK-IH25/WatchTrack.git
cd WatchTrack
```

2. **Backend Setup**

```bash
cd WatchTrack-backend
npm install
```

3. **Frontend Setup**

```bash
cd ../WatchTrack-client
npm install
```

4. **Environment Variables**

- Create `.env` file in backend:

```
PORT=5005
MONGODB_URI=your_mongodb_uri
ORIGIN=your_frontend_url
TOKEN_SECRET=your_jwt_secret!!
API_KEY=your_tmdb_api_key
```

- Create `.env` file in frontend:

```
VITE_BACKEND_BASE_URL=your_localhost_url
```

5. **Run Application**

```
# Backend
cd WatchTrack-backend
npm run dev

# Frontend (new terminal)
cd WatchTrack-client
npm run dev
```

### Deployment

- The application is deployed using:

- Frontend: [Netlify](https://watchtrack.netlify.app/)

- Backend: [Render](https://render.com/)

- Database: [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

Live Demo: `watchtrack.netlify.app`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License.

## Acknowledgements

- The Movie Database (TMDB) for media data
- Mantine UI Library for awesome React components
- Render & Netlify for free tier hosting

## Developers

### Victor Abussafi
- GitHub: [Victor Abussafi](https://github.com/abussafilx)
- LinkedIn: [Victor Abussafi](https://www.linkedin.com/in/victorabussafi/)

### Kamran Ali
- GitHub: [Kamran Ali](https://github.com/Kamran-frontend)
- LinkedIn: [Kamran Ali](https://www.linkedin.com/in/kamranalifrmrbw/)
