import express from 'express'
import { authorizeRoles } from '../midllewares/auth.js';
import User from '../models/userModel.js';
import Task from '../models/taskModel.js';
import { authenticateJWT } from '../midllewares/jwt.js';
import { handleDashboard ,register,createUser ,AsignTask} from '../controller/dashBoardControler.js';
import bcrypt from 'bcrypt'
const JWT_SECRET = 'your_jwt_secret'; 
const router=express.Router();
router.get('/dashboard', authenticateJWT,handleDashboard );
  
router.get('/register', authenticateJWT, authorizeRoles('admin'),register );

router.post('/register', authenticateJWT, authorizeRoles('admin'), createUser);

router.get('/taskAssign',authenticateJWT, authorizeRoles('admin'),AsignTask);

export default router;