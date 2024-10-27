import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/userModel.js';
import Task from './models/taskModel.js';
import { authorizeRoles } from './midllewares/auth.js';
import ejs from 'ejs';
import cookieParser from 'cookie-parser';
import { authenticateJWT } from './midllewares/jwt.js';
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import dashRoutes from './routes/dashboardRoutes.js'
const app = express();

const JWT_SECRET = 'your_jwt_secret'; 
app.set('view engine', 'ejs'); // EJS template engine
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // To parse cookies

// Middleware to authenticate user using JWT
app.use("/",userRoutes)

app.use('/',dashRoutes)

app.use("/",taskRoutes);
// Logout Route


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
