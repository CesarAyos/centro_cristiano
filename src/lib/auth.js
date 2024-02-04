const jwt = require('jsonwebtoken');
const SUPABASE_SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZGFsbXJub2VzbHp0aHdxbnVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjY2MDY3NCwiZXhwIjoyMDIyMjM2Njc0fQ.Y3-Ffv-8-CUTcA-NT2BAvR_9yuiC-zy1EJCStN0QkdU';

module.exports = {
  async isLoggedIn(req, res, next) {
    const token = req.cookies['sb:token'];
    try {
      const payload = jwt.verify(token, SUPABASE_SECRET_KEY);
      if (payload) {
        return next();
      }
    } catch (error) {
      console.error('Error verifying token:', error.message);
    }
    return res.redirect("/signin");
  },
};
