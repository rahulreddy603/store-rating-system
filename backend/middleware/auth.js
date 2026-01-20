const jwt = require('jsonwebtoken');

// Verify if the user is logged in
exports.auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        // Verify token using your secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adds user id and role to the request object
        next();
    } catch (ex) {
        res.status(400).json({ error: "Invalid token." });
    }
};

// Verify if the logged-in user is a System Administrator
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: "Access denied. Admin role required." });
    }
    next();
};