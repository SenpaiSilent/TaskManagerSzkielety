const jwt = require('jsonwebtoken');

/**
 * Middleware weryfikujący token JWT.
 * Token powinien być przesłany w nagłówku: Authorization: Bearer <token>
 */
const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Brak tokenu autoryzacyjnego' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token jest nieprawidłowy lub wygasł' });
  }
};

module.exports = auth;
