import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js';


const PORT = process.env.PORT;

//first allow the frontend to access the backend
//this is done using the cors middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));



app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));


app.use(cookieParser());
//Middleware that allows us to parse cookies from the request headers

app.use(express.json());
//Middleware that allows us to parse JSON data out of the request body

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);




server.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
  connectDB();
});

