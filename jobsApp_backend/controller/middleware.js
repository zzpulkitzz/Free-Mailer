const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.firebaseUser = decodedToken; // uid, email, etc.
      next();
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
    }
  };


module.exports = {
    verifyFirebaseToken
  };