const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Try header first
    let token = null;

    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "");
    }

    // If not in header, try body (HTML form)
    if (!token && req.body && req.body.token) {
        token = req.body.token;
    }

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};