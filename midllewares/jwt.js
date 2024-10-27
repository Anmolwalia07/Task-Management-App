import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
export const authenticateJWT = (req, res, next) => {
    const JWT_SECRET = 'your_jwt_secret'; 
    const token = req.cookies.token; 
    if (!token) return res.redirect('/login');
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.redirect('/login');
    }
  };