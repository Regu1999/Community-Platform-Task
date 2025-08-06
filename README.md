# Mini LinkedIn-like Community Platform
A mini LinkedIn-like social platform where users can register, login, post text updates, and view others posts.
Built with React, Express, and MongoDB. 

## 🌐 Live Demo

https://community-platform-task-o2ui.vercel.app/

**Demo Login credentials**

- Email: demo@gmail.com
- Password: no one@123

## 📂 GitHub Repositories

https://github.com/Regu1999/Community-Platform-Task

## 🚀 Features

**User Authentication**

- Register & Login with JWT-based auth
- Profile with name, email, and bio

**Public Post Feed**

- Create and view text-only posts
- Display author and timestamp

**Profile Page**

- View a profile info and posts

**Responsive Design**

- Works on both mobile and desktop

## 🛠 Tech Stack

**Frontend (React)**
- Axios – For API requests
- Redux Toolkit – State management
- React Redux – Redux integration for React
- React Hook Form – Form handling and validation
- TanStack React Query – Server state management and caching
- React Icons – Pre-built icons
- React Responsive – Responsive design utilities
- Motion (Framer Motion) – Animations and transitions
- Tailwind CSS – Utility-first CSS framework
- date-fns – Date formatting utilities

**Backend (Nodejs + Express.js)**
- Mongoose – MongoDB object modeling for Node.js
- MongoDB – Database operations
- Cors – Handling cross-origin requests
- Dotenv – Environment variable management
- Body-Parser – Parsing incoming request bodies
- Cookie-Parser – Parsing cookies for auth sessions
- Bcryptjs – Password hashing
- Jsonwebtoken – Authentication using JWT
- Express-Validator – Request validation middleware

## 📦 Installation & Setup

**1. Clone the Repository**

`https://github.com/Regu1999/Community-Platform-Task.git`

**2. Backend Setup**

`cd backend`

`npm install`

Create a .env file:

`PORT=Your port`

`CROS_ORIGIN_URL=your_frontend_url`

`DB_CONNECTION_URI=your_mongodb_atlas_connection_string`

`SECRET_KEY=your_secure_jwt_secret_key`

Start the server:

`npm start`

**3. Frontend Setup**

`cd ../frontend`

`npm install`

Create a .env file:

`VITE_API_URL=your_backend_api_url`

Run frontend

`npm run dev`

**4. Deployment**

- Frontend: Deploy on Vercel 

- Backend: Deploy on Vercel

- Database: MongoDB Atlas