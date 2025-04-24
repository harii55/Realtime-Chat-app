# Realtime Chat App

This is a full-stack real-time chat application built using React, Vite, TailwindCSS, Zustand, and Socket.IO for the frontend, and Node.js, Express, MongoDB, and Cloudinary for the backend.


## Key Features

#### 1. User Authentication
- Secure signup and login functionality with hashed passwords.
- JWT-based authentication for secure session management.
- Logout functionality to clear user sessions.

#### 2. Real-Time Messaging
- Instant messaging powered by Socket.IO.
- Supports both text and image messages.
- Real-time updates for new messages without refreshing the page.

#### 3. Profile Management
- Users can upload and update their profile pictures using Cloudinary.
- Profile information such as name and email is displayed and non-editable.

#### 4. Online/Offline Status
- Displays the online/offline status of users.
- Users can filter the sidebar to show only online contacts.

#### 5. Responsive Design
- Fully responsive UI built with TailwindCSS.
- Optimized for both desktop and mobile devices.

#### 6. For Future Integration of Features

-  **Message Reactions**  
  Allow users to react to individual messages using emojis.

-  **Theme Customization**  
  Let users switch between light, dark, or custom themes.

-  **Chat Prioritization**  
  Automatically move the most recent and active chats to the top of the list.

-  **User Blocking**  
  Allow users to block others to prevent further communication.

-  **User Search**  
  Implement a search bar to quickly find users by name or username.

-  **File Sharing & Downloads**  
  Support sending and receiving files (images, documents, etc.), with download options.

-  **Read Receipts**  
  Display indicators showing when a message has been read by the recipient.

-  **Group Chats**  
  Enable creation and participation in multi-user chat rooms.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- A [Cloudinary](https://cloudinary.com/) account for image uploads


## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/harii55/Chat-app.git
cd Chat-app
```

### 2. Set Up the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory based on the `.env_sample` file:

   ```plaintext
   MONGODB_URL=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   NODE_ENV = development
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:5000`.

### 3. Set Up the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`. [Ensure the ports are free before starting the server.] 

### 4. Access the application:

   The application will be available at `http://localhost:5173`.

## Project Structure

### Frontend

- **`src/components`**: Reusable UI components (e.g., Navbar, Sidebar, ChatContainer)
- **`src/pages`**: Page components (e.g., HomePage, LoginPage, ProfilePage)
- **`src/store`**: Zustand stores for state management
- **`src/lib`**: Utility functions and configurations (e.g., Axios instance)
- **`src/constants`**: Constants used across the app (e.g., themes)

### Backend

- **`src/controllers`**: Business logic for handling requests
- **`src/models`**: Mongoose models for MongoDB
- **`src/routes`**: API routes
- **`src/middleware`**: Middleware functions (e.g., authentication)
- **`src/lib`**: Utility libraries (e.g., Cloudinary, Socket.IO)
- **`src/utils`**: Helper functions

## Technologies Used:-

### Frontend

- React
- Vite
- TailwindCSS
- DaisyUI
- Zustand
- Socket.IO Client
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB
- Socket.IO
- Cloudinary


