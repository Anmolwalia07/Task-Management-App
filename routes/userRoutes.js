import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const router=express.Router();
import User from '../models/userModel.js';

router.get("/",(req,res)=>{
    res.redirect("/login")
})
router.get('/login', (req, res) => {
    res.render('login');
  });
const JWT_SECRET = 'your_jwt_secret';
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render('login', { error: 'Invalid email or password' });
    }
  
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  
    res.cookie('token', token, { httpOnly: true }).redirect('/dashboard');
  });
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
  });
export default router;