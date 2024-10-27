import express from 'express'
import { authorizeRoles } from '../midllewares/auth.js';
const router=express.Router();
import User from '../models/userModel.js';
import Task from '../models/taskModel.js';
import { authenticateJWT } from '../midllewares/jwt.js';
import bcrypt from 'bcrypt'
const JWT_SECRET = 'your_jwt_secret'; 


router.get('/tasks/add', authenticateJWT, authorizeRoles(['admin' ,'manager']), async (req, res) => {
    const users = await User.findAll();
    res.render('addTask', { users, error: null });
  });
  
  router.post('/tasks/update/:id',authenticateJWT,authorizeRoles(['admin' ,'manager','user']), async(req, res) => {
    const taskId = req.params.id;
    const newStatus = req.body.status;
    const task = await Task.findOne({ where: { id: taskId } });
    if (task) {
      task.status = newStatus;
      await task.save();
    }
    res.redirect('/dashboard'); 
  });
  
  
  router.post('/tasks/add', authenticateJWT, authorizeRoles(['admin','manager']), async (req, res) => {
    const { title, description, assignedTo, dueDate } = req.body;
  
    try {
      await Task.create({
        title,
        description,
        assignedTo,
        dueDate,
      });
  
      res.redirect('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error(error);
      const users = await User.findAll(); // Fetch users again for rendering the form
      res.render('addTask', { users, error: 'Failed to create task. Please try again.' });
    }
  });
  
export default router;