// middlewares/authorizeRoles.js
export const authorizeRoles = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).send('Access Denied: You do not have the required role');
  }
  next();
};
