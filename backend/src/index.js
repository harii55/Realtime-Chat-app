import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
dotenv.config();
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
//Middleware that allows us to parse JSON data out of the request body

app.use(cookieParser());
//Middleware that allows us to parse cookies from the request headers

app.use("/api/auth", authRoutes);
app.use("/api/message",messageRoutes);

app.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
  connectDB();
});

