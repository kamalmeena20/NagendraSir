
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No token at all
  if (!authHeader) {
    return res.status(401).json({ msg: "No token provided" });
  }

  // Bearer token format check
  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ msg: "Token error" });
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    return res.status(401).json({ msg: "Token malformatted" });
  }

  // Verify JWT
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // put user info into request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token invalid" });
  }
};
