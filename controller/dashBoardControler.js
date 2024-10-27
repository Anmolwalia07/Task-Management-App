import User from '../models/userModel.js';
import Task from '../models/taskModel.js';
import bcrypt from 'bcrypt'
const JWT_SECRET = 'your_jwt_secret';

export const handleDashboard= async(req, res) => {
    const tasks = await Task.findAll();
    const users=await User.findAll()
    res.render('dashboard', { user: req.user, tasks ,users});
}

export const register=(req, res) => {
    res.render('register',{error:null});
  }
export const createUser=async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.render('register', { error: 'Email is already registered.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword, role });
  
      res.redirect('/dashboard');
    } catch (error) {
      res.render('register', { error: 'Failed to create user. Try again.' });
    }
}

export const AsignTask=async(req,res)=>{
  try{
    const users=await User.findAll()
    res.render('taskAsign' ,{user:req.user,users});
  }
  catch(err){
    console.log(err)
  }
}