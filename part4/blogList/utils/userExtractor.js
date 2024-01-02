const Users = require('../models/users');
const jwt = require('jsonwebtoken');

const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (!token) {
    return response.status(401).json({ error: 'Token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' });
    }

    const user = await Users.findById(decodedToken.id);

    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = userExtractor;
